import { useCartContext } from "@magento/peregrine/lib/context/cart";
import useCheckoutDataLayer from '../collectors/useMiniCartDataLayer';

const collectProduct = orig => {
    return function useProduct(props) {
        const api = orig(props);
        const [cart] = useCartContext();
        const cartId = cart.cartId;
        const productSku = props.item.product.sku;
        const { pushMiniCartRemoveItem } = useCheckoutDataLayer({
            cartId, productSku
        });
        return {
            ...api,
            handleRemoveItem(...args) {
                pushMiniCartRemoveItem();
                return api.handleRemoveItem(...args);
            },
        };
    };
};

export default collectProduct;