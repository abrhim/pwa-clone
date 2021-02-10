import { renderHook } from '@testing-library/react-hooks';
import usePageHidden from '../../lib/hooks/usePageHidden';
import mdl from 'magento-data-layer-sdk';

test('updates pageOffsets context and sends pageSummary event', () => {
  jest.spyOn(mdl.context, 'getPageOffset');
  jest.spyOn(mdl.context, 'setPageOffset');
  jest.spyOn(mdl.publish, 'pageActivitySummary');
  const { rerender } = renderHook(isVisible => usePageHidden(isVisible), {
    initialProps: true,
  });

  expect(mdl.context.getPageOffset).not.toHaveBeenCalled();
  expect(mdl.context.setPageOffset).not.toHaveBeenCalled();
  expect(mdl.publish.pageActivitySummary).not.toHaveBeenCalled();
  rerender(false);
  expect(mdl.context.getPageOffset).toHaveBeenCalledTimes(1);
  expect(mdl.context.setPageOffset).toHaveBeenCalledTimes(2);
  expect(mdl.context.setPageOffset.mock.calls[0][0].eventType).toEqual(
    'visibilityHidden',
  );
  expect(mdl.context.setPageOffset.mock.calls[1][0].eventType).toBeUndefined();
  expect(mdl.publish.pageActivitySummary).toHaveBeenCalledTimes(1);
});
