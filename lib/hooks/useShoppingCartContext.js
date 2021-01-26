import { useEffect } from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useQuery } from '@apollo/client';
import PRODUCT_RECOMMENDATIONS_CART_QUERY from '../queries/productRecommendationsCart.gql';
import mdl from 'magento-data-layer-sdk';

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

const useShoppingCartContext = () => {
  const [{ cartId }] = useCartContext();
  const { data, error, loading } = useQuery(
    PRODUCT_RECOMMENDATIONS_CART_QUERY,
    {
      variables: { cartId },
      skip: !cartId,
      fetchPolicy: 'cache-and-network',
    },
  );

  if (error && process.env.NODE_ENV === 'development') {
    console.error('Magento ShoppingCart context query failed!', error);
  }

  useEffect(() => {
    let shoppingCartContext = null;
    if (data && data.cart) {
      const { cart } = data;
      shoppingCartContext = {
        cartId: getCartIdHash(cartId),
        subtotalExcludingTax: cart.prices.subtotal_excluding_tax.value,
        subtotalIncludingTax: cart.prices.subtotal_including_tax.value,
        itemsCount: cart.total_quantity,
        items: cart.items.map(item => {
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
    mdl.context.setShoppingCart(shoppingCartContext);
  }, [error, loading, data]);
};

export default useShoppingCartContext;
