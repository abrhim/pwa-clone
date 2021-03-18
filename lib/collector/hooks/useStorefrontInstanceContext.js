import { useQuery } from '@apollo/client';
import GET_STOREFRONT_CONTEXT from '../queries/getStorefrontContext.graphql';
import { useEffect } from 'react';
import mdl from '@adobe/magento-storefront-events-sdk';

const useStorefrontInstanceContext = () => {
  const { data, error } = useQuery(GET_STOREFRONT_CONTEXT);

  if (
    error &&
    (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  ) {
    console.error('Magento Storefront Instance context query failed!', error);
  }

  useEffect(() => {
    let storefrontInstanceContext = null;
    if (data && data.storefrontInstanceContext) {
      const { storefrontInstanceContext: storefront } = data;
      storefrontInstanceContext = {
        catalogExtensionVersion: storefront.catalog_extension_version,
        environment: storefront.environment,
        environmentId: storefront.environment_id,
        storeCode: storefront.store_code,
        storeId: storefront.store_id,
        storeName: storefront.store_name,
        storeUrl: storefront.store_url,
        storeViewCode: storefront.store_view_code,
        storeViewId: storefront.store_view_id,
        storeViewName: storefront.store_view_name,
        websiteCode: storefront.website_code,
        websiteId: storefront.website_id,
        websiteName: storefront.website_name,
      };
    }
    mdl.context.setStorefrontInstance(storefrontInstanceContext);
  }, [data, error]);
};

export default useStorefrontInstanceContext;
