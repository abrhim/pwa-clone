import { useState, useEffect } from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import useCheckoutDataLayer from '../collectors/useCartDataLayer';
import { useLazyQuery } from '@apollo/client';
import mdl from 'magento-data-layer-sdk';
import {
  useShoppingCartLazyQuery,
  useShoppingCartQuery,
} from '../hooks/useShoppingCartContext';
import { CART_CONTENTS_KEY } from '../constants';
export default function wrapUseProduct(orig) {
  return function useProduct(props) {
    const [cartUpdating, setCartUpdating] = useState();
    const [
      getCart,
      { data: currentCart, loading, called, error },
    ] = useShoppingCartLazyQuery();

    const previousCart = JSON.parse(
      window.localStorage.getItem(CART_CONTENTS_KEY),
    );

    const newProps = {
      ...props,
      setIsCartUpdating: update => {
        props.setIsCartUpdating(update);
        // setCartUpdating(update);
      },
    };

    const api = orig(newProps);

    useEffect(() => {
      const result = getCart();

      if (
        called &&
        cartUpdating &&
        !error &&
        !loading &&
        currentCart &&
        currentCart.cart &&
        previousCart.cart.items &&
        previousCart &&
        previousCart.cart &&
        previousCart.cart.items
      ) {
        const reducer = (accumulator, item) => accumulator + item.qty;
        const prevCartLength = previousCart.cart.items.reduce(reducer, 0);

        if (currentCart.cart.total_quantity < prevCartLength) {
          // remove item
          console.log('trans remove item');
          mdl.context.setShoppingCart(currentCart);
          mdl.publish.removeFromCart();
        } else if (currentCart.cart.total_quantity > prevCartLength) {
          // add item
          console.log('trans add item');
          mdl.context.setShoppingCart(currentCart);
          mdl.publish.addToCart();
        } else {
          console.log('cart lengths same');
        }
      }
    }, [cartUpdating, called, error, loading, previousCart, currentCart]);

    // legacy method of pushing to data layer
    const [cart] = useCartContext();
    const cartId = cart.cartId;
    const productSku = props.item.product.sku;
    const { pushCartRemoveItem } = useCheckoutDataLayer({
      cartId,
      productSku,
    });

    return {
      ...api,
      handleRemoveFromCart(...args) {
        // pushCartRemoveItem();
        // set;
        return api.handleRemoveFromCart(...args);
      },
    };
  };
}
