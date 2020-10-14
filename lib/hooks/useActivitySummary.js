import { useMemo } from 'react';

const useActivitySummary = props => {
  return useMemo(() => {
    return {
      schema:
        'http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#',
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
