import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';

const useSignInDataLayer = props => {
  const { cartId } = props;

  const pushSignIn = useCallback(() => {
    updateDataLayer({
      contextName: 'shopper',
      context: {
        data: {
          cartId: cartId,
        },
      },
      event: 'sign-in',
    });
  }, [cartId]);

  return {
    pushSignIn,
  };
};

export default useSignInDataLayer;
