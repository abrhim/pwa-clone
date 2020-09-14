import { useCartContext } from "@magento/peregrine/lib/context/cart";
import useSignInDataLayer from '../collectors/useSignInDataLayer';


const collectSignIn = orig => {
    return function useSignIn(props) {
        const api = orig(props);
        const [cart] = useCartContext();
        const cartId = cart.cartId;
        const { pushSignIn } = useSignInDataLayer({cartId});
        return {
            ...api,
            handleSubmit(...args) {
                pushSignIn();
                return api.handleSubmit(...args);
            },
        };
    };
};

export default collectSignIn;