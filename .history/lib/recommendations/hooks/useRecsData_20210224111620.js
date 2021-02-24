import RecsClient from '@magento/recommendations-js-sdk';
import { useEffect, useRef, useState } from 'react';
import mdl from 'magento-data-layer-sdk';
import { PageTypes } from '../constants';

const useRecsData = props => {
  RecsClient;
  const [recs, setRecs] = useState({ fetched: false });

  const storefrontContext = mdl.context.getStorefrontInstance();
  const { pageType } = props;

  const fetchRecs = async () => {
    const storefront = { ...storefrontContext, pageType };
    const client = new RecommendationsClient(storefront);
    const fetchProps = { ...props };
    let res;
    try {
      res = await client.fetchPreconfigured(fetchProps);
    } catch (e) {
      console.error(e);
    }
    if (res) {
      const { data } = res;
      setRecs({ fetched: true, data });
    }
  };

  useEffect(() => {
    if (
      !recs.fetched &&
      PageTypes.indexOf(pageType) !== -1 &&
      storefrontContext !== undefined &&
      storefrontContext.environmentId
    )
      fetchRecs();
  }, [storefrontContext, pageType, recs, PageTypes]);

  if (!props || !props.pageType) {
    console.error('Pagetype is required to fetch recommendations ');
  }

  return recs;
};

export default useRecsData;
