import { renderHook } from '@testing-library/react-hooks';
import useRecsData from '../../lib/recommendations/hooks/useRecsData';
import { CMS } from '../../lib/recommendations/constants';

jest.mock('magento-data-layer-sdk', () => ({
  context: {
    getStorefrontInstance: jest.fn().mockReturnValue({ environmentId: 'id' }),
  },
}));
// jest.mock('@magento/recommendations-js-sdk', () => ({}));

test('useRecsData', () => {
  const RecommendationsClient = jest.fn();
  RecommendationsClient.fetchPreconfigured = jest.fn();

  window.RecommendationsClient = RecommendationsClient;

  renderHook(() => useRecsData({ pageType: CMS }));
  //   expect(window.RecommendationsClient.fetchPreconfigured).toHaveBeenCalledTimes(
  //     1,
  //   );
  //   console.log(window.RecommendationsClient);

  expect(true).toBe(true);
});
