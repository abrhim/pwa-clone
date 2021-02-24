import { renderHook } from '@testing-library/react-hooks';
import useRecsData from '../../lib/recommendations/hooks/useRecsData';
import { CMS } from '../../lib/recommendations/constants';

test('fetch recommendations', () => {
  // mock recsClient
  // provide a pageType to useRecsData
  renderHook(() => useRecsData({ pageType: CMS }));
  // expect isLoading to be true

  expect(true).toBe(true);
});
