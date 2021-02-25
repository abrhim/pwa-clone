import RecsClient from '@magento/recommendations-js-sdk';
import { useEffect, useState } from 'react';
import mdl from 'magento-data-layer-sdk';
import { PageTypes } from '../constants';
// Without this reference to RecsClient won't be loaded to window and RecommendationsClient won't be callable
RecsClient;

const useRecsData = props => {
  const [recs, setRecs] = useState({
    data: undefined,
    isLoading: true,
    error: null,
  });

  const storefrontContext = mdl.context.getStorefrontInstance();

  const { pageType } = props;

  const fetchRecs = async () => {
    const storefront = { ...storefrontContext, pageType };
    const client = new window.RecommendationsClient(storefront);
    const fetchProps = { ...props };
    let res;
    try {
      res = await client.fetchPreconfigured(fetchProps);
    } catch (e) {
      console.error(e);
      setRecs({ ...recs, error: e, isLoading: false });
    }
    if (res) {
      const { data } = res;
      setRecs({ isLoading: false, data, error: null });
    }
  };

  useEffect(() => {
    if (
      !recs.data &&
      PageTypes.includes(pageType) &&
      storefrontContext !== undefined &&
      storefrontContext.environmentId
    )
      fetchRecs();
  }, [storefrontContext, pageType, recs.data]);

  if (
    (process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test') &&
    (!props || !props.pageType)
  ) {
    console.warn('Pagetype is required to fetch recommendations ');
  }
  return recs;
};

export default useRecsData;
