import useLocationChange from './useLocationChange';
import { useEffect } from 'react';
import mdl from 'magento-data-layer-sdk';

const useCustomUrl = () => {
  const { pageLoaded, prevPathName, locationPathName } = useLocationChange();

  // initialize referrer url context
  useEffect(() => {
    if (document.referrer) {
      mdl.context.setReferrerUrl({ referrerUrl: document.referrer });
      mdl.publish.referrerUrl();
    }
  }, []);

  // initialize customUrl
  useEffect(() => {
    mdl.context.setCustomUrl({ customUrl: window.location.href });
  }, []);

  useEffect(() => {
    const referrerContext = mdl.context.getReferrerUrl() || {};
    if (prevPathName) {
      referrerUrl = window.location.origin + prevPathName;
      if (referrerContext.referrerUrl !== referrerUrl) {
        mdl.context.setReferrerUrl({ referrerUrl });
        mdl.publish.referrerUrl();
      }
    }
  }, [pageLoaded, prevPathName]);

  useEffect(() => {
    const urlContext = mdl.context.getCustomUrl() || {};
    const customUrl = window.location.href;
    if (urlContext.customUrl !== customUrl) {
      mdl.context.setCustomUrl({ customUrl });
      mdl.publish.customUrl();
    }
  }, [locationPathName, pageLoaded]);
};

export default useCustomUrl;
