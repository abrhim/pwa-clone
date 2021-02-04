import mdl from 'magento-data-layer-sdk';
import { useEffect, useRef } from 'react';
import {
  CART_CONTENTS_KEY,
  USER_VIEW_HISTORY_KEY,
  PURCHASE_HISTORY_KEY,
  shoppingCartContext,
} from '../constants';
import { resourceUrl } from '@magento/venia-concept/src/drivers';
import { useShoppingCartQuery } from './useShoppingCartContext';
import useLocalStorageState from './useLocalStorageState';

const productTypesMap = new Map([['SimpleProduct', 'simple']]);

export default () => {
  const [
    productPageViewHistory,
    setProductPageViewHistory,
  ] = useLocalStorageState(USER_VIEW_HISTORY_KEY);

  const [shoppingCart, setShoppingCart] = useLocalStorageState(
    CART_CONTENTS_KEY,
  );
  const [purchaseHistory, setPurchaseHistory] = useLocalStorageState(
    PURCHASE_HISTORY_KEY,
  );

  const firstLoad = useRef(true);
  const { data, error, loading } = useShoppingCartQuery(!firstLoad);

  const cartEventHandler = event => {
    console.log(event);
    const shoppingCartContext = mdl.context.getShoppingCart();
    const dsCart = transformData(shoppingCartContext);
    localStorage.setItem(CART_CONTENTS_KEY, JSON.stringify(dsCart));
  };

  const productPageViewEventHandler = () => {
    // TODO: put product view history thru the MDL and test this code
    // const product = mdl.context.getProduct();
    // const productPageViewContext = {date: new Date().toISOString(), sku: product.sku }
    // viewHistory.append(productPageViewContext)
    // setViewHistory(viewHistory)
  };

  const placeOrderEventHandler = () => {
    // TODO: put placeOrder events thru the MDL
    // get puchase history
    // write purchase history
  };

  useEffect(() => {
    mdl.subscribe.removeFromCart(event => cartEventHandler(event));
    mdl.subscribe.addToCart(event => cartEventHandler(event));
    mdl.subscribe.productPageView(productPageViewEventHandler);
    return () => {
      mdl.unsubscribe.removeFromCart(cartEventHandler);
      mdl.unsubscribe.addToCart(cartEventHandler);
      mdl.unsubscribe.productPageView(productPageViewEventHandler);
    };
  }, []);

  useEffect(() => {
    if (data && !error && !loading && firstLoad.current) {
      firstLoad.current = false;
      const firstLoadCart = transformData(data, 'firstLoad');
      localStorage.setItem(CART_CONTENTS_KEY, JSON.stringify(firstLoadCart));
    }
  }, [data, error, loading, firstLoad]);
};

const transformData = (shoppingCart, trigger) => {
  let dsCart;
  console.log('transformData', { shoppingCart, trigger });
  if (
    shoppingCart &&
    shoppingCart.cart &&
    shoppingCart.cart.items &&
    shoppingCart.cart.items.length > 0
  ) {
    dsCart = {
      cart: {
        items: shoppingCart.cart.items.map(item => {
          const { product, prices } = item;
          return {
            options: item.product_configuration_options,
            product_type: productTypesMap.get(product.__typename),
            item_id: item.id,
            qty: item.quantity,
            // configure_url I think pwa studio doesnt have a configure url for products
            is_visible_in_site_visibility:
              product.is_visible_in_site_visibility,
            product_id: product.id,
            product_name: product.name,
            product_sku: product.sku,
            product_url: resourceUrl(
              `${window.location.origin}/${product.url_key}${product.url_suffix}`,
            ),
            product_has_url: product.has_url,
            product_price: item.formatted_price,
            product_price_value: prices.price.value,
            product_image: {
              src: product.thumbnail.url,
              alt: product.thumbnail.label || '',
            },
            canApplyMsrp: item.can_apply_msrp,
          };
        }),
      },
    };
  } else {
    dsCart = [];
  }
  console.log('after transform', dsCart);
  return dsCart;
};
