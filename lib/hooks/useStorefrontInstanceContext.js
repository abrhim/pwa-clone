import { useQuery } from '@apollo/client';
import GET_STOREFRONT_CONTEXT from '../queries/getStorefrontContext.graphql';
import { useEffect } from 'react';
import mdl from 'magento-data-layer-sdk';

const useStorefrontInstanceContext = () => {
  const { data, error } = useQuery(GET_STOREFRONT_CONTEXT);

  if (error && process.env.NODE_ENV === 'development') {
    console.error('Magento Storefront Instance context query failed!', error);
  }

  useEffect(() => {
    let storefrontInstanceContext = null;
    if (data && data.storefrontInstanceContext) {
      storefrontInstanceContext = {
        catalogExtensionVersion:
          storefrontInstanceContext.catalog_extension_version,
        environment: storefrontInstanceContext.environment,
        environmentId: storefrontInstanceContext.environment_id,
        storeCode: storefrontInstanceContext.store_code,
        storeId: storefrontInstanceContext.store_id,
        storeName: storefrontInstanceContext.store_name,
        storeUrl: storefrontInstanceContext.store_url,
        storeViewCode: storefrontInstanceContext.store_view_code,
        storeViewId: storefrontInstanceContext.store_view_id,
        storeViewName: storefrontInstanceContext.store_view_name,
        websiteCode: storefrontInstanceContext.website_code,
        websiteId: storefrontInstanceContext.website_id,
        websiteName: storefrontInstanceContext.website_name,
      };
    }
    mdl.context.setStorefrontInstance(storefrontInstanceContext);
  }, [data, error, loading]);
};

export default useStorefrontInstanceContext;
