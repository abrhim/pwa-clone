import { updateDataLayer } from '../util/updateDataLayer';
import { pageOffsetsContext } from '../constants';

const useActivitySummaryContextEvents = () => {
  const updateActivitySummary = activitySummaryContext => {
    updateDataLayer({
      contextName: pageOffsetsContext,
      context: activitySummaryContext,
    });
  };

  return {
    updateActivitySummary,
  };
};

export default useActivitySummaryContextEvents;
