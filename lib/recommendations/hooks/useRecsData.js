import RecommendationsClient from '@magento/recommendations-js-sdk';
import { useEffect, useState } from 'react';
import mdl from 'magento-data-layer-sdk';
import { PageTypes } from '../constants';
// Without this reference to RecommendationsClient won't be loaded to window and RecommendationsClient won't be callable
RecommendationsClient;

const useRecsData = props => {
  // debugger;

  const [recs, setRecs] = useState({
    data: undefined,
    isLoading: true,
    error: null,
  });
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(null)

  const storefrontContext = mdl.context.getStorefrontInstance();

  if (
    (process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test') &&
    (!props || !props.pageType)
  ) {
    console.error(
      'Headless Recommendations: PageType is required to fetch recommendations.',
    );
    throw new Error(
      'Headless Recommendations: PageType is required to fetch recommendations.',
    );
  } else if (props.pageType && !PageTypes.includes(props.pageType)) {
    console.error(
      `Headless Recommendations: ${
        props.pageType
      } is not a valid pagetype. Valid types include ${JSON.stringify(
        PageTypes,
      )}`,
    );
  }

  const { pageType } = props;
  useEffect(() => {
    // debugger;
    const fetchRecs = async () => {
      // debugger;
      // console.log({ recs, props, storefrontContext });
      // setRecs(r => ({ ...r, isLoading: true }));
      const storefront = { ...storefrontContext, pageType };
      // const client = new RecommendationsClient(storefront) throws and error stating REcommendationsClient is not a constructor
      // console.log(RecClient) --> {}
      const client = new window.RecommendationsClient(storefront);
      const fetchProps = { ...props };
      let res;
      try {
        // debugger;
        res = await client.fetchPreconfigured(fetchProps);
        // debugger;
      } catch (e) {
        // debugger;
        console.error(e);
        setRecs(r => {
          ({ ...r, error: e, isLoading: false });
        });
      }
      // debugger;
      if (res) {
        const { data } = res;
        setRecs({ isLoading: false, data, error: null });
      }
    };
    if (
      !recs.data &&
      PageTypes.includes(pageType) &&
      storefrontContext !== undefined &&
      storefrontContext.environmentId
    ) {
      fetchRecs();
    }
  }, [storefrontContext, pageType, props, recs.data]);

  return recs;
};

export default useRecsData;
