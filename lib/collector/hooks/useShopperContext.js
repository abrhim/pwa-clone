import { useEffect } from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import mdl from 'magento-data-layer-sdk';

const useShopperEvents = () => {
  const [{ isSignedIn }] = useUserContext();

  useEffect(() => {
    mdl.context.setShopper({
      shopperId: isSignedIn ? 'logged-in' : 'guest',
    });
  }, [isSignedIn]);
};

export default useShopperEvents;
