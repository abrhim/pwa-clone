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

  if (error && process.env.NODE_ENV === 'development') {
    console.error('Magento ShoppingCart context query failed!', error);
  }

  const cart = data ? data.cart : null;
  const items = useMemo(() => (cart ? cart.items : []), [cart]);
  const numItems = cart ? cart.total_quantity : 0;

  const prepareItems = useCallback(() => {
    return items.map(item => {
      return {
        items: {
          properties: {
            cartItemId: item.id,
            productName: item.product.name,
            qty: item.quantity,
            productSku: item.product.sku,
            offerPrice: item.prices.price.value,
            mainImageUrl: item.product.image.url,
          },
        },
      };
    });
  }, [items]);

  if (error || loading || !data) {
    return null;
  }

  return {
    schema: SHOPPING_CART_SCHEMA_URL,
    data: {
      cartId: cartId,
      subtotalExcludingTax: cart ? cart.prices.subtotal_excluding_tax.value : 0,
      subtotalIncludingTax: cart ? cart.prices.subtotal_including_tax.value : 0,
      itemsCount: numItems,
      items: prepareItems(),
    },
  };
};

export default useShoppingCart;
