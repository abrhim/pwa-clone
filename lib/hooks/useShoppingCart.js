import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import PRODUCT_RECOMMENDATIONS_CART_QUERY from '../queries/productRecommendationsCart.gql';

const shoppingCartContextSchema =
  'http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0';
const useShoppingCart = () => {
  const [{ cartId }] = useCartContext();
  // set default value for data so we can safely destructure below
  const { data = {}, error, loading } = useQuery(
    PRODUCT_RECOMMENDATIONS_CART_QUERY,
    {
      variables: { cartId },
      skip: !cartId,
    },
  );

  if (error && process.env.NODE_ENV === 'development') {
    console.error('Magento ShoppingCart context query failed!', error);
  }

  const { cart } = data;
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
    schema: shoppingCartContextSchema,
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
