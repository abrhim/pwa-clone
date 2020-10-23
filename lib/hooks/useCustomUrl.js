import useLocationChange from './useLocationChange';
import { useEffect, useRef } from 'react';
import useCustomUrlContextEvents from './useCustomUrlContextEvents';

const useCustomUrl = () => {
  const {
    locationChanged,
    prevPathName,
    locationPathName,
  } = useLocationChange();
  const defaultReferrerUrl = document.referrer
    ? document.referrer
    : window.location.origin;
  const currentCustomUrl = useRef();
  const currentReferrerUrl = useRef(defaultReferrerUrl);

  const {
    updateReferrerUrlContext,
    updateCustomUrlContext,
  } = useCustomUrlContextEvents();

  useEffect(() => {
    let referrerUrl = currentReferrerUrl.current;
    if (prevPathName) {
      referrerUrl = window.location.origin + prevPathName;
    }
    if (currentReferrerUrl.current !== referrerUrl) {
      updateReferrerUrlContext(referrerUrl);
      currentReferrerUrl.current = referrerUrl;
    }
  }, [locationChanged, prevPathName]);

  useEffect(() => {
    const customUrl = window.location.href;
    if (currentCustomUrl.current !== customUrl) {
      updateCustomUrlContext(customUrl);
      currentCustomUrl.current = customUrl;
    }
  }, [locationPathName, locationChanged]);
};

export default useCustomUrl;
