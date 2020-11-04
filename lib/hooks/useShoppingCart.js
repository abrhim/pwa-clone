import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import PRODUCT_RECOMMENDATIONS_CART_QUERY from '../queries/productRecommendationsCart.gql';
import { SHOPPING_CART_SCHEMA_URL } from '../constants';

const useShoppingCart = () => {
  const [{ cartId }] = useCartContext();
  const { data, error, loading } = useQuery(
    PRODUCT_RECOMMENDATIONS_CART_QUERY,
    {
      variables: { cartId },
      skip: !cartId,
    },
  );

  // create fake cart id to pass a cart id as a number
  const fakeCartId = useMemo(() => {
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
  }, [cartId]);

  if (error && process.env.NODE_ENV === 'development') {
    console.error('Magento ShoppingCart context query failed!', error);
  }

  const cart = data ? data.cart : null;
  const items = useMemo(() => (cart ? cart.items : []), [cart]);
  const numItems = cart ? cart.total_quantity : 0;

  const prepareItems = useCallback(() => {
    return items.map(item => {
      return {
        cartItemId: item.id,
        productName: item.product.name,
        qty: item.quantity,
        productSku: item.product.sku,
        offerPrice: item.prices.price.value,
        mainImageUrl: item.product.image.url,
      };
    });
  }, [items]);

  if (error || loading || !data) {
    return null;
  }

  return {
    schema: SHOPPING_CART_SCHEMA_URL,
    data: {
      cartId: fakeCartId,
      subtotalExcludingTax: cart ? cart.prices.subtotal_excluding_tax.value : 0,
      subtotalIncludingTax: cart ? cart.prices.subtotal_including_tax.value : 0,
      itemsCount: numItems,
      items: prepareItems(),
    },
  };
};

export default useShoppingCart;
