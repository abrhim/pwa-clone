import { useMemo } from 'react';
import { ACTIVITY_SUMMARY_SCHEMA_URL } from '../constants';

const useActivitySummary = props => {
  return useMemo(() => {
    return {
      schema: ACTIVITY_SUMMARY_SCHEMA_URL,
      data: {
        minXOffset: props.minXOffset,
        maxXOffset: props.maxXOffset,
        minYOffset: props.minYOffset,
        maxYOffset: props.maxYOffset,
        pings: props.pings,
        ping_interval: props.ping_interval,
      },
    };
  }, [props]);
};

export default useActivitySummary;
