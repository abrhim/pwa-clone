import useGlobalContexts from '../hooks/useGlobalContexts';
import useGlobalContextsUpdateEffect from '../hooks/useGlobalContextsUpdateEffect';
import useDataLayerEffect from '../hooks/useDataLayerEffect';
import useCollector from '../collectors/useCollector';
import useCreateDataLayerEventHandlers from '../hooks/useCreateDataLayerEventHandlers';
import usePageView from "../collectors/usePageView";
import useActivitySummaryCollector from '../collectors/useActivitySummaryCollector';
import useCustomUrl from '../hooks/useCustomUrl';

export default function loadOnUseApp(origUseApp) {
    return function useApp(props) {
        useCollector();
        useDataLayerEffect();
        useCreateDataLayerEventHandlers();
        const globalContexts = useGlobalContexts();
        useGlobalContextsUpdateEffect(globalContexts);
        useActivitySummaryCollector();
        useCustomUrl();
        usePageView();
        return origUseApp(props);
    };
}
