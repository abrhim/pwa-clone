import useCreateDataLayerEventHandlers from '../hooks/useCreateDataLayerEventHandlers';
import useActivitySummaryCollector from '../collectors/useActivitySummaryCollector';
import useCustomUrl from '../hooks/useCustomUrl';
import usePageView from '../hooks/usePageView';
import useShopperContext from '../hooks/useShopperContext';
import useShoppingCartContext from '../hooks/useShoppingCartContext';
import useStorefrontInstanceContext from '../hooks/useStorefrontInstanceContext';
import useMagentoExtensionContext from '../hooks/useMagentoExtensionContext';
import useSyncStorageToDataLayer from '../hooks/useSyncStorageToDataLayer';

export default function loadOnUseApp(origUseApp) {
  return function useApp(props) {
    // Create subscribers and load in collector
    useCreateDataLayerEventHandlers();
    // Wrap pwa hooks, request extra data, populate acdl
    useShopperContext();
    useShoppingCartContext();
    useStorefrontInstanceContext();
    useMagentoExtensionContext();
    useActivitySummaryCollector();
    useCustomUrl();
    usePageView();

    useSyncStorageToDataLayer();
    return origUseApp(props);
  };
}
