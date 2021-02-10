import { renderHook } from '@testing-library/react-hooks';
import useShopperContext from '../../lib/hooks/useShopperContext';
import mdl from 'magento-data-layer-sdk';

jest.mock('@magento/peregrine/lib/context/user', () => ({
  useUserContext: jest
    .fn()
    .mockReturnValueOnce([{ isSignedIn: true }])
    .mockReturnValueOnce([{ isSignedIn: false }]),
}));

test('useShopperContext', () => {
  const { rerender } = renderHook(() => useShopperContext());
  expect(mdl.context.getShopper().shopperId).toEqual('logged-in');
  rerender();
  expect(mdl.context.getShopper().shopperId).toEqual('guest');
});
