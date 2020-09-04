import useScrolls from '../hooks/useScrolls';
import { useCallback, useEffect, useState } from 'react';
import { updateDataLayer } from '../util/updateDataLayer';
import useActivitySummary from '../hooks/useActivitySummary';
import useActivitySummaryEffect from '../hooks/useActivitySummaryEffect';
import usePageVisibility from '../hooks/usePageVisibility';

// ping interval in seconds
const pingInterval = 5;
const useActivitySummaryCollector = () => {
    const isPageVisible = usePageVisibility();
    const [pings, setPings] = useState(0);
    const { xOffset, yOffset } = useScrolls();
    const [offsets, setOffsets] = useState({
        minXOffset: xOffset,
        maxXOffset: xOffset,
        minYOffset: yOffset,
        maxYOffset: yOffset
    });
    const [
        updateActivitySummaryContext,
        setUpdateActivitySummaryContext
    ] = useState(true);

    const resetActivitySummaryCollector = useCallback(() => {
        setOffsets({
            minXOffset: xOffset,
            maxXOffset: xOffset,
            minYOffset: yOffset,
            maxYOffset: yOffset
        });
        setPings(0);
    }, [xOffset, yOffset]);

    useActivitySummaryEffect({ resetCollector: resetActivitySummaryCollector });

    const activitySummaryContext = useActivitySummary({
        ...offsets,
        pings,
        ping_interval: pingInterval
    });

    useEffect(() => {
        if (updateActivitySummaryContext === true) {
            console.log(activitySummaryContext);
            updateDataLayer({
                contextName: 'page-offsets',
                context: activitySummaryContext
            });
            setUpdateActivitySummaryContext(false);
        }
    }, [activitySummaryContext, updateActivitySummaryContext]);

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
                setPings(pings => pings + 1);
                setUpdateActivitySummaryContext(true);
            }
        }, pingInterval * 1000);
        return () => {
            clearInterval(interval);
        };
    }, [isPageVisible, pings]);
};

export default useActivitySummaryCollector;
