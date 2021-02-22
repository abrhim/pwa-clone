import useViewedOffsets from '../hooks/useViewedOffsets';
import { useCallback, useRef } from 'react';
import usePageVisibility from '../hooks/usePageVisibility';
import useActivitySummaryInterval from '../hooks/useActivitySummaryInterval';
import usePageUnload from '../hooks/usePageUnload';
import usePageHidden from '../hooks/usePageHidden';
import useRouteChanged from '../hooks/useRouteChanged';
import mdl from 'magento-data-layer-sdk';

const useActivitySummaryCollector = () => {
  const pingsRef = useRef(0);
  const { offsets, resetScrollOffsets } = useViewedOffsets();
  const { isVisible } = usePageVisibility();

  const handleBeforeUnload = useCallback(() => {
    // publish unload event
    const pageOffsets = { ...mdl.context.getPageOffset() };
    mdl.context.setPageOffset({
      ...pageOffsets,
      eventType: 'pageUnload',
    });
    mdl.publish.pageActivitySummary();
    mdl.context.setPageOffset(pageOffsets);
    // reset everything
    resetScrollOffsets();
    pingsRef.current = 0;
  }, [resetScrollOffsets]);

  useActivitySummaryInterval(offsets, pingsRef, isVisible);
  usePageUnload(handleBeforeUnload);
  usePageHidden(isVisible);
  useRouteChanged(handleBeforeUnload);
};

export default useActivitySummaryCollector;
