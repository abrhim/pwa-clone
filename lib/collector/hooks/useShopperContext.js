import { useEffect } from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import mdl from '@adobe/magento-storefront-events-sdk';

const useShopperContext = () => {
  const [{ isSignedIn }] = useUserContext();

  useEffect(() => {
    mdl.context.setShopper({
      shopperId: isSignedIn ? 'logged-in' : 'guest',
    });
  }, [isSignedIn]);
};

export default useShopperContext;
