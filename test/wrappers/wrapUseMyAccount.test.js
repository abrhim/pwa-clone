import { renderHook } from '@testing-library/react-hooks';
import wrapUseMyAccount from '../../lib/collector/wrappers/wrapUseMyAccount';
import mdl from 'magento-data-layer-sdk';

test('useLocation only sets state when pathname changes', () => {
  const handleSignOut = jest.fn();
  const functionToWrap = jest.fn().mockReturnValue({
    handleSignOut,
  });
  const useMyAccount = wrapUseMyAccount(functionToWrap);
  const { result } = renderHook(() => useMyAccount());
  expect(functionToWrap).toHaveBeenCalledTimes(1);
  jest.spyOn(mdl.context, 'setShopper');
  jest.spyOn(mdl.publish, 'signOut');
  result.current.handleSignOut();
  expect(handleSignOut).toHaveBeenCalledTimes(1);
  expect(mdl.context.setShopper).toHaveBeenCalledTimes(1);
  expect(mdl.context.setShopper).toHaveBeenLastCalledWith({
    shopperId: 'guest',
  });
  expect(mdl.publish.signOut).toHaveBeenCalledTimes(1);
  expect(mdl.context.getShopper()).toEqual({
    shopperId: 'guest',
  });
});
