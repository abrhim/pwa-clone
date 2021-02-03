import { useLocation as useLocationDriver } from '@magento/venia-concept/src/drivers';
import { useEffect, useState } from 'react';

// This thin wrapper prevents us from having references to venia drivers literred around the code
const useLocation = () => {
  const locationDriver = useLocationDriver();
  const [location, setLocation] = useState(locationDriver);

  useEffect(() => {
    // Location consistency is disrupted by Venia's implementation
    // This wrapper ensures that location only changes when the user navigates
    if (locationDriver.pathname !== location.pathname) {
      setLocation(locationDriver);
    }
  }, [locationDriver]);

  return location;
};

export default useLocation;
