import { useCartContext } from '@magento/peregrine/lib/context/cart';
import mdl from '@adobe/magento-data-layer-sdk';

const wrapUseFlow = origUseFlow => {
  return function (props) {
    const api = origUseFlow(props);
    const [cart] = useCartContext();
    const cartId = cart.cartId;
    return {
      ...api,
      handleBeginCheckout(...args) {
        const cartContext = mdl.context.getShoppingCart();
        mdl.context.setShoppingCart({ ...cartContext, cartId });
        mdl.publish.initiateCheckout();
        return api.handleBeginCheckout(...args);
      },
    };
  };
};

export default wrapUseFlow;
