import MINI_CART_QUERY from '../queries/miniCartQuery.gql';

export const wrapUseMiniCart = orig => {
  return function useMiniCart(props) {
    props.operations.miniCartQuery = MINI_CART_QUERY;
    const api = orig(props);
    return api;
  };
};

export default wrapUseMiniCart;
