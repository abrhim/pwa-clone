import { useEffect } from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useQuery, useLazyQuery } from '@apollo/client';
import PRODUCT_RECOMMENDATIONS_CART_QUERY from '../queries/productRecommendationsCart.gql';
import mdl from 'magento-data-layer-sdk';

const useShoppingCartContext = () => {
  const { data, error, loading } = useShoppingCartQuery();

  useEffect(() => {
    let shoppingCartContext = null;
    if (data && data.cart) {
      shoppingCartContext = data.cart;
    }
    mdl.context.setShoppingCart(shoppingCartContext);
  }, [error, loading, data]);
};

export default useShoppingCartContext;

export const useShoppingCartQuery = skip => {
  const [{ cartId }] = useCartContext();
  const response = useQuery(PRODUCT_RECOMMENDATIONS_CART_QUERY, {
    variables: { cartId },
    skip: !cartId || skip,
    fetchPolicy: 'cache-and-network',
  });

  if (response.error && process.env.NODE_ENV === 'development') {
    console.error('Magento ShoppingCart context query failed!', response.error);
  }
  return response;
};

export const useShoppingCartLazyQuery = () => {
  const [{ cartId }] = useCartContext();
  const response = useLazyQuery(PRODUCT_RECOMMENDATIONS_CART_QUERY, {
    variables: { cartId },
    fetchPolicy: 'cache-and-network',
  });

  if (response.error && process.env.NODE_ENV === 'development') {
    console.error('Magento ShoppingCart context query failed!', error);
  }
  return response;
};
