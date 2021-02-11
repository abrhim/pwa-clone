import { useCartContext } from '@magento/peregrine/lib/context/cart';
import useCheckoutDataLayer from '../collectors/useCheckoutDataLayer';

const wrapUseFlow = origUseFlow => {
  return function(props) {
    const api = origUseFlow(props);
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

export default wrapUseFlow;
