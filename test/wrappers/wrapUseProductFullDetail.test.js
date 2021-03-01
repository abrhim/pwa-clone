import { renderHook } from '@testing-library/react-hooks';
import wrapUseProductFullDetail from '../../lib/collector/wrappers/wrapUseProductFullDetail';
import mdl from 'magento-data-layer-sdk';
import { sampleGraphQLProduct } from '../mocks';

test('both original function and wrapper functionality are run in the hook', () => {
  const functionToWrap = jest.fn();
  jest.spyOn(mdl.context, 'setProduct');
  jest.spyOn(mdl.publish, 'productPageView');
  jest.spyOn(mdl.publish, 'productPageView');
  const props = { product: sampleGraphQLProduct };

  // assert baseline empty context
  expect(mdl.context.getProduct()).toBeUndefined();

  const useProductFullDetail = wrapUseProductFullDetail(functionToWrap);
  const { unmount } = renderHook(() => useProductFullDetail(props));

  // Original hook gets called with props
  expect(functionToWrap).toHaveBeenCalledTimes(1);
  expect(functionToWrap).toHaveBeenCalledWith(props);

  // Handles product page view
  expect(mdl.context.setProduct).toHaveBeenCalledTimes(1);
  expect(mdl.publish.productPageView).toHaveBeenCalledTimes(1);
  expect(mdl.context.getProduct().id).toEqual(sampleGraphQLProduct.id);

  // Cleans up product context on page view
  unmount();
  expect(mdl.context.setProduct).toHaveBeenCalledTimes(2);
  expect(mdl.context.getProduct()).toEqual({});
});
