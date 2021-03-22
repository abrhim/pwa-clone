import { useEffect } from 'react';
import useCollector from '../collectors/useCollector';
import mse from '@adobe/magento-storefront-events-sdk';
import { ACTIVITY_SUMMARY_SCHEMA_URL, PRODUCT_SCHEMA_URL } from '../constants';
import clearActivitySummaryFromDataLayerArray from '../util/clearActivitySummaryFromDataLayerArray';
import { getCartIdHash } from './useGlobalSnowplowContexts';

export const prepareProductContext = () => {
  const product = mse.context.getProduct();

  if (!product || !product.id) {
    return [];
  }

  return [
    {
      schema: PRODUCT_SCHEMA_URL,
      data: {
        productId: product.id,
        sku: product.sku,
        name: product.name,
        categories: product.categories.map(category => String(category.id)),
        topLevelSku: product.sku,
      },
    },
  ];
};

const useCreateDataLayerEventHandlers = () => {
  const snowplowCollector = useCollector();

  useEffect(() => {
    const handleAddToCart = () => {
      snowplowCollector(
        'trackStructEvent',
        'product',
        'add-to-cart',
        null,
        null,
        null,
        prepareProductContext(),
      );
    };
    const handleProductPageView = () => {
      snowplowCollector(
        'trackStructEvent',
        'product',
        'view',
        null,
        null,
        null,
        prepareProductContext(),
      );
    };
    const handlePageActivitySummary = () => {
      snowplowCollector('trackSelfDescribingEvent', {
        schema: ACTIVITY_SUMMARY_SCHEMA_URL,
        data: mse.context.getPageOffset(),
      });
      clearActivitySummaryFromDataLayerArray();
    };
    const handleCustomUrl = () => {
      const customUrl = mse.context.getCustomUrl();
      if (customUrl) {
        snowplowCollector('setCustomUrl', customUrl);
      }
    };

    const handleReferrerUrl = () => {
      const referrerUrl = mse.context.getReferrerUrl();
      snowplowCollector('setReferrerUrl', referrerUrl);
    };

    const handlePageViewEvent = () => {
      snowplowCollector('trackPageView');
    };

    const handlePlaceOrderEvent = event => {
      snowplowCollector(
        'trackStructEvent',
        'checkout',
        'place-order',
        event.eventInfo.orderContext.orderId,
        null,
        getCartIdHash(event.eventInfo.shoppingCartContext.id),
      );
    };

    mse.subscribe.addToCart(handleAddToCart);
    mse.subscribe.productPageView(handleProductPageView);
    mse.subscribe.dataLayerChange(handlePageActivitySummary, {
      path: 'pageOffsetContext',
    });
    mse.subscribe.customUrl(handleCustomUrl);
    mse.subscribe.referrerUrl(handleReferrerUrl);
    mse.subscribe.pageView(handlePageViewEvent);
    mse.subscribe.placeOrder(handlePlaceOrderEvent);
    return () => {
      mse.unsubscribe.addToCart(handleAddToCart);
      mse.unsubscribe.productPageView(handleProductPageView);
      mse.unsubscribe.dataLayerChange(handlePageActivitySummary);
      mse.unsubscribe.customUrl(handleCustomUrl);
      mse.unsubscribe.referrerUrl(handleReferrerUrl);
      mse.unsubscribe.pageView(handlePageViewEvent);
      mse.unsubscribe.placeOrder(handlePlaceOrderEvent);
    };
  }, [snowplowCollector]);
};

export default useCreateDataLayerEventHandlers;
