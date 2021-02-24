import { useCartContext } from '@magento/peregrine/lib/context/cart';
import mdl from 'magento-data-layer-sdk';

const wrapUseCheckoutOverview = origUseCheckoutOverview => {
  return function (props) {
    const api = origUseCheckoutOverview(props);
    const [cart] = useCartContext();
    const cartId = cart.cartId;
    return {
      ...api,
      handleSubmit(...args) {
        const cartContext = mdl.context.getShoppingCart();
        mdl.context.setShoppingCart({ ...cartContext, cartId });
        mdl.publish.initiateCheckout();
        return api.handleSubmit(...args);
      },
    };
  };
};

export default wrapUseCheckoutOverview;
