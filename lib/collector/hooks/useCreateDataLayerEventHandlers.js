import { useEffect } from 'react';
import useCollector from '../collectors/useCollector';
import mdl from '@adobe/magento-data-layer-sdk';
import { ACTIVITY_SUMMARY_SCHEMA_URL, PRODUCT_SCHEMA_URL } from '../constants';
import clearActivitySummaryFromDataLayerArray from '../util/clearActivitySummaryFromDataLayerArray';

export const prepareProductContext = () => {
  const product = mdl.context.getProduct();

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
        data: mdl.context.getPageOffset(),
      });
      clearActivitySummaryFromDataLayerArray();
    };
    const handleCustomUrl = () => {
      const customUrl = mdl.context.getCustomUrl();
      if (customUrl) {
        snowplowCollector('setCustomUrl', customUrl);
      }
    };

    const handleReferrerUrl = () => {
      const referrerUrl = mdl.context.getReferrerUrl();
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
        event.eventInfo.shoppingCartContext.id,
      );
    };

    mdl.subscribe.addToCart(handleAddToCart);
    mdl.subscribe.productPageView(handleProductPageView);
    mdl.subscribe.dataLayerChange(handlePageActivitySummary, {
      path: 'pageOffsetContext',
    });
    mdl.subscribe.customUrl(handleCustomUrl);
    mdl.subscribe.referrerUrl(handleReferrerUrl);
    mdl.subscribe.pageView(handlePageViewEvent);
    mdl.subscribe.placeOrder(handlePlaceOrderEvent);
    return () => {
      mdl.unsubscribe.addToCart(handleAddToCart);
      mdl.unsubscribe.productPageView(handleProductPageView);
      mdl.unsubscribe.dataLayerChange(handlePageActivitySummary);
      mdl.unsubscribe.customUrl(handleCustomUrl);
      mdl.unsubscribe.referrerUrl(handleReferrerUrl);
      mdl.unsubscribe.pageView(handlePageViewEvent);
      mdl.unsubscribe.placeOrder(handlePlaceOrderEvent);
    };
  }, [snowplowCollector]);
};

export default useCreateDataLayerEventHandlers;
