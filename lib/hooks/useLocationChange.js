import { useLocation } from '@magento/venia-concept/src/drivers';
import { useEffect, useState } from 'react';
const useLocationChange = () => {
    const location = useLocation();
    const [locationChanged, setLocationChanged] = useState(false);
    const [locationPathName, setLocationPathName] = useState(null);

    useEffect(() => {
        if (locationPathName === null) {
            setLocationPathName(location.pathname);
        } else if (location.pathname !== locationPathName) {
            setLocationChanged(true);
            setLocationPathName(location.pathname);
        } else {
            setLocationChanged(false);
        }
    }, [location, locationPathName]);

    return {
        locationChanged,
        locationPathName
    };
};

export default useLocationChange;
