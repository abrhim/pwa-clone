import { useEffect, useRef } from 'react';
import {
  STOREFRONT_INSTANCE_SCHEMA_URL,
  MAGENTO_EXTENSION_SCHEMA_URL,
  SHOPPER_SCHEMA_URL,
  SHOPPING_CART_SCHEMA_URL,
} from '../constants';
import { getJSTrackerContext } from '../util/getJsTrackerContext';
import mdl from 'magento-data-layer-sdk';

const getStorefrontInstanceContext = () => ({
  schema: STOREFRONT_INSTANCE_SCHEMA_URL,
  data: mdl.context.getStorefrontInstance(),
});

const getMagentoExtensionContext = () => ({
  schema: MAGENTO_EXTENSION_SCHEMA_URL,
  data: mdl.context.getMagentoExtension(),
});

const getShopperContext = () => ({
  schema: SHOPPER_SCHEMA_URL,
  data: mdl.context.getShopper(),
});

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

const getShoppingCartContext = () => {
  const shoppingCart = mdl.context.getShoppingCart();
  let shoppingCartContext = {};

  if (shoppingCart && shoppingCart.totalQuantity > 0) {
    shoppingCartContext = {
      cartId: getCartIdHash(shoppingCart.id),
      subtotalExcludingTax: shoppingCart.prices.subtotalExcludingTax.value,
      subtotalIncludingTax: shoppingCart.prices.subtotalIncludingTax.value,
      itemsCount: shoppingCart.totalQuantity,
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
  }
  return {
    schema: SHOPPING_CART_SCHEMA_URL,
    data: shoppingCartContext,
  };
};

const useGlobalContexts = () => {
  const storefrontContext = useRef(getStorefrontInstanceContext());
  const magentoExtensionContext = useRef(getMagentoExtensionContext());
  const shopperContext = useRef(getShopperContext());
  const shoppingCartContext = useRef(getShoppingCartContext());

  useEffect(() => {
    window.magento_store_events('addGlobalContexts', [getJSTrackerContext()]);
  }, []);

  useEffect(() => {
    const handleStorefrontUpdate = () => {
      window.magento_store_events('removeGlobalContexts', [
        storefrontContext.current,
      ]);
      storefrontContext.current = getStorefrontInstanceContext();
      window.magento_store_events('addGlobalContexts', [
        storefrontContext.current,
      ]);
    };
    mdl.subscribe.dataLayerChange(handleStorefrontUpdate, {
      path: 'storefront-instance-context',
    });
    return () => {
      mdl.unsubscribe.dataLayerChange(handleStorefrontUpdate);
    };
  }, []);

  useEffect(() => {
    const handleExtensionUpdate = () => {
      window.magento_store_events('removeGlobalContexts', [
        magentoExtensionContext.current,
      ]);
      magentoExtensionContext.current = getMagentoExtensionContext();
      window.magento_store_events('addGlobalContexts', [
        magentoExtensionContext.current,
      ]);
    };
    mdl.subscribe.dataLayerChange(handleExtensionUpdate, {
      path: 'magento-extension-context',
    });
    return () => {
      mdl.unsubscribe.dataLayerChange(handleExtensionUpdate);
    };
  }, []);

  useEffect(() => {
    const handleShopperUpdate = () => {
      window.magento_store_events('removeGlobalContexts', [
        shopperContext.current,
      ]);
      shopperContext.current = getShopperContext();
      window.magento_store_events('addGlobalContexts', [
        shopperContext.current,
      ]);
    };
    mdl.subscribe.dataLayerChange(handleShopperUpdate, {
      path: 'shopper-context',
    });
    return () => {
      mdl.unsubscribe.dataLayerChange(handleShopperUpdate);
    };
  }, []);

  useEffect(() => {
    const handleShoppingCartUpdate = () => {
      window.magento_store_events('removeGlobalContexts', [
        shoppingCartContext.current,
      ]);
      shoppingCartContext.current = getShoppingCartContext();
      if (shoppingCartContext.current.data.itemsCount > 0) {
        window.magento_store_events('addGlobalContexts', [
          shoppingCartContext.current,
        ]);
      }
    };
    mdl.subscribe.dataLayerChange(handleShoppingCartUpdate, {
      path: 'shopping-cart-context',
    });
    return () => {
      mdl.unsubscribe.dataLayerChange(handleShoppingCartUpdate);
    };
  }, []);
};

export default useGlobalContexts;
