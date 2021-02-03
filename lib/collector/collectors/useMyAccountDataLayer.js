import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';

const useMyAccountDataLayer = () => {
  const pushMyAccountSignOut = useCallback(() => {
    updateDataLayer({
      contextName: 'shopper',
      context: {},
      event: 'sign-out',
    });
  }, []);

  return {
    pushMyAccountSignOut,
  };
};

export default useMyAccountDataLayer;
