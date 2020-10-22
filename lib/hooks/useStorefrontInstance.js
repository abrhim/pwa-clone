import { useQuery } from '@apollo/client';
import GET_STOREFRONT_CONTEXT from '../queries/getStorefrontContext.graphql';
import { useEffect } from 'react';

const useStorefrontInstance = () => {
  const { data, error } = useQuery(GET_STOREFRONT_CONTEXT);

  useEffect(() => {
    if (error && process.env.NODE_ENV === 'development') {
      console.error('Magento Storefront Instance context query failed!', error);
    }
  }, [error]);

  return data
    ? {
        schema:
          'http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#',
        data: data.storefrontInstanceContext ? { ...data.storefrontInstanceContext } : {},
      }
    : null;
};

export default useStorefrontInstance;
