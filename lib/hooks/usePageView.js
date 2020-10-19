import useLocationChange from '../hooks/useLocationChange';
import { useEffect } from 'react';
import usePageViewEvents from './usePageViewEvents';

const usePageView = () => {
    const { locationChanged } = useLocationChange();
    const { updatePageViewContext } = usePageViewEvents();
    useEffect(() => {
        if (locationChanged === true) {
            updatePageViewContext();
        }
    }, [locationChanged, updatePageViewContext]);
};

export default usePageView;
