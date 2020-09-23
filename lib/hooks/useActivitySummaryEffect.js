import { useCallback, useLayoutEffect } from 'react';
import { updateDataLayer } from '../util/updateDataLayer';
import usePageVisibility from './usePageVisibility';
import { useEventListener } from '@magento/peregrine';
import useHistoryBlock from './useHistoryBlock';

const useActivitySummaryEffect = props => {
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

    useHistoryBlock(handlePageUnload);
};

export default useActivitySummaryEffect;
