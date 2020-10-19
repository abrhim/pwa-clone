import { updateDataLayer } from '../util/updateDataLayer';
import { pageViewEvent } from './useCreateDataLayerEventHandlers';

const usePageViewEvents = () => {
    const updatePageViewContext = () => {
        updateDataLayer({
            event: pageViewEvent
        });
    };

    return {
        updatePageViewContext
    };
};

export default usePageViewEvents;
