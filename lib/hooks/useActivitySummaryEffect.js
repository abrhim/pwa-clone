import { useCallback, useEffect, useState } from 'react';
import { updateDataLayer } from '../util/updateDataLayer';
import useLocationChange from './useLocationChange';

const useActivitySummaryEffect = props => {
    const { locationChanged, locationPathName } = useLocationChange();
    const { resetCollector } = props;
    const [lostFocused, setLostFocused] = useState(false);
    const handleVisibilityHidden = useCallback(() => {
        updateDataLayer({
            contextName: 'page-offsets',
            context: {
                data: {
                    eventType: 'visibilityHidden'
                }
            },
            event: 'page-activity-summary'
        });
        setLostFocused(true);
    }, []);

    const handleOnFocus = useCallback(() => {
        if (lostFocused === true) {
            resetCollector();
            setLostFocused(false);
        }
    }, [lostFocused, resetCollector]);

    const handlePageUnload = useCallback(() => {
        updateDataLayer({
            contextName: 'page-offsets',
            context: {
                data: {
                    eventType: 'pageUnload'
                }
            },
            event: 'page-activity-summary'
        });
        resetCollector();
    }, [resetCollector]);

    useEffect(() => {
        window.addEventListener('blur', handleVisibilityHidden);
        return () => {
            window.removeEventListener('blur', handleVisibilityHidden);
        };
    }, [handleVisibilityHidden]);

    useEffect(() => {
        window.addEventListener('focus', handleOnFocus);
        return () => {
            window.removeEventListener('focus', handleOnFocus);
        };
    }, [handleOnFocus]);

    useEffect(() => {
        window.addEventListener('beforeunload', handlePageUnload);
        return () => {
            window.removeEventListener('beforeunload', handlePageUnload);
        };
    }, [handlePageUnload]);

    useEffect(() => {
        if (locationChanged === true && locationPathName) {
            handlePageUnload();
        }
    }, [handlePageUnload, locationChanged, locationPathName]);
};

export default useActivitySummaryEffect;
