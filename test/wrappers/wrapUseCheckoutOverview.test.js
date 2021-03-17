import { renderHook } from '@testing-library/react-hooks';
import wrapUseCheckoutOverview from '../../lib/collector/wrappers/wrapUseCheckoutOverview';
import mdl from '@adobe/magento-data-layer-sdk';
const cartId = 'test';
jest.mock('@magento/peregrine/lib/context/cart', () => ({
  useCartContext: () => [{ cartId }],
}));

test('both original function and wrapper functionality are run in the hook', () => {
  const handleSubmit = jest.fn();
  const functionToWrap = jest.fn().mockReturnValue({
    handleSubmit,
  });
  const useFlow = wrapUseCheckoutOverview(functionToWrap);
  const { result } = renderHook(() => useFlow());
  expect(functionToWrap).toHaveBeenCalledTimes(1);
  jest.spyOn(mdl.context, 'setShoppingCart');
  jest.spyOn(mdl.publish, 'initiateCheckout');
  result.current.handleSubmit();
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(mdl.context.setShoppingCart).toHaveBeenCalledTimes(1);
  expect(mdl.context.setShoppingCart).toHaveBeenLastCalledWith({
    cartId,
  });
  expect(mdl.publish.initiateCheckout).toHaveBeenCalledTimes(1);
  expect(mdl.context.getShoppingCart()).toEqual({
    cartId,
  });
});
