import useViewedOffsets from '../hooks/useViewedOffsets';
import {
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
} from 'react';
import { useEventListener } from '@magento/peregrine';
import usePageVisibility from '../hooks/usePageVisibility';
import useLocation from '../hooks/useLocation';
import mdl from 'magento-data-layer-sdk';

// ping interval in seconds
const PING_INTERVAL = 5;

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

  useInterval(offsets, pingsRef, isVisible);
  usePageUnload(handleBeforeUnload);
  usePageHidden(isVisible);
  useRouteChanged(handleBeforeUnload);
};

const useInterval = (offsets, pingsRef, isVisible) => {
  const [delay, setDelay] = useState(PING_INTERVAL * 1000);
  const getPageOffsetContext = useCallback(() => {
    pingsRef.current += 1;
    mdl.context.setPageOffset({
      ...offsets,
      pings: pingsRef.current,
      ping_interval: PING_INTERVAL,
    });
    mdl.publish.pageActivitySummary();
  }, [offsets, pingsRef]);

  const savedCallback = useRef(getPageOffsetContext);

  useEffect(() => {
    // If tab is switched, pause the interval
    setDelay(isVisible ? PING_INTERVAL * 1000 : null);
  }, [isVisible]);

  useEffect(() => {
    savedCallback.current = getPageOffsetContext;
  }, [getPageOffsetContext]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const usePageUnload = handleBeforeUnload => {
  // Handle closing the page or navigating away
  useEventListener(window, 'beforeunload', handleBeforeUnload);
};

const usePageHidden = isVisible => {
  useLayoutEffect(() => {
    if (!isVisible) {
      const pageOffsets = { ...mdl.context.getPageOffset() };
      mdl.context.setPageOffset({
        ...pageOffsets,
        eventType: 'visibilityHidden',
      });
      mdl.publish.pageActivitySummary();
      mdl.context.setPageOffset(pageOffsets);
    }
  }, [isVisible]);
};

const useRouteChanged = handleBeforeUnload => {
  const location = useLocation();
  // Handle navigating within pwa studio
  useLayoutEffect(() => {
    handleBeforeUnload();
  }, [handleBeforeUnload, location]);
};

export default useActivitySummaryCollector;
