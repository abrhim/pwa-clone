import { renderHook } from '@testing-library/react-hooks';
import useCustomUrl from '../../lib/collector/hooks/useCustomUrl';
import mdl from 'magento-data-layer-sdk';

const first = {
  pathname: '/first',
};
const second = {
  pathname: 'second',
};

jest.mock('react-router-dom', () => ({
  useLocation: jest
    .fn()
    .mockReturnValueOnce(first)
    .mockReturnValueOnce({ ...first })
    .mockReturnValueOnce(second)
    .mockReturnValueOnce(second),
}));

test('custom url flow control', () => {
  // Make window.location a writable
  delete window.location;
  const firstLocation = 'http://localhost/';
  const secondLocation = 'http://test.com/';
  window.location = new URL(firstLocation);
  const customUrlSpy = jest.fn();
  mdl.subscribe.customUrl(customUrlSpy);
  const { rerender } = renderHook(() => useCustomUrl());
  expect(customUrlSpy).toHaveBeenCalledTimes(1);
  expect(mdl.context.getCustomUrl().customUrl).toEqual(firstLocation);
  // refiring useEffect without changing location doesn't publish event
  rerender();
  expect(customUrlSpy).toHaveBeenCalledTimes(1);
  expect(mdl.context.getCustomUrl().customUrl).toEqual(firstLocation);
  // rerendering with new location fires events and updates context
  window.location = new URL(secondLocation);
  rerender();
  expect(customUrlSpy).toHaveBeenCalledTimes(2);
  expect(mdl.context.getCustomUrl().customUrl).toEqual(secondLocation);
});
