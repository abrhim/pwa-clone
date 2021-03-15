import useRecsTrackingProps from '../../lib/recommendations/hooks/useRecsTrackingProps';
import { renderHook, act } from '@testing-library/react-hooks';
import { fetchedRecs } from '../mocks';
import { PageTypes, CMS } from '../../lib/recommendations/constants';

const mockFetchPreconfigured = jest.fn();
jest.mock('@magento/recommendations-js-sdk', () => {
  return jest
    .fn()
    .mockImplementation(() => ({ fetchPreconfigured: mockFetchPreconfigured }));
  //   return  fetchPreconfigured: jest.fn() };
});

jest.mock('magento-data-layer-sdk', () => ({
  context: {
    getStorefrontInstance: jest.fn().mockReturnValue({ environmentId: 'id' }),
  },
}));

it('useRecsData returns fetched recs with tracking Props', async () => {
  await act(async () => {
    mockFetchPreconfigured.mockReturnValue(fetchedRecs);
    try {
      const { result, waitForNextUpdate } = renderHook(() =>
        useRecsTrackingProps({ pageType: CMS }),
      );

      await waitForNextUpdate();
      await waitForNextUpdate();
      expect(result.current).toEqual({
        data: fetchedRecs.data,
        isLoading: false,
        error: null,
      });
    } catch (e) {
      console.error(e);
    }
  });
});
