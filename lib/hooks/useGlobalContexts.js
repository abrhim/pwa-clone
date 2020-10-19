import useShopper from './useShopper';
import useShoppingCart from './useShoppingCart';
import useStorefrontInstance from './useStorefrontInstance';
import useMagentoExtension from './useMagentoExtension';

const useGlobalContexts = () => {
  return {
    shopperContext: useShopper(),
    shoppingCartContext: useShoppingCart(),
    storefrontInstanceContext: useStorefrontInstance(),
    magentoExtensionContext: useMagentoExtension(),
  };
};

export default useGlobalContexts;
