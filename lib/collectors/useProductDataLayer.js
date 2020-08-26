import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';
import useStorefrontProduct from '../hooks/useStorefrontProduct';

const useProductDataLayer = props => {
    const { product, sku } = props;
    const storefrontProduct = useStorefrontProduct(product);

    const pushProductPageView = useCallback(() => {
        updateDataLayer({
            contextName: 'product-context',
            context: storefrontProduct,
            event: 'product-page-view'
        });
    }, []);

    const pushProductAddToCart = useCallback(() => {
        // if product is configurable
        if (sku) {
            updateDataLayer({
                contextName: 'product-context',
                context: {
                    data: {
                        sku: sku
                    }
                },
                event: 'product-add-to-cart'
            });
        } else {
            updateDataLayer({ event: 'product-add-to-cart' });
        }
    }, [sku]);

    const resetProductPageView = useCallback(() => {
        updateDataLayer({ contextName: 'product-context', context: null });
    }, []);

    return {
        pushProductPageView,
        resetProductPageView,
        pushProductAddToCart
    };
};

export default useProductDataLayer;
