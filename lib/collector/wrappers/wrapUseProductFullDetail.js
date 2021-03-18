import { useEffect } from 'react';
import mdl from '@adobe/magento-storefront-events-sdk';
import processGraphQLResponse from '../util/processGraphQLResponse';

const wrapUseProductFullDetail = origUseProductFullDetail => {
  return function(props) {
    const product = processGraphQLResponse(props.product);

    useEffect(() => {
      mdl.context.setProduct(product);
      mdl.publish.productPageView();
      return () => {
        mdl.context.setProduct({});
      };
    }, [product]);

    const api = origUseProductFullDetail(props);
    return api;
  };
};

export default wrapUseProductFullDetail;
