import { renderHook } from '@testing-library/react-hooks';
import wrapUseFlow from '../../lib/collector/wrappers/wrapUseFlow';
import mdl from '@adobe/magento-storefront-events-sdk';
const cartId = 'test';
jest.mock('@magento/peregrine/lib/context/cart', () => ({
  useCartContext: () => [{ cartId }],
}));

test('both original function and wrapper functionality are run in the hook', () => {
  const handleBeginCheckout = jest.fn();
  const functionToWrap = jest.fn().mockReturnValue({
    handleBeginCheckout,
  });
  const useFlow = wrapUseFlow(functionToWrap);
  const { result } = renderHook(() => useFlow());
  expect(functionToWrap).toHaveBeenCalledTimes(1);
  jest.spyOn(mdl.context, 'setShoppingCart');
  jest.spyOn(mdl.publish, 'initiateCheckout');
  result.current.handleBeginCheckout();
  expect(handleBeginCheckout).toHaveBeenCalledTimes(1);
  expect(mdl.context.setShoppingCart).toHaveBeenCalledTimes(1);
  expect(mdl.context.setShoppingCart).toHaveBeenLastCalledWith({
    cartId,
  });
  expect(mdl.publish.initiateCheckout).toHaveBeenCalledTimes(1);
  expect(mdl.context.getShoppingCart()).toEqual({
    cartId,
  });
});
