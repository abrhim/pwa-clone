import { useEffect } from 'react';
import { updateDataLayer } from '../util/updateDataLayer';
import {
  shopperContext as shopperContextName,
  shoppingCartContext as shoppingCartContextName,
  storefrontInstanceContext as storefrontInstanceContextName,
  magentoExtensionContext as magentoExtensionContextName,
} from '../constants';

const useGlobalContextsUpdateEffect = contexts => {
  const {
    shopperContext,
    shoppingCartContext,
    storefrontInstanceContext,
    magentoExtensionContext,
  } = contexts;

  useEffect(() => {
    updateDataLayer({
      contextName: shopperContextName,
      context: shopperContext,
    });
  }, [shopperContext]);

  useEffect(() => {
    updateDataLayer({
      contextName: shoppingCartContextName,
      context: shoppingCartContext,
    });
  }, [shoppingCartContext]);

  useEffect(() => {
    updateDataLayer({
      contextName: storefrontInstanceContextName,
      context: storefrontInstanceContext,
    });
  }, [storefrontInstanceContext]);

  useEffect(() => {
    updateDataLayer({
      contextName: magentoExtensionContextName,
      context: magentoExtensionContext,
    });
  }, [magentoExtensionContext]);
};

export default useGlobalContextsUpdateEffect;
