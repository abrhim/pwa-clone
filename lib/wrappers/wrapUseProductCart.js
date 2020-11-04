import { useCartContext } from '@magento/peregrine/lib/context/cart';
import useCheckoutDataLayer from '../collectors/useCartDataLayer';

export const collectCart = orig => {
  return function useProduct(props) {
    const api = orig(props);
    const [cart] = useCartContext();
    const cartId = cart.cartId;
    const productSku = props.item.product.sku;
    const { pushCartRemoveItem } = useCheckoutDataLayer({
      cartId,
      productSku,
    });
    return {
      ...api,
      handleRemoveFromCart(...args) {
        pushCartRemoveItem();
        return api.handleRemoveFromCart(...args);
      },
    };
  };
};

export default collectCart;
