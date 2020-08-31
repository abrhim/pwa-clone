import { useLocation } from '@magento/venia-concept/src/drivers';
import { useEffect, useState } from 'react';

const useLocationChanged = () => {
    const location = useLocation();
    const [locationChanged, setLocationChanged] = useState(false);
    const [locationPathName, setLocationPathName] = useState(null);

    useEffect(() => {
        if (location.pathname !== locationPathName) {
            setLocationChanged(true);
            setLocationPathName(location.pathname);
        } else {
            setLocationChanged(false);
        }
    }, [location, locationPathName]);

    return locationChanged;
};

export default useLocationChanged;
