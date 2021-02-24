import { renderHook } from '@testing-library/react-hooks';
import useReferrerUrl from '../../lib/collector/hooks/useReferrerUrl';
import mdl from 'magento-data-layer-sdk';

const firstLocation = {
  pathname: '/first',
};
const secondLocation = {
  pathname: '/second',
};

jest.mock('react-router-dom', () => ({
  useLocation: jest
    .fn()
    .mockReturnValueOnce(firstLocation)
    .mockReturnValueOnce(secondLocation)
    .mockReturnValueOnce(secondLocation),
}));

test('referrer url flow control', () => {
  // Make window.location a writable
  Object.defineProperty(document, 'referrer', { value: 'http://referrer.com' });
  const referrerUrlSpy = jest.fn();
  mdl.subscribe.referrerUrl(referrerUrlSpy);
  const { rerender } = renderHook(() => useReferrerUrl());
  expect(referrerUrlSpy).toHaveBeenCalledTimes(1);
  expect(mdl.context.getReferrerUrl().referrerUrl).toEqual(document.referrer);
  rerender();
  expect(referrerUrlSpy).toHaveBeenCalledTimes(2);
  expect(mdl.context.getReferrerUrl().referrerUrl).toEqual(
    window.location.origin + firstLocation.pathname,
  );
  // Don't set new referrer url if location doesn't change
  rerender();
  expect(referrerUrlSpy).toHaveBeenCalledTimes(2);
  expect(mdl.context.getReferrerUrl().referrerUrl).toEqual(
    window.location.origin + firstLocation.pathname,
  );
});
