import { useQuery } from '@apollo/client';
import GET_MAGENTO_EXTENSION_CONTEXT from '../queries/getMagentoExtensionContext.graphql';
import { MAGENTO_EXTENSION_SCHEMA_URL } from '../constants';

const useMagentoExtension = () => {
  const { data, error } = useQuery(GET_MAGENTO_EXTENSION_CONTEXT);
  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Magento Extension context query failed!', error);
    }
    return null;
  }
  const magentoExtensionContext = data ? data.magentoExtensionContext : {};
  return data
    ? {
        schema: MAGENTO_EXTENSION_SCHEMA_URL,
        data: data.magentoExtensionContext
          ? {
              magentoExtensionVersion:
                magentoExtensionContext.magento_extension_version,
            }
          : {},
      }
    : null;
};

export default useMagentoExtension;
