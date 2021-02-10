import useCreateDataLayerEventHandlers from '../hooks/useCreateDataLayerEventHandlers';
import useActivitySummaryCollector from '../collectors/useActivitySummaryCollector';
import useCustomUrl from '../hooks/useCustomUrl';
import useReferrerUrl from '../hooks/useReferrerUrl';
import usePageView from '../hooks/usePageView';
import useShopperContext from '../hooks/useShopperContext';
import useShoppingCartContext from '../hooks/useShoppingCartContext';
import useStorefrontInstanceContext from '../hooks/useStorefrontInstanceContext';
import useMagentoExtensionContext from '../hooks/useMagentoExtensionContext';
import useSyncMDLToLocalStorage from '../hooks/useSyncMDLToLocalStorage';

export default function loadOnUseApp(origUseApp) {
  return function useApp(props) {
    // Create subscribers and load in collector
    useCreateDataLayerEventHandlers();
    // Wrap pwa hooks, request extra data, populate acdl
    useShopperContext();
    // useShoppingCartContext();
    useStorefrontInstanceContext();
    useMagentoExtensionContext();
    useActivitySummaryCollector();
    useCustomUrl();
    useReferrerUrl();
    usePageView();
    useSyncMDLToLocalStorage();
    return origUseApp(props);
  };
}
