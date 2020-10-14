import { updateDataLayer } from '../util/updateDataLayer';
import useLocationChange from './useLocationChange';
import {useCallback, useEffect, useRef} from 'react';
import {referrerUrl as referrerUrlContextName, customUrl as customUrlContextName} from "./useCreateDataLayerEventHandlers";

const useCustomUrl = () => {
    const { locationChanged, prevPathName, locationPathName } = useLocationChange();
    const currentCustomUrl = useRef();
    const currentReferrerUrl = useRef();

    const customUrl = window.location.href;

    const updateCustomUrl = useCallback(() => {
        updateDataLayer({
            event: customUrlContextName,
            contextName: customUrlContextName,
            context: customUrl
        });
    }, [customUrl]);

    const updateReferrerUrl = (referrerUrl) => {
        updateDataLayer({
            event: referrerUrlContextName,
            contextName: referrerUrlContextName,
            context: referrerUrl
        });
    };

    useEffect(() => {
        let referrerUrl = document.referrer ? document.referrer : window.location.origin;
        if (prevPathName) {
            referrerUrl = window.location.origin + prevPathName;
        }
        if(currentReferrerUrl.current !==referrerUrl) {
            updateReferrerUrl(referrerUrl);
            currentReferrerUrl.current = referrerUrl;
        }
    }, [prevPathName, locationChanged]);

    useEffect(() => {
        if(currentCustomUrl.current !== customUrl) {
            updateCustomUrl();
            currentCustomUrl.current = customUrl
        }
    }, [locationPathName, locationChanged, customUrl, updateCustomUrl]);
};

export default useCustomUrl;
