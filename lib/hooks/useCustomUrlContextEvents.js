import { updateDataLayer } from '../util/updateDataLayer';
import { customUrl, referrerUrl } from './useCreateDataLayerEventHandlers';

const useCustomUrlContextEvents = () => {
  const updateCustomUrlContext = context => {
    updateDataLayer({
      event: customUrl,
      contextName: customUrl,
      context: context,
    });
  };

  const updateReferrerUrlContext = context => {
    updateDataLayer({
      event: referrerUrl,
      contextName: referrerUrl,
      context: context,
    });
  };

  return {
    updateCustomUrlContext,
    updateReferrerUrlContext,
  };
};

export default useCustomUrlContextEvents;
