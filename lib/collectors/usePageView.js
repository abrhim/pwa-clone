import useLocationChanged from '../hooks/useLocationChanged';
import { useEffect } from 'react';
import { updateDataLayer } from '../util/updateDataLayer';

const usePageView = () => {
    const locationChanged = useLocationChanged();
    useEffect(() => {
        if (locationChanged === true) {
            updateDataLayer({
                event: 'page-view'
            });
        }
    }, [locationChanged]);
};

export default usePageView;
