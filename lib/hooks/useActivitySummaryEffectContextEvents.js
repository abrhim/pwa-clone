import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';
import { pageActivitySummary, pageOffsetsContext } from '../constants';

const useActivitySummaryEffectContextEvents = () => {
  const handlePageUnload = useCallback(() => {
    updateDataLayer({
      contextName: pageOffsetsContext,
      context: {
        data: {
          eventType: 'pageUnload',
        },
      },
      event: pageActivitySummary,
    });
  }, []);

  const handleVisibilityHidden = useCallback(() => {
    updateDataLayer({
      contextName: pageOffsetsContext,
      context: {
        data: {
          eventType: 'visibilityHidden',
        },
      },
      event: pageActivitySummary,
    });
  }, []);

  return {
    handlePageUnload,
    handleVisibilityHidden,
  };
};

export default useActivitySummaryEffectContextEvents;
