import { useMemo } from 'react';
import { PRODUCT_VIEW_SCHEMA_URL } from '../constants';

const storefrontProductData = props => {
  return {
    productId: props.id,
    sku: props.sku,
    name: props.name,
    categories: props.categories.map(category => String(category.id)),
    topLevelSku: props.sku,
  };
};

const useStorefrontProduct = props => {
  return useMemo(() => {
    return {
      schema: PRODUCT_VIEW_SCHEMA_URL,
      data: storefrontProductData(props),
    };
  }, [props]);
};

export default useStorefrontProduct;
