import { useCartContext } from "@magento/peregrine/lib/context/cart";
import { collectEvents } from "../collector";
export default function collectOverview(orig) {
    return function useOverview(props) {
        const api = orig(props);
        const [cart] = useCartContext();
        debugger;
        return {
            ...api,
            handleSubmit(...args) {
                collectEvents([{
                    "category":"checkout",
                    "action":"place-order",
                    "eventInfo": {
                        "cart-id": cart.cartId,
                    }
                }]);
                return api.handleSubmit(...args);
            },
        };
    };
}