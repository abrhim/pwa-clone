import useLocation from './useLocation';
import { useEffect, useRef } from 'react';
import mdl from '@adobe/magento-data-layer-sdk';

const useReferrerUrl = () => {
  const location = useLocation();
  const prevPathName = useRef();

  // initialize referrer url context
  useEffect(() => {
    if (document.referrer) {
      mdl.context.setReferrerUrl({ referrerUrl: document.referrer });
      mdl.publish.referrerUrl();
    }
  }, []);

  useEffect(() => {
    const referrerContext = mdl.context.getReferrerUrl();
    const referrerUrl = window.location.origin + prevPathName.current;
    if (
      prevPathName.current &&
      referrerContext &&
      referrerContext.referrerUrl !== referrerUrl
    ) {
      mdl.context.setReferrerUrl({ referrerUrl });
      mdl.publish.referrerUrl();
    }
    prevPathName.current = location.pathname;
  }, [location]);
};

export default useReferrerUrl;
