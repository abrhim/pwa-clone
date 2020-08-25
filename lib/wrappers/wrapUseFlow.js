import { useCartContext } from "@magento/peregrine/lib/context/cart";
import { collectEvents } from "../collector";
export default function collectFlow(orig) {
    return function useFlow(props) {
        const api = orig(props);
        const [cart] = useCartContext();
        return {
            ...api,
            handleBeginCheckout(...args) {
                collectEvents([{
                    "category":"checkout",
                    "action":"initiate-checkout",
                    "eventInfo": {
                        "cart-id": cart.cartId,
                    }
                }]);
                return api.handleBeginCheckout(...args);
            },
        };
    };
}