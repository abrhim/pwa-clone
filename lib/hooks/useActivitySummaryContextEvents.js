import { updateDataLayer } from '../util/updateDataLayer';

const useActivitySummaryContextEvents = () => {
  const updateActivitySummary = activitySummaryContext => {
    updateDataLayer({
      contextName: 'page-offsets',
      context: activitySummaryContext,
    });
  };

  return {
    updateActivitySummary,
  };
};

export default useActivitySummaryContextEvents;
