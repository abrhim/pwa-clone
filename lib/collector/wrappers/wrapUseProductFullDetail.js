import { useEffect } from 'react';
import mse from '@adobe/magento-storefront-events-sdk';
import processGraphQLResponse from '../util/processGraphQLResponse';

const wrapUseProductFullDetail = origUseProductFullDetail => {
  return function(props) {
    const product = processGraphQLResponse(props.product);

    useEffect(() => {
      mse.context.setProduct(product);
      mse.publish.productPageView();
      return () => {
        mse.context.setProduct({});
      };
    }, [product]);

    const api = origUseProductFullDetail(props);
    return api;
  };
};

export default wrapUseProductFullDetail;
