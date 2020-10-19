import { useUserContext } from '@magento/peregrine/lib/context/user';
const useShopper = () => {
  const [{ isSignedIn }] = useUserContext();
  return {
    schema:
      'http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#',
    data: {
      shopperId: isSignedIn ? 'logged-in' : 'guest',
    },
  };
};

export default useShopper;
