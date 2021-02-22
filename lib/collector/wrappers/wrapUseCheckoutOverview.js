import { useCartContext } from '@magento/peregrine/lib/context/cart';
import useCheckoutDataLayer from '../collectors/useCheckoutDataLayer';

const wrapUseCheckoutOverview = origUseCheckoutOverview => {
  return function(props) {
    const api = origUseCheckoutOverview(props);
    const [cart] = useCartContext();
    const cartId = cart.cartId;
    const { pushCheckoutPlaceOrder } = useCheckoutDataLayer({
      cartId,
    });
    return {
      ...api,
      handleSubmit(...args) {
        pushCheckoutPlaceOrder();
        return api.handleSubmit(...args);
      },
    };
  };
};

export default wrapUseCheckoutOverview;
