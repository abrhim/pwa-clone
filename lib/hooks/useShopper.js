import { useUserContext } from '@magento/peregrine/lib/context/user';
import { SHOPPER_SCHEMA_URL } from '../constants';
const useShopper = () => {
  const [{ isSignedIn }] = useUserContext();
  return {
    schema: SHOPPER_SCHEMA_URL,
    data: {
      shopperId: isSignedIn ? 'logged-in' : 'guest',
    },
  };
};

export default useShopper;
