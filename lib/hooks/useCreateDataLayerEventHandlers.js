import { useCallback, useEffect, useState } from 'react';
import useCollectorEvents from '../collectors/useCollectorEvents';

const productPageViewEvent = 'product-page-view';
const productAddToCartEvent = 'product-add-to-cart';
const pageActivitySummary = 'page-activity-summary';

const useCreateDataLayerEventHandlers = () => {
    const [eventHandler, setEventHandler] = useState(null);

    const prepareProductContexts = useCallback(() => {
        const productContexts = [
            adobeDataLayer.getState('product-context'),
            adobeDataLayer.getState('shopper-context'),
            adobeDataLayer.getState('magento-extension-context'),
            adobeDataLayer.getState('storefront-instance-context')
        ];

        const shoppingCartContextNumItems = adobeDataLayer.getState(
            'shopping-cart-context.data.itemsCount'
        );

        if (shoppingCartContextNumItems > 0) {
            productContexts.push(
                adobeDataLayer.getState('shopping-cart-context')
            );
        }

        return productContexts;
    }, []);

    useEffect(() => {
        adobeDataLayer.push(dl => {
            dl.addEventListener(productAddToCartEvent, () => {
                setEventHandler([
                    'trackStructEvent',
                    'product',
                    'add-to-cart',
                    null,
                    null,
                    null,
                    prepareProductContexts()
                ]);
            });
            dl.addEventListener(productPageViewEvent, () => {
                setEventHandler([
                    'trackStructEvent',
                    'product',
                    'view',
                    null,
                    null,
                    null,
                    prepareProductContexts()
                ]);
            });
            dl.addEventListener(pageActivitySummary, () => {
                setEventHandler([
                    'trackSelfDescribingEvent',
                    adobeDataLayer.getState('page-offsets')
                ]);
            });
        });
    }, [prepareProductContexts]);

    useCollectorEvents(eventHandler);
};

export default useCreateDataLayerEventHandlers;
