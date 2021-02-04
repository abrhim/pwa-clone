import { useEffect } from 'react';
import useCollector from '../collectors/useCollector';
import mdl from 'magento-data-layer-sdk';
import {
  MAGENTO_EXTENSION_SCHEMA_URL,
  SHOPPER_SCHEMA_URL,
  SHOPPING_CART_SCHEMA_URL,
  STOREFRONT_INSTANCE_SCHEMA_URL,
  ACTIVITY_SUMMARY_SCHEMA_URL,
} from '../constants';

const getCartIdHash = cartId => {
  if (cartId) {
    let hash = 0;
    let i, char;
    for (i = 0; i < cartId.length; i++) {
      char = cartId.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }
  return cartId;
};

const prepareProductContexts = () => {
  const shopperContext = {
    schema: SHOPPER_SCHEMA_URL,
    data: mdl.context.getShopper(),
  };

  const storefrontInstanceContext = {
    schema: STOREFRONT_INSTANCE_SCHEMA_URL,
    data: mdl.context.getStorefrontInstance(),
  };

  const magentoExtensionContext = {
    schema: MAGENTO_EXTENSION_SCHEMA_URL,
    data: mdl.context.getMagentoExtension(),
  };

  const productContexts = [
    mdl.context.getProduct(),
    shopperContext,
    magentoExtensionContext,
    storefrontInstanceContext,
  ];

  const shoppingCart = mdl.context.getShoppingCart();
  console.log(shoppingCart);

  if ((shoppingCart && shoppingCart.total_quantity) > 0) {
    const shoppingCartContext = {
      cartId: getCartIdHash(shoppingCart.id),
      subtotalExcludingTax: shoppingCart.prices.subtotal_excluding_tax.value,
      subtotalIncludingTax: shoppingCart.prices.subtotal_including_tax.value,
      itemsCount: shoppingCart.total_quantity,
      items: shoppingCart.items.map(item => {
        return {
          cartItemId: Number(item.id),
          productName: item.product.name,
          qty: item.quantity,
          productSku: item.product.sku,
          offerPrice: item.prices.price.value,
          mainImageUrl: item.product.image.url,
        };
      }),
    };
    console.log(shoppingCartContext);
    productContexts.push({
      schema: SHOPPING_CART_SCHEMA_URL,
      data: shoppingCartContext,
    });
  }

  return productContexts;
};

const useCreateDataLayerEventHandlers = () => {
  const snowplowCollector = useCollector();

  useEffect(() => {
    const handleAddToCart = () => {
      console.log('adding to cart');
      snowplowCollector(
        'trackStructEvent',
        'product',
        'add-to-cart',
        null,
        null,
        null,
        prepareProductContexts(),
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
        prepareProductContexts(),
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
