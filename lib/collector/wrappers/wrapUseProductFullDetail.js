import { useEffect, useState } from 'react';
import mse from '@adobe/magento-storefront-events-sdk';
import processGraphQLResponse from '../util/processGraphQLResponse';

const wrapUseProductFullDetail = origUseProductFullDetail => {
  return function(props) {
    const [id, setId] = useState();
    const product = processGraphQLResponse(props.product);

    useEffect(() => {
      setId(product.id);
    }, [product]);

    useEffect(() => {
      mse.context.setProduct(product);
      mse.publish.productPageView();
      return () => {
        mse.context.setProduct({});
      };
    }, [id]);

    const api = origUseProductFullDetail(props);
    return api;
  };
};

export default wrapUseProductFullDetail;
