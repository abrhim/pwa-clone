import RecommendationsClient from '@magento/recommendations-js-sdk';
import { useEffect, useState } from 'react';
import mdl from 'magento-data-layer-sdk';
import { PageTypes } from '../constants';
// Without this reference to RecommendationsClient won't be loaded to window and RecommendationsClient won't be callable
RecommendationsClient;

const useRecsData = props => {
  const [recs, setRecs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const storefrontContext = mdl.context.getStorefrontInstance();

  if (
    (process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test') &&
    (!props || !props.pageType)
  ) {
    throw new Error(
      'Headless Recommendations: PageType is required to fetch recommendations.',
    );
  } else if (props.pageType && !PageTypes.includes(props.pageType)) {
    throw new Error(
      `Headless Recommendations: ${
        props.pageType
      } is not a valid pagetype. Valid types include ${JSON.stringify(
        PageTypes,
      )}`,
    );
  }

  const { pageType } = props;
  useEffect(() => {
    const fetchRecs = async () => {
      setIsLoading(true);
      const storefront = { ...storefrontContext, pageType };
      const client = new window.RecommendationsClient(storefront);
      const fetchProps = { ...props };
      let res;
      try {
        res = await client.fetchPreconfigured(fetchProps);
      } catch (e) {
        console.error(e);
        setError(e);
        setIsLoading(false);
      }
      if (res) {
        const { data } = res;
        setIsLoading(false);
        setRecs(data);
      }
    };
    if (
      !recs &&
      PageTypes.includes(pageType) &&
      storefrontContext !== undefined &&
      storefrontContext.environmentId
    ) {
      fetchRecs();
    }
  }, [storefrontContext, pageType, props, recs]);

  return { data: recs, isLoading, error };
};

export default useRecsData;
