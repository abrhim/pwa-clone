import useScrolls from '../hooks/useScrolls';
import { useCallback, useEffect, useRef, useState } from 'react';
import useActivitySummary from '../hooks/useActivitySummary';
import useActivitySummaryEffect from '../hooks/useActivitySummaryEffect';
import usePageVisibility from '../hooks/usePageVisibility';
import useActivitySummaryContextEvents from '../hooks/useActivitySummaryContextEvents';

// ping interval in seconds
const pingInterval = 5;
const useActivitySummaryCollector = () => {
  const isPageVisible = usePageVisibility();
  const pingsRef = useRef(0);
  const { xOffset, yOffset } = useScrolls();
  const [offsets, setOffsets] = useState({
    minXOffset: xOffset,
    maxXOffset: xOffset,
    minYOffset: yOffset,
    maxYOffset: yOffset,
  });
  const [updateActivitySummaryContext, setUpdateActivitySummaryContext] = useState(true);
  const xOffsetRef = useRef(xOffset);
  const yOffsetRef = useRef(yOffset);
  const resetActivitySummaryCollector = useCallback(() => {
    setOffsets({
      minXOffset: xOffsetRef.current,
      maxXOffset: xOffsetRef.current,
      minYOffset: yOffsetRef.current,
      maxYOffset: yOffsetRef.current,
    });
    pingsRef.current = 0;
    setUpdateActivitySummaryContext(true);
  }, []);

  const { updateActivitySummary } = useActivitySummaryContextEvents();
  useActivitySummaryEffect({ resetCollector: resetActivitySummaryCollector });

  const activitySummaryContext = useActivitySummary({
    ...offsets,
    pings: pingsRef.current,
    ping_interval: pingInterval,
  });

  useEffect(() => {
    if (updateActivitySummaryContext === true) {
      updateActivitySummary(activitySummaryContext);
      setUpdateActivitySummaryContext(false);
    }
  }, [activitySummaryContext, updateActivitySummary, updateActivitySummaryContext]);

  useEffect(() => {
    if (xOffset > offsets.maxXOffset) {
      setOffsets({ ...offsets, maxXOffset: xOffset });
    } else if (xOffset < offsets.minXOffset) {
      setOffsets({ ...offsets, minXOffset: xOffset });
    }

    if (yOffset > offsets.maxYOffset) {
      setOffsets({ ...offsets, maxYOffset: yOffset });
    } else if (yOffset < offsets.minYOffset) {
      setOffsets({ ...offsets, minYOffset: yOffset });
    }
  }, [offsets, xOffset, yOffset]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPageVisible) {
        pingsRef.current += 1;
        setUpdateActivitySummaryContext(true);
      }
    }, pingInterval * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isPageVisible]);

  useEffect(() => {
    xOffsetRef.current = xOffset;
  }, [xOffset]);

  useEffect(() => {
    yOffsetRef.current = yOffset;
  }, [yOffset]);
};

export default useActivitySummaryCollector;
