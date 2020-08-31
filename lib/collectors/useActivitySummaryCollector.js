import useScrolls from '../hooks/useScrolls';
import { useCallback, useEffect, useRef, useState } from 'react';
import { updateDataLayer } from '../util/updateDataLayer';
import useActivitySummary from '../hooks/useActivitySummary';
import useActivitySummaryEffect from '../hooks/useActivitySummaryEffect';

// ping interval in seconds
const pingInterval = 5;
const useActivitySummaryCollector = () => {
    const [pings, setPings] = useState(0);
    const [offsets, setOffsets] = useState({
        minXOffset: 0,
        maxXOffset: 0,
        minYOffset: 0,
        maxYOffset: 0
    });
    const { xOffset, yOffset } = useScrolls();
    const [
        updateActivitySummaryContext,
        setUpdateActivitySummaryContext
    ] = useState(true);
    const xOffsetRef = useRef();
    const yOffsetRef = useRef();
    xOffsetRef.current = xOffset;
    yOffsetRef.current = yOffset;

    const resetActivitySummaryCollector = useCallback(() => {
        setOffsets({
            minXOffset: xOffsetRef.current,
            maxXOffset: xOffsetRef.current,
            minYOffset: yOffsetRef.current,
            maxYOffset: yOffsetRef.current
        });
        setPings(0);
    }, []);

    useActivitySummaryEffect({ resetCollector: resetActivitySummaryCollector });

    const activitySummaryContext = useActivitySummary({
        ...offsets,
        pings,
        ping_interval: pingInterval
    });

    useEffect(() => {
        if (updateActivitySummaryContext === true) {
            updateDataLayer({
                contextName: 'page-offsets',
                context: activitySummaryContext
            });
            setUpdateActivitySummaryContext(false);
        }
    }, [activitySummaryContext, updateActivitySummaryContext]);

    const updateOffsets = useCallback(() => {
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
        setUpdateActivitySummaryContext(true);
    }, [offsets, xOffset, yOffset]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPings(pings => pings + 1);
            updateOffsets();
        }, pingInterval * 1000);
        return () => {
            clearInterval(interval);
        };
    }, [updateOffsets]);
};

export default useActivitySummaryCollector;
