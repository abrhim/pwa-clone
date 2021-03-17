import useRecsData from '../../lib/recommendations/hooks/useRecsData';
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

jest.mock('@adobe/magento-data-layer-sdk', () => ({
  context: {
    getStorefrontInstance: jest.fn().mockReturnValue({ environmentId: 'id' }),
  },
}));

it('useRecsData returns fetched recs', async () => {
  await act(async () => {
    mockFetchPreconfigured.mockReturnValue(fetchedRecs);
    try {
      const { result, waitForNextUpdate } = renderHook(() =>
        useRecsData({ pageType: CMS }),
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

it('useRecsData throws error without pageType', () => {
  const {
    result: { error },
  } = renderHook(() => {
    act(useRecsData());
  });

  expect(error).toEqual(
    Error(
      'Headless Recommendations: PageType is required to fetch recommendations.',
    ),
  );
});

it('useRecsData throws error with an incorrect pagetype', () => {
  const {
    result: { error },
  } = renderHook(() => {
    act(useRecsData({ pageType: 'CSM' }));
  });

  expect(error).toEqual(
    Error(
      `Headless Recommendations: CSM is not a valid pagetype. Valid types include ${JSON.stringify(
        PageTypes,
      )}`,
    ),
  );
});
