import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';
import useStorefrontProduct from '../hooks/useStorefrontProduct';
import {
  productAddToCartEvent,
  productContext,
  productPageViewEvent,
} from '../constants';

const useProductContextEvents = props => {
  const { product, sku } = props;
  const storefrontProduct = useStorefrontProduct(product);

  const pushProductPageView = useCallback(() => {
    updateDataLayer({
      contextName: productContext,
      context: storefrontProduct,
      event: productPageViewEvent,
    });
  }, [storefrontProduct]);

  const pushProductAddToCart = useCallback(() => {
    // if product is configurable
    if (sku) {
      updateDataLayer({
        contextName: productContext,
        context: {
          data: {
            sku: sku,
          },
        },
        event: productAddToCartEvent,
      });
    } else {
      updateDataLayer({ event: productAddToCartEvent });
    }
  }, [sku]);

  const resetProductPageView = useCallback(() => {
    updateDataLayer({ contextName: productContext, context: null });
  }, []);

  return {
    pushProductPageView,
    resetProductPageView,
    pushProductAddToCart,
  };
};

export default useProductContextEvents;
