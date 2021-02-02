import useLocation from './useLocation';
import { useEffect, useRef, useState } from 'react';
import mdl from 'magento-data-layer-sdk';

const useCustomUrl = () => {
  const location = useLocation();
  const prevPathName = useRef(location.pathname);
  // location isn't remaining consistent on page load, so have to add 
  const [pageLoaded, setPageLoaded] = useState(false);

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
    mdl.publish.customUrl();
  }, []);

  useEffect(() => {
    if (pageLoaded) {
      setPageLoaded(false);
      const referrerContext = mdl.context.getReferrerUrl();
      const referrerUrl = window.location.origin + prevPathName.current;
      if (referrerContext.referrerUrl !== referrerUrl) {
        mdl.context.setReferrerUrl({ referrerUrl });
        mdl.publish.referrerUrl();
      }
      prevPathName.current = location.pathname;
    }
  }, [pageLoaded]);

  useEffect(() => {
    const urlContext = mdl.context.getCustomUrl() || {};
    const customUrl = window.location.href;
    if (urlContext.customUrl !== customUrl) {
      setPageLoaded(true);
      mdl.context.setCustomUrl({ customUrl });
      mdl.publish.customUrl();
    }
  }, [location]);
};

export default useCustomUrl;
