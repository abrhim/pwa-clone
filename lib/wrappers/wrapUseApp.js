import useGlobalContexts from '../hooks/useGlobalContexts';
import useGlobalContextsUpdateEffect from '../hooks/useGlobalContextsUpdateEffect';
import useCollector from '../collectors/useCollector';
import useCreateDataLayerEventHandlers from '../hooks/useCreateDataLayerEventHandlers';
import useActivitySummaryCollector from '../collectors/useActivitySummaryCollector';
import useCustomUrl from '../hooks/useCustomUrl';
import usePageView from '../hooks/usePageView';

export default function loadOnUseApp(origUseApp) {
  return function useApp(props) {
    useCollector();
    useCreateDataLayerEventHandlers();
    const globalContexts = useGlobalContexts();
    useGlobalContextsUpdateEffect(globalContexts);
    useActivitySummaryCollector();
    useCustomUrl();
    usePageView();
    return origUseApp(props);
  };
}
