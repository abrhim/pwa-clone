import { renderHook } from '@testing-library/react-hooks';
import useActivitySummaryInterval, {
  PING_INTERVAL,
} from '../../lib/collector/hooks/useActivitySummaryInterval';
import mdl from 'magento-data-layer-sdk';

const offsets = {
  maxXOffset: 1024,
  maxYOffset: 768,
  minXOffset: 0,
  minYOffset: 0,
};
const pingsRef = { current: 0 };
const isVisible = true;

test('updates pageOffsets context and sends pageSummary event', () => {
  window.setInterval = jest.fn().mockImplementation(cb => cb());
  window.clearInterval = jest.fn();
  jest.spyOn(mdl.context, 'setPageOffset');
  jest.spyOn(mdl.publish, 'pageActivitySummary');
  const { unmount } = renderHook(() =>
    useActivitySummaryInterval(offsets, pingsRef, isVisible),
  );
  expect(window.setInterval).toHaveBeenCalledTimes(1);
  expect(mdl.context.setPageOffset).toHaveBeenCalledTimes(1);
  expect(mdl.context.setPageOffset).toHaveBeenCalledWith({
    maxXOffset: offsets.maxXOffset,
    maxYOffset: offsets.maxYOffset,
    minXOffset: offsets.minXOffset,
    minYOffset: offsets.minYOffset,
    ping_interval: PING_INTERVAL,
    pings: pingsRef.current,
  });
  expect(mdl.publish.pageActivitySummary).toHaveBeenCalledTimes(1);

  unmount();
  expect(window.clearInterval).toHaveBeenCalledTimes(1);
});

test('turns off interval if page is not visible', () => {
  jest.spyOn(window, 'setInterval');
  renderHook(() => useActivitySummaryInterval(offsets, pingsRef, false));

  expect(
    window.setInterval.mock.calls[window.setInterval.mock.calls.length - 1][1],
  ).toEqual(null);
});
