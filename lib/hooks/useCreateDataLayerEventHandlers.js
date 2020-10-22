import { useCallback, useEffect, useState } from 'react';
import useCollectorEvents from '../collectors/useCollectorEvents';

import {
  customUrl,
  magentoExtensionContext,
  pageActivitySummary,
  pageOffsetsContext,
  pageViewEvent,
  productAddToCartEvent,
  productContext,
  productPageViewEvent,
  referrerUrl,
  shopperContext,
  shoppingCartContext,
  storefrontInstanceContext,
} from '../constants';

const useCreateDataLayerEventHandlers = () => {
  const [eventHandler, setEventHandler] = useState(null);

  const prepareProductContexts = useCallback(() => {
    const productContexts = [
      adobeDataLayer.getState(productContext),
      adobeDataLayer.getState(shopperContext),
      adobeDataLayer.getState(magentoExtensionContext),
      adobeDataLayer.getState(storefrontInstanceContext),
    ];

    const shoppingCartContextNumItems = adobeDataLayer.getState(
      'shopping-cart-context.data.itemsCount',
    );

    if (shoppingCartContextNumItems > 0) {
      productContexts.push(adobeDataLayer.getState(shoppingCartContext));
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
          prepareProductContexts(),
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
          prepareProductContexts(),
        ]);
      });
      dl.addEventListener(pageActivitySummary, () => {
        setEventHandler([
          'trackSelfDescribingEvent',
          adobeDataLayer.getState(pageOffsetsContext),
        ]);
      });
      dl.addEventListener(customUrl, () => {
        setEventHandler(['setCustomUrl', adobeDataLayer.getState(customUrl)]);
      });
      dl.addEventListener(referrerUrl, () => {
        setEventHandler([
          'setReferrerUrl',
          adobeDataLayer.getState(referrerUrl),
        ]);
      });
      dl.addEventListener(pageViewEvent, () => {
        setEventHandler(['trackPageView']);
      });
    });
  }, [prepareProductContexts]);

  useCollectorEvents(eventHandler);
};

export default useCreateDataLayerEventHandlers;
