import { useLocation } from '@magento/venia-concept/src/drivers';
import { useEffect, useRef } from 'react';
const useLocationChange = () => {
  const location = useLocation();
  const locationChanged = useRef(false);
  const locationPathName = useRef(null);
  const prevPathName = useRef(null);

  useEffect(() => {
    if (locationPathName.current === null) {
      locationPathName.current = location.pathname;
    } else if (location.pathname !== locationPathName) {
      locationChanged.current = true;
      prevPathName.current = locationPathName.current;
      locationPathName.current = location.pathname;
    } else {
      locationChanged.current = false;
    }
  }, [location, locationPathName]);

  return {
    locationChanged: locationChanged.current,
    locationPathName: locationPathName.current,
    prevPathName: prevPathName.current,
  };
};

export default useLocationChange;
