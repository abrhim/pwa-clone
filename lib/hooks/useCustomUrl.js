import useLocationChange from './useLocationChange';
import { useCallback, useEffect, useRef } from 'react';
import useCustomUrlContextEvents from './useCustomUrlContextEvents';

const useCustomUrl = () => {
    const {
        locationChanged,
        prevPathName,
        locationPathName
    } = useLocationChange();
    const currentCustomUrl = useRef();
    const currentReferrerUrl = useRef();

    const customUrl = window.location.href;

    const {
        updateReferrerUrlContext,
        updateCustomUrlContext
    } = useCustomUrlContextEvents();

    const updateCustomUrl = useCallback(() => {
        updateCustomUrlContext(customUrl);
    }, [customUrl, updateCustomUrlContext]);

    const updateReferrerUrl = useCallback(
        referrerUrl => {
            updateReferrerUrlContext(referrerUrl);
        },
        [updateReferrerUrlContext]
    );

    useEffect(() => {
        let referrerUrl = document.referrer
            ? document.referrer
            : window.location.origin;
        if (prevPathName) {
            referrerUrl = window.location.origin + prevPathName;
        }
        if (currentReferrerUrl.current !== referrerUrl) {
            updateReferrerUrl(referrerUrl);
            currentReferrerUrl.current = referrerUrl;
        }
    }, [prevPathName, locationChanged, updateReferrerUrl]);

    useEffect(() => {
        if (currentCustomUrl.current !== customUrl) {
            updateCustomUrl();
            currentCustomUrl.current = customUrl;
        }
    }, [locationPathName, locationChanged, customUrl, updateCustomUrl]);
};

export default useCustomUrl;
