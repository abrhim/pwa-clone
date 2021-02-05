jest.mock('../../lib/util/createCollector');
jest.mock('../../lib/collectors/useCollector');
import { renderHook } from '@testing-library/react-hooks';
import useCreateDataLayerEventHandlers, {
  prepareProductContexts,
} from '../../lib/hooks/useCreateDataLayerEventHandlers';
import mdl from 'magento-data-layer-sdk';
import useCollector from '../../lib/collectors/useCollector';
import {
  generateMagentoExtensionContext,
  generateProductContext,
  generateShopperContext,
  generateShoppingCart,
  generateStorefrontInstanceContext,
} from '../mocks';
import {
  MAGENTO_EXTENSION_SCHEMA_URL,
  SHOPPER_SCHEMA_URL,
  SHOPPING_CART_SCHEMA_URL,
  STOREFRONT_INSTANCE_SCHEMA_URL,
} from '../../lib/constants';

let collectorSpy = jest.fn();
useCollector.mockReturnValue(collectorSpy);

test('subscribes to and unsubscribes from events', () => {
  const addToCart = jest.spyOn(mdl.subscribe, 'addToCart');
  const productPageView = jest.spyOn(mdl.subscribe, 'productPageView');
  const pageActivitySummary = jest.spyOn(mdl.subscribe, 'pageActivitySummary');
  const customUrl = jest.spyOn(mdl.subscribe, 'customUrl');
  const referrerUrl = jest.spyOn(mdl.subscribe, 'referrerUrl');
  const pageView = jest.spyOn(mdl.subscribe, 'pageView');
  const unsubscribeAddToCart = jest.spyOn(mdl.unsubscribe, 'addToCart');
  const unsubscribeProductPageView = jest.spyOn(
    mdl.unsubscribe,
    'productPageView',
  );
  const unsubscribePageActivitySummary = jest.spyOn(
    mdl.unsubscribe,
    'pageActivitySummary',
  );
  const unsubscribeCustomUrl = jest.spyOn(mdl.unsubscribe, 'customUrl');
  const unsubscribeReferrerUrl = jest.spyOn(mdl.unsubscribe, 'referrerUrl');
  const unsubscribePageView = jest.spyOn(mdl.unsubscribe, 'pageView');
  const { rerender } = renderHook(() => useCreateDataLayerEventHandlers());

  // subscribers created on initial render
  expect(addToCart).toHaveBeenCalledTimes(1);
  expect(productPageView).toHaveBeenCalledTimes(1);
  expect(pageActivitySummary).toHaveBeenCalledTimes(1);
  expect(customUrl).toHaveBeenCalledTimes(1);
  expect(referrerUrl).toHaveBeenCalledTimes(1);
  expect(pageView).toHaveBeenCalledTimes(1);

  // change collector and rerender
  const newCollector = jest.fn();
  useCollector.mockReturnValueOnce(newCollector);
  rerender();

  // subscriptions cleaned up when collector changes
  expect(unsubscribeAddToCart).toHaveBeenCalledTimes(1);
  expect(unsubscribeCustomUrl).toHaveBeenCalledTimes(1);
  expect(unsubscribePageActivitySummary).toHaveBeenCalledTimes(1);
  expect(unsubscribePageView).toHaveBeenCalledTimes(1);
  expect(unsubscribeProductPageView).toHaveBeenCalledTimes(1);
  expect(unsubscribeReferrerUrl).toHaveBeenCalledTimes(1);

  // subscriptions recreated on second render
  expect(addToCart).toHaveBeenCalledTimes(2);
  expect(productPageView).toHaveBeenCalledTimes(2);
  expect(pageActivitySummary).toHaveBeenCalledTimes(2);
  expect(customUrl).toHaveBeenCalledTimes(2);
  expect(referrerUrl).toHaveBeenCalledTimes(2);
  expect(pageView).toHaveBeenCalledTimes(2);
});

