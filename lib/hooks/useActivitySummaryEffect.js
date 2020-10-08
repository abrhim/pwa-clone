import { useCallback, useLayoutEffect } from 'react';
import usePageVisibility from './usePageVisibility';
import { useEventListener } from '@magento/peregrine';
import useHistoryBlock from './useHistoryBlock';
import usePageEvents from "../collectors/usePageEvents";

const useActivitySummaryEffect = props => {
    const { resetCollector } = props;
    const isVisible = usePageVisibility();
    const {handleVisibilityHidden, handlePageUnload} = usePageEvents()
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
