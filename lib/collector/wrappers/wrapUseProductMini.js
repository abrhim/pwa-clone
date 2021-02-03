import { useCartContext } from '@magento/peregrine/lib/context/cart';
import useCheckoutDataLayer from '../collectors/useCartDataLayer';

export const collectMini = orig => {
  return function useProduct(props) {
    const api = orig(props);
    const [cart] = useCartContext();
    const cartId = cart.cartId;
    const productSku = props.item ? props.item.product.sku : '';
    const { pushCartRemoveItem } = useCheckoutDataLayer({
      cartId,
      productSku,
    });
    return {
      ...api,
      handleRemoveItem(...args) {
        pushCartRemoveItem();
        return api.handleRemoveItem(...args);
      },
    };
  };
};

export default collectMini;
