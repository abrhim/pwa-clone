import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';

const useCheckoutDataLayer = props => {
    const { cartId } = props;

    const pushCheckoutPlaceOrder = useCallback(() => {
        updateDataLayer({
            contextName: 'shopping-cart-context',
            context:  {
                data: {
                    cartId: cartId
                }
            },
            event: 'place-order'
        });
    }, []);

    return {
        pushCheckoutPlaceOrder,
    };
};

export default useCheckoutDataLayer;