import { useEffect } from 'react';
import { useShoppingCartQuery } from './useShoppingCartContext';
import { CART_CONTENTS_KEY } from '../constants';
import mdl from 'magento-data-layer-sdk';

const cartPublisher = () => {
  const { data: currentCart } = useShoppingCartQuery({
    fetchPolicy: 'cache-first',
  });

  console.log('query', currentCart);

  useEffect(() => {
    console.log('ue', currentCart);
    if (currentCart && currentCart.cart && currentCart.cart.items) {
      let previousCart;
      try {
        previousCart = JSON.parse(localStorage.getItem(CART_CONTENTS_KEY));
      } catch (err) {
        console.log(err);
      }
      console.log(previousCart);
      if (previousCart && previousCart.cart && previousCart.cart.items) {
        console.log('previousCart', previousCart.cart.items.length);
        const prevCartLength = previousCart.cart.items.length;
        const currentCartLength = currentCart.cart.items.length;
        console.log({ prevCartLength, currentCartLength });

        if (currentCartLength < prevCartLength) {
          // remove item
          console.log('useEffect remove', currentCart);
          mdl.context.setShoppingCart(currentCart);
          mdl.publish.removeFromCart();
        } else if (currentCartLength > prevCartLength) {
          // add item
          mdl.context.setShoppingCart(currentCart);
          mdl.publish.addToCart();
        } else {
          console.log('equal!');
        }
      }
    }
  }, [currentCart]);
};

export default cartPublisher;
