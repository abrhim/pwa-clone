import { useCallback, useEffect, useLayoutEffect } from 'react';
import { updateDataLayer } from '../util/updateDataLayer';
import useLocationChange from './useLocationChange';
import usePageVisibility from './usePageVisibility';
import { useEventListener } from '@magento/peregrine';

const useActivitySummaryEffect = props => {
    const { locationChanged, locationPathName } = useLocationChange();
    const { resetCollector } = props;
    const isVisible = usePageVisibility();
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
    }, []);

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

    useEventListener(window, 'beforeunload', handlePageUnload);

    useLayoutEffect(() => {
        if (!isVisible) {
            handleVisibilityHidden();
        }
    }, [handleVisibilityHidden, isVisible]);

    useEffect(() => {
        if (locationChanged === true && locationPathName) {
            handlePageUnload();
        }
    }, [handlePageUnload, locationChanged, locationPathName]);
};

export default useActivitySummaryEffect;
