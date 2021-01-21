import { useEffect } from 'react';
import useCollector from '../collectors/useCollector';
import mdl from 'magento-data-layer-sdk';

const prepareProductContexts = () => {
  const productContexts = [
    mdl.context.getProduct(),
    mdl.context.getShopper(),
    mdl.context.getMagentoExtension(),
    mdl.context.getStorefrontInstance(),
  ];

  const shoppingCartContext = mdl.context.getShoppingCart();

  if (
    (shoppingCartContext &&
      shoppingCartContext.data &&
      shoppingCartContext.data.itemsCount) > 0
  ) {
    productContexts.push(shoppingCartContext);
  }

  return productContexts;
};

const useCreateDataLayerEventHandlers = () => {
  const snowplowCollector = useCollector();

  useEffect(() => {
    const handleAddToCart = () => {
      snowplowCollector([
        'trackStructEvent',
        'product',
        'add-to-cart',
        null,
        null,
        null,
        prepareProductContexts(),
      ]);
    };
    const handleProductPageView = () => {
      snowplowCollector([
        'trackStructEvent',
        'product',
        'view',
        null,
        null,
        null,
        prepareProductContexts(),
      ]);
    };
    const handlePageActivitySummary = () => {
      snowplowCollector([
        'trackSelfDescribingEvent',
        mdl.context.getPageOffset(),
      ]);
    };
    const handleCustomUrl = () => {
      const customUrl = mdl.context.getCustomUrl();
      snowplowCollector(['setCustomUrl', customUrl]);
    };

    const handleReferrerUrl = () => {
      const referrerUrl = mdl.context.getReferrerUrl();
      snowplowCollector(['setReferrerUrl', referrerUrl]);
    };

    const handlePageViewEvent = () => {
      snowplowCollector(['trackPageView']);
    };

    mdl.subscribe.addToCart(handleAddToCart);
    mdl.subscribe.productPageView(handleProductPageView);
    mdl.subscribe.pageActivitySummary(handlePageActivitySummary);
    mdl.subscribe.customUrl(handleCustomUrl);
    mdl.subscribe.referrerUrl(handleReferrerUrl);
    mdl.subscribe.pageViewEvent(handlePageViewEvent);
    return () => {
      mdl.unsubscribe.addToCart(handleAddToCart);
      mdl.unsubscribe.productPageView(handleProductPageView);
      mdl.unsubscribe.pageActivitySummary(handlePageActivitySummary);
      mdl.unsubscribe.customUrl(handleCustomUrl);
      mdl.unsubscribe.referrerUrl(handleReferrerUrl);
      mdl.unsubscribe.pageViewEvent(handlePageViewEvent);
    };
  }, []);
};

export default useCreateDataLayerEventHandlers;
