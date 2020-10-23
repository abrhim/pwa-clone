import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';
import { shoppingCartContext } from '../constants';

const useCheckoutDataLayer = props => {
  const { cartId, sku } = props;

  const pushCartRemoveItem = useCallback(() => {
    updateDataLayer({
      contextName: shoppingCartContext,
      context: {
        data: {
          cartId,
          sku,
        },
      },
      event: 'remove-from-cart',
    });
  }, [cartId, sku]);

  return {
    pushCartRemoveItem,
  };
};

export default useCheckoutDataLayer;
