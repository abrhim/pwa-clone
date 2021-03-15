import { useEffect } from 'react';
import useCollector from '../collectors/useCollector';
import mdl from 'magento-data-layer-sdk';
import { ACTIVITY_SUMMARY_SCHEMA_URL, PRODUCT_SCHEMA_URL } from '../constants';

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

    mdl.subscribe.addToCart(handleAddToCart);
    mdl.subscribe.productPageView(handleProductPageView);
    mdl.subscribe.pageActivitySummary(handlePageActivitySummary);
    mdl.subscribe.customUrl(handleCustomUrl);
    mdl.subscribe.referrerUrl(handleReferrerUrl);
    mdl.subscribe.pageView(handlePageViewEvent);
    return () => {
      mdl.unsubscribe.addToCart(handleAddToCart);
      mdl.unsubscribe.productPageView(handleProductPageView);
      mdl.unsubscribe.pageActivitySummary(handlePageActivitySummary);
      mdl.unsubscribe.customUrl(handleCustomUrl);
      mdl.unsubscribe.referrerUrl(handleReferrerUrl);
      mdl.unsubscribe.pageView(handlePageViewEvent);
    };
  }, [snowplowCollector]);
};

export default useCreateDataLayerEventHandlers;
