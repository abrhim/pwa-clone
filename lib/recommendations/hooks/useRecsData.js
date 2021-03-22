import RecommendationsClient from '@magento/recommendations-js-sdk';
import { useEffect, useState } from 'react';
import mse from '@adobe/magento-storefront-events-sdk';
import { PageTypes } from '../constants';

const useRecsData = props => {
  const [recs, setRecs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
  const storefrontContext = mse.context.getStorefrontInstance();
  const product = mse.context.getProduct();

  useEffect(() => {
    const fetchRecs = async () => {
      const storefront = { ...storefrontContext, pageType };
      let client;
      client = new RecommendationsClient(storefront);
      const { sku } = product;
      const fetchProps = { ...props, currentSku: sku };
      let res;
      try {
        setIsLoading(true);
        mse.publish.recsRequestSent();
        res = await client.fetchPreconfigured(fetchProps);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
        setError(e);
      }
      if (res) {
        const { data } = res;
        mse.publish.recsResponseReceived({ apiResponse: data });
        setIsLoading(false);
        setRecs(data);
      }
    };
    if (
      !recs &&
      PageTypes.includes(pageType) &&
      storefrontContext !== undefined &&
      storefrontContext.environmentId &&
      product &&
      product.sku
    ) {
      fetchRecs();
    }
  }, [pageType, props, recs, storefrontContext, product]);

  return { data: recs, isLoading, error };
};

export default useRecsData;
