import { useState, useEffect } from 'react';
import { useShoppingCartLazyQuery } from './useShoppingCartContext';
import { CART_CONTENTS_KEY } from '../constants';
import mdl from 'magento-data-layer-sdk';

const cartPublisher = () => {
  const [
    getCart,
    { data: currentCart, loading, called, error },
  ] = useShoppingCartLazyQuery();
  const [cartUpdating, setCartUpdating] = useState();

  const previousCart = JSON.parse(
    window.localStorage.getItem(CART_CONTENTS_KEY),
  );

  useEffect(() => {
    if (cartUpdating) {
      getCart();
      setCartUpdating(false);
    }
  }, [cartUpdating, setCartUpdating]);

  useEffect(() => {
    if (
      called &&
      !error &&
      !loading &&
      currentCart &&
      currentCart.cart &&
      currentCart.cart.items &&
      previousCart &&
      previousCart.cart &&
      previousCart.cart.items
    ) {
      const reducer = (accumulator, item) => accumulator + item.qty;
      const prevCartLength = previousCart.cart.items.reduce(reducer, 0);

      if (currentCart.cart.total_quantity < prevCartLength) {
        // remove item
        mdl.context.setShoppingCart(currentCart);
        mdl.publish.removeFromCart();
      } else if (currentCart.cart.total_quantity > prevCartLength) {
        // add item
        mdl.context.setShoppingCart(currentCart);
        mdl.publish.addToCart();
      }
    }
  }, [called, error, loading, previousCart, currentCart, setCartUpdating]);
  return { setCartUpdating };
};

export default cartPublisher;
