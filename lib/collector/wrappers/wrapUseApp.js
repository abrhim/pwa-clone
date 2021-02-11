import useCreateDataLayerEventHandlers from '../hooks/useCreateDataLayerEventHandlers';
import useActivitySummaryCollector from '../collectors/useActivitySummaryCollector';
import useCustomUrl from '../hooks/useCustomUrl';
import useReferrerUrl from '../hooks/useReferrerUrl';
import usePageView from '../hooks/usePageView';
import useShopperContext from '../hooks/useShopperContext';
import useStorefrontInstanceContext from '../hooks/useStorefrontInstanceContext';
import useMagentoExtensionContext from '../hooks/useMagentoExtensionContext';
import useCart from '../hooks/useCart';

export default function wrapUseApp(origUseApp) {
  return function(props) {
    // Create subscribers and load in collector
    useCreateDataLayerEventHandlers();
    // Wrap pwa hooks, request extra data, populate acdl
    useShopperContext();
    useStorefrontInstanceContext();
    useMagentoExtensionContext();
    useActivitySummaryCollector();
    useCart();
    useCustomUrl();
    useReferrerUrl();
    usePageView();
    return origUseApp(props);
  };
}