test('add to cart event handled correctly', () => {
  renderHook(() => useCreateDataLayerEventHandlers());
  mdl.publish.addToCart();
  expect(collectorSpy).toHaveBeenLastCalledWith(
    'trackStructEvent',
    'product',
    'add-to-cart',
    null,
    null,
    null,
    [
      undefined,
      {
        data: undefined,
        schema: 'iglu:com.adobe.magento.entity/shopper/jsonschema/1-0-0',
      },
      {
        data: undefined,
        schema:
          'iglu:com.adobe.magento.entity/magento-extension/jsonschema/1-0-0',
      },
      {
        data: undefined,
        schema:
          'iglu:com.adobe.magento.entity/storefront-instance/jsonschema/2-0-0',
      },
    ],
  );
});

test('product page view event handled correctly', () => {
  renderHook(() => useCreateDataLayerEventHandlers());
  mdl.publish.productPageView();
  expect(collectorSpy).toHaveBeenLastCalledWith(
    'trackStructEvent',
    'product',
    'view',
    null,
    null,
    null,
    [
      undefined,
      {
        data: undefined,
        schema: 'iglu:com.adobe.magento.entity/shopper/jsonschema/1-0-0',
      },
      {
        data: undefined,
        schema:
          'iglu:com.adobe.magento.entity/magento-extension/jsonschema/1-0-0',
      },
      {
        data: undefined,
        schema:
          'iglu:com.adobe.magento.entity/storefront-instance/jsonschema/2-0-0',
      },
    ],
  );
});

test('page activity summary event handled correctly', () => {
  renderHook(() => useCreateDataLayerEventHandlers());
  mdl.publish.pageActivitySummary();
  expect(collectorSpy).toHaveBeenLastCalledWith('trackSelfDescribingEvent', {
    data: undefined,
    schema: 'iglu:com.adobe.magento.event/activity-summary/jsonschema/1-0-0',
  });
});

test('custom url event handled correctly', () => {
  renderHook(() => useCreateDataLayerEventHandlers());
  mdl.publish.customUrl();
  expect(collectorSpy).toHaveBeenLastCalledWith('trackSelfDescribingEvent', {
    data: undefined,
    schema: 'iglu:com.adobe.magento.event/activity-summary/jsonschema/1-0-0',
  });
});

test('referrer url event handled correctly', () => {
  renderHook(() => useCreateDataLayerEventHandlers());
  mdl.publish.referrerUrl();
  expect(collectorSpy).toHaveBeenLastCalledWith('setReferrerUrl', undefined);
});

test('page view event handled correctly', () => {
  renderHook(() => useCreateDataLayerEventHandlers());
  mdl.publish.pageView();
  expect(collectorSpy).toHaveBeenLastCalledWith('trackPageView');
});

test('prepareProductContext correctly formats context data', () => {
  const shopperContext = generateShopperContext();
  const storefrontInstanceContext = generateStorefrontInstanceContext();
  const magentoExtensionContext = generateMagentoExtensionContext();
  const productContext = generateProductContext();
  const shoppingCartContext = generateShoppingCart();

  const noCartResult = [
    productContext,
    {
      data: shopperContext,
      schema: SHOPPER_SCHEMA_URL,
    },
    {
      data: magentoExtensionContext,
      schema: MAGENTO_EXTENSION_SCHEMA_URL,
    },
    {
      data: storefrontInstanceContext,
      schema: STOREFRONT_INSTANCE_SCHEMA_URL,
    },
  ];

  mdl.context.setShopper(shopperContext);
  mdl.context.setStorefrontInstance(storefrontInstanceContext);
  mdl.context.setMagentoExtension(magentoExtensionContext);
  mdl.context.setProduct(productContext);

  const preparedContexts = prepareProductContexts();

  expect(preparedContexts).toEqual(noCartResult);

  mdl.context.setShoppingCart(shoppingCartContext);

  const preparedContextsWithCart = prepareProductContexts();

  expect(preparedContextsWithCart).toEqual([
    ...noCartResult,
    {
      data: shoppingCartContext,
      schema: SHOPPING_CART_SCHEMA_URL,
    },
  ]);
});
