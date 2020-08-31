import useGlobalContexts from '../hooks/useGlobalContexts';
import useGlobalContextsUpdateEffect from '../hooks/useGlobalContextsUpdateEffect';
import useDataLayerEffect from '../hooks/useDataLayerEffect';
import useCollector from '../collectors/useCollector';
import useCreateDataLayerEventHandlers from '../hooks/useCreateDataLayerEventHandlers';
import useActivitySummaryCollector from "../collectors/useActivitySummaryCollector";

export default function loadOnUseApp(origUseApp) {
    return function useApp(props) {
        useCollector();
        useDataLayerEffect();
        useCreateDataLayerEventHandlers();
        const globalContexts = useGlobalContexts();
        useGlobalContextsUpdateEffect(globalContexts);
        useActivitySummaryCollector();
        return origUseApp(props);
    };
}
