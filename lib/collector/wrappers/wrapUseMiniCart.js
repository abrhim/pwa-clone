// import { useCartContext } from '@magento/peregrine/lib/context/cart';
// import useCheckoutDataLayer from '../collectors/useCartDataLayer';

import useCartPublisher from '../hooks/useCartPublisher';
export const wrapUseMiniCart = orig => {
  return function useProduct(props) {
    const { setCartUpdating } = useCartPublisher();
    const api = orig(props);
    return {
      ...api,
      handleRemoveItem(...args) {
        setCartUpdating(true);
        return api.handleRemoveItem(...args);
      },
    };
  };
};

export default wrapUseMiniCart;
