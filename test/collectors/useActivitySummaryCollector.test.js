import { renderHook } from '@testing-library/react-hooks';
import useActivitySummaryCollector from '../../lib/collectors/useActivitySummaryCollector';
import useActivitySummaryInterval from '../../lib/hooks/useActivitySummaryInterval';
import usePageUnload from '../../lib/hooks/usePageUnload';
import usePageHidden from '../../lib/hooks/usePageHidden';
import useRouteChanged from '../../lib/hooks/useRouteChanged';
jest.mock('../../lib/hooks/useActivitySummaryInterval');
jest.mock('../../lib/hooks/usePageUnload');
jest.mock('../../lib/hooks/usePageHidden');
jest.mock('../../lib/hooks/useRouteChanged');

test('calls child hooks', () => {
  renderHook(() => useActivitySummaryCollector());
  expect(useActivitySummaryInterval).toHaveBeenCalledTimes(1);
  expect(useActivitySummaryInterval).toHaveBeenCalledWith(
    { maxXOffset: 1024, maxYOffset: 768, minXOffset: 0, minYOffset: 0 },
    { current: 0 },
    true,
  );
  expect(usePageUnload).toHaveBeenCalledTimes(1);
  expect(
    typeof usePageUnload.mock.calls[usePageUnload.mock.calls.length - 1][0],
  ).toEqual('function');
  expect(usePageHidden).toHaveBeenCalledTimes(1);
  expect(usePageHidden).toHaveBeenCalledWith(true);
  expect(useRouteChanged).toHaveBeenCalledTimes(1);
  expect(
    typeof useRouteChanged.mock.calls[useRouteChanged.mock.calls.length - 1][0],
  ).toEqual('function');
});
