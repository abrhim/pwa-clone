import { updateDataLayer } from '../util/updateDataLayer';
import { useLocation } from '@magento/venia-concept/src/drivers';
import useLocationChange from './useLocationChange';
import { useCallback, useEffect, useState } from 'react';

const useCustomUrl = () => {
    const location = useLocation();
    const { locationChanged, prevPathname } = useLocationChange();
    const [referrerUrl, setReferrerUrl] = useState(document.referrer);

    const updateCustomUrl = useCallback(() => {
        updateDataLayer({
            event: 'custom-url',
            contextName: 'custom-url',
            context: window.location.href
        });
    }, []);

    const updateReferrerUrl = useCallback(() => {
        updateDataLayer({
            event: 'referrer-url',
            contextName: 'referrer-url',
            context: referrerUrl
        });
    }, [referrerUrl]);

    useEffect(() => {
        if (prevPathname) {
            const url = window.location.origin + prevPathname;
            setReferrerUrl(url);
        }
    }, [prevPathname, setReferrerUrl]);

    useEffect(() => {
        updateCustomUrl();
    }, [location.pathname, locationChanged, updateCustomUrl]);

    useEffect(() => {
        updateReferrerUrl();
    }, [updateReferrerUrl]);
};

export default useCustomUrl;
