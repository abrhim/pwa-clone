import { useCallback, useEffect, useRef } from 'react';
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
  const eventHandler = useRef({});

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
        eventHandler.current.productAddToCart = [
          'trackStructEvent',
          'product',
          'add-to-cart',
          null,
          null,
          null,
          prepareProductContexts(),
        ];
      });
      dl.addEventListener(productPageViewEvent, () => {
        eventHandler.current.productView = [
          'trackStructEvent',
          'product',
          'view',
          null,
          null,
          null,
          prepareProductContexts(),
        ];
      });
    });
  }, [prepareProductContexts]);

  useEffect(() => {
    adobeDataLayer.push(dl => {
      dl.addEventListener(pageActivitySummary, () => {
        eventHandler.current.pageActivity = [
          'trackSelfDescribingEvent',
          adobeDataLayer.getState(pageOffsetsContext),
        ];
      });
    });
  }, []);

  useEffect(() => {
    adobeDataLayer.push(dl => {
      dl.addEventListener(customUrl, () => {
        eventHandler.current.customUrl = [
          'setCustomUrl',
          adobeDataLayer.getState(customUrl),
        ];
      });
      dl.addEventListener(referrerUrl, () => {
        eventHandler.current.referrerUrl = [
          'setReferrerUrl',
          adobeDataLayer.getState(referrerUrl),
        ];
      });
      dl.addEventListener(pageViewEvent, () => {
        eventHandler.current.pageView = ['trackPageView'];
      });
    });
  }, []);

  useCollectorEvents(eventHandler.current);
  eventHandler.current = {};
};

export default useCreateDataLayerEventHandlers;
