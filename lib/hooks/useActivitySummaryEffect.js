import { useCallback, useLayoutEffect } from 'react';
import usePageVisibility from './usePageVisibility';
import { useEventListener } from '@magento/peregrine';
import useHistoryBlock from './useHistoryBlock';
import useActivitySummaryEffectContextEvents from './useActivitySummaryEffectContextEvents';

const useActivitySummaryEffect = props => {
    const { resetCollector } = props;
    const isVisible = usePageVisibility();
    const { handleVisibilityHidden, handlePageUnload } = useActivitySummaryEffectContextEvents();
    const handleBeforeUnload = useCallback(() => {
        handlePageUnload();
        resetCollector();
    }, [handlePageUnload, resetCollector]);

    useEventListener(window, 'beforeunload', handleBeforeUnload);

    useLayoutEffect(() => {
        if (!isVisible) {
            handleVisibilityHidden();
        }
    }, [handleVisibilityHidden, isVisible]);

    useHistoryBlock(handleBeforeUnload);
};

export default useActivitySummaryEffect;
