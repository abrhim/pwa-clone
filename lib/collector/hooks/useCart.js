import { useEffect } from 'react';
import useShoppingCartQuery from './useShoppingCartQuery';
// TODO: remove dep after mdl.cartUpdated() is implemented
import { CART_CONTENTS_KEY } from '../constants';
import mdl from 'magento-data-layer-sdk';

const cartPublisher = () => {
  const { data: currentCart } = useShoppingCartQuery({
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    // TODO: mdl.publish.cartUpdated(), mdl.context.setShoppingCart(currentCart)
    if (currentCart && currentCart.cart && currentCart.cart.items) {
      let previousCart;

      // TODO: const previousCart = mdl.context.getShoppingCart()
      try {
        previousCart = JSON.parse(localStorage.getItem(CART_CONTENTS_KEY));
      } catch (err) {
        console.log(err);
      }
      if (previousCart && previousCart.cart && previousCart.cart.items) {
        const prevCartLength = previousCart.cart.items.length;
        const currentCartLength = currentCart.cart.items.length;

        if (currentCartLength < prevCartLength) {
          // remove item
          mdl.context.setShoppingCart(currentCart.cart);
          mdl.publish.removeFromCart();
        } else if (currentCartLength > prevCartLength) {
          // add item
          mdl.context.setShoppingCart(currentCart.cart);
          mdl.publish.addToCart();
        }
      }
    }
  }, [currentCart]);
};

export default cartPublisher;
