import useLocation from './useLocation';
import { useEffect } from 'react';
import mdl from '@adobe/magento-data-layer-sdk';

const useCustomUrl = () => {
  const location = useLocation();

  useEffect(() => {
    const urlContext = mdl.context.getCustomUrl() || {};
    const customUrl = window.location.href;
    if (urlContext.customUrl !== customUrl) {
      mdl.context.setCustomUrl({ customUrl });
      mdl.publish.customUrl();
    }
  }, [location]);
};

export default useCustomUrl;
