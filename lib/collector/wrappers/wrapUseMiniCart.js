import { MINI_CART_QUERY } from '../queries/miniCartQuery.gql';
import useCartPublisher from '../hooks/useCartPublisher';

export const wrapUseMiniCart = orig => {
  return function useMiniCart(props) {
    useCartPublisher();
    props.operations.miniCartQuery = MINI_CART_QUERY;
    const api = orig(props);
    return api;
  };
};

export default wrapUseMiniCart;
