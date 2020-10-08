import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';

const useCheckoutDataLayer = props => {
    const { cartId, sku } = props;

    const pushMiniCartRemoveItem = useCallback(() => {
        updateDataLayer({
            contextName: 'shopping-cart-context',
            context:  {
                data: {
                    cartId: cartId,
                    sku: sku
                }
            },
            event: 'remove-from-cart'
        });
    }, []);

    return {
        pushMiniCartRemoveItem,
    };
};

export default useCheckoutDataLayer;