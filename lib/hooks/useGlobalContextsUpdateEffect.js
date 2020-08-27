import { useEffect } from 'react';
import { updateDataLayer } from '../util/updateDataLayer';

const useGlobalContextsUpdateEffect = contexts => {
    const {
        shopperContext,
        shoppingCartContext,
        storefrontInstanceContext,
        magentoExtensionContext
    } = contexts;

    useEffect(() => {
        updateDataLayer({
            contextName: 'shopper-context',
            context: shopperContext
        });
    }, [shopperContext]);

    useEffect(() => {
        updateDataLayer({
            contextName: 'shopping-cart-context',
            context: shoppingCartContext
        });
    }, [shoppingCartContext]);

    useEffect(() => {
        updateDataLayer({
            contextName: 'storefront-instance-context',
            context: storefrontInstanceContext
        });
    }, [storefrontInstanceContext]);

    useEffect(() => {
        updateDataLayer({
            contextName: 'magento-extension-context',
            context: magentoExtensionContext
        });
    }, [magentoExtensionContext]);
};

export default useGlobalContextsUpdateEffect;
