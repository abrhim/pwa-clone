import { useCartContext } from '@magento/peregrine/lib/context/cart';
import useCheckoutDataLayer from '../collectors/useCheckoutDataLayer';

const collectFlow = orig => {
  return function useFlow(props) {
    const api = orig(props);
    const [cart] = useCartContext();
    const cartId = cart.cartId;
    const { pushCheckoutInitiate } = useCheckoutDataLayer({
      cartId,
    });
    return {
      ...api,
      handleBeginCheckout(...args) {
        pushCheckoutInitiate();
        return api.handleBeginCheckout(...args);
      },
    };
  };
};

export default collectFlow;
