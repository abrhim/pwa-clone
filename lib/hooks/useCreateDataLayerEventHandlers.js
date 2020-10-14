import { useCallback, useEffect, useState } from 'react';
import useCollectorEvents from '../collectors/useCollectorEvents';

export const productPageViewEvent = 'product-page-view';
export const productAddToCartEvent = 'product-add-to-cart';
export const pageActivitySummary = 'page-activity-summary';
export const customUrl = 'custom-url';
export const referrerUrl = 'referrer-url';
export const pageViewEvent = 'page-view';

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
            dl.addEventListener(customUrl, () => {
                setEventHandler([
                    'setCustomUrl',
                    adobeDataLayer.getState(customUrl)
                ]);
            });
            dl.addEventListener(referrerUrl, () => {
                setEventHandler([
                    'setReferrerUrl',
                    adobeDataLayer.getState(referrerUrl)
                ]);
            });
            dl.addEventListener(pageViewEvent, () => {
                //TODO
                setEventHandler(['trackPageView']);
            });
        });
    }, [prepareProductContexts]);

    useCollectorEvents(eventHandler);
};

export default useCreateDataLayerEventHandlers;
