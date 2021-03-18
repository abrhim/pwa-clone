import mdl from '@adobe/magento-storefront-events-sdk';
import { useEffect, useRef } from 'react';
import { CART_CONTENTS_KEY } from '../constants';
import makeUrl from '@magento/venia-ui/lib/util/makeUrl';
import useShoppingCartQuery from '../../collector/hooks/useShoppingCartQuery';
import processGraphQLResponse from '../../collector/util/processGraphQLResponse';

export default () => {
  const firstLoad = useRef(true);
  const { data } = useShoppingCartQuery({
    fetchPolicy: 'cache-first',
    skip: !firstLoad.current,
  });

  const cartEventHandler = () => {
    const shoppingCartContext = mdl.context.getShoppingCart();
    const dsCart = transformData(shoppingCartContext);
    localStorage.setItem(CART_CONTENTS_KEY, JSON.stringify(dsCart));
  };

  // //  TODO: put product view history thru the MDL and test this code
  // const productPageViewEventHandler = () => {
  //   const product = mdl.context.getProduct();
  //   const productPageViewContext = {date: new Date().toISOString(), sku: product.sku }
  //   viewHistory.append(productPageViewContext)
  //   setViewHistory(viewHistory)
  // };

  //   // TODO: put placeOrder events thru the MDL
  // const placeOrderEventHandler = () => {
  //  // get puchase history
  //   // write purchase history
  // };

  useEffect(() => {
    mdl.subscribe.removeFromCart(event => cartEventHandler(event));
    mdl.subscribe.addToCart(event => cartEventHandler(event));

    return () => {
      mdl.unsubscribe.removeFromCart(cartEventHandler);
      mdl.unsubscribe.addToCart(cartEventHandler);
    };
  }, []);

  // todo: implement mdl.subscribe.updateCart and remove this "first load business" and put itinto cartPublisher
  useEffect(() => {
    if (data && firstLoad.current) {
      firstLoad.current = false;
      const firstLoadCart = transformData({ data }, 'firstLoad');
      const newCart = processGraphQLResponse(data.cart);
      mdl.context.setShoppingCart(newCart);
      localStorage.setItem(CART_CONTENTS_KEY, JSON.stringify(firstLoadCart));
    }
  }, [data, firstLoad]);
};

const productTypesMap = new Map([['SimpleProduct', 'simple']]);

const transformData = shoppingCart => {
  let dsCart;
  if (shoppingCart && shoppingCart.items && shoppingCart.items.length > 0) {
    dsCart = {
      cart: {
        items: shoppingCart.items.map(item => {
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
            product_url: makeUrl(
              `${window.location.origin}/${product.url_key}${
                product.url_suffix
              }`,
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
    dsCart = {
      cart: {
        items: [],
      },
    };
  }

  return dsCart;
};
