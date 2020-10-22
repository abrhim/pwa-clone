import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';

const useActivitySummaryEffectContextEvents = () => {
    const handlePageUnload = useCallback(() => {
        updateDataLayer({
            contextName: 'page-offsets',
            context: {
                data: {
                    eventType: 'pageUnload',
                },
            },
            event: 'page-activity-summary',
        });
    }, []);

    const handleVisibilityHidden = useCallback(() => {
        updateDataLayer({
            contextName: 'page-offsets',
            context: {
                data: {
                    eventType: 'visibilityHidden',
                },
            },
            event: 'page-activity-summary',
        });
    }, []);

    return {
        handlePageUnload,
        handleVisibilityHidden,
    };
};

export default useActivitySummaryEffectContextEvents;
