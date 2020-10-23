import { useCallback, useLayoutEffect } from 'react';
import usePageVisibility from './usePageVisibility';
import { useEventListener } from '@magento/peregrine';
import useActivitySummaryEffectContextEvents from './useActivitySummaryEffectContextEvents';
import useLocationChange from './useLocationChange';

const useActivitySummaryEffect = props => {
  const { resetCollector } = props;
  const { isVisible } = usePageVisibility();
  const { locationChanged } = useLocationChange();
  const {
    handleVisibilityHidden,
    handlePageUnload,
  } = useActivitySummaryEffectContextEvents();
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

  useLayoutEffect(() => {
    if (locationChanged === true) {
      handleBeforeUnload();
    }
  }, [locationChanged]);
};

export default useActivitySummaryEffect;
