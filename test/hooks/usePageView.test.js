import { renderHook } from '@testing-library/react-hooks';
import usePageView from '../../lib/collector/hooks/usePageView';
import mdl from 'magento-data-layer-sdk';

const firstLocation = {
  pathname: '/',
};
const secondLocation = {
  pathname: '/test',
};

jest.mock('react-router-dom', () => ({
  useLocation: jest
    .fn()
    .mockReturnValueOnce(firstLocation)
    .mockReturnValueOnce(firstLocation)
    .mockReturnValueOnce(secondLocation),
}));

test('usePageView', () => {
  const pageViewSpy = jest.fn();
  mdl.subscribe.pageView(pageViewSpy);
  const { rerender } = renderHook(() => usePageView());
  expect(pageViewSpy).toHaveBeenCalledTimes(1);
  rerender();
  // no page view if location doesn't change
  expect(pageViewSpy).toHaveBeenCalledTimes(1);
  rerender();
  expect(pageViewSpy).toHaveBeenCalledTimes(2);
});
