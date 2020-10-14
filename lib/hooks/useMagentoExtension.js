import { useQuery } from '@apollo/react-hooks';
import GET_MAGENTO_EXTENSION_CONTEXT from '../queries/getMagentoExtensionContext.graphql';

const useMagentoExtension = () => {
  const { data, error } = useQuery(GET_MAGENTO_EXTENSION_CONTEXT);
  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Magento Extension context query failed!', error);
    }
    return null;
  }
  return data
    ? {
        schema:
          'http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#',
        data: data.magentoExtensionContext ? { ...data.magentoExtensionContext } : {},
      }
    : null;
};

export default useMagentoExtension;
