import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';

const useCheckoutDataLayer = props => {
    const { cartId } = props;


    const pushCheckoutInitiate = useCallback(() => {
        updateDataLayer({
            contextName: 'shopping-cart-context',
            context:  {
                data: {
                    cartId: cartId
                }
            },
            event: 'initiate-checkout'
        });
    }, []);

    return {
        pushCheckoutInitiate,
    };
};

export default useCheckoutDataLayer;