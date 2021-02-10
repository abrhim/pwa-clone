import { renderHook } from '@testing-library/react-hooks';
import useMagentoExtensionContext from '../../lib/hooks/useMagentoExtensionContext';
import mdl from 'magento-data-layer-sdk';

const magentoExtensionContext = { magento_extension_version: '1.2.3' };

jest.mock('@apollo/client', () => ({
  useQuery: jest
    .fn()
    .mockReturnValueOnce({
      data: undefined,
      error: 'test error',
    })
    .mockReturnValueOnce({
      data: { magentoExtensionContext },
    }),
}));

test('logs error and sets context to null on error', () => {
  const origError = console.error;
  console.error = jest.fn();
  renderHook(() => useMagentoExtensionContext());
  expect(mdl.context.getMagentoExtension()).toBeFalsy();
  expect(console.error).toHaveBeenCalledTimes(1);
  console.error = origError;
});

test('sets extension version', () => {
  renderHook(() => useMagentoExtensionContext());
  expect(mdl.context.getMagentoExtension().magentoExtensionVersion).toEqual(
    magentoExtensionContext.magento_extension_version,
  );
});
