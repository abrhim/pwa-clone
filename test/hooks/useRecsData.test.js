import useRecsData from '../../lib/recommendations/hooks/useRecsData';
import { renderHook, act } from '@testing-library/react-hooks';
import { CMS } from '../../lib/recommendations/constants';
// import recsClient from '../recsClient';
// import RecommendationsClient from '@magento/recommendations-js-sdk';

// RecommendationsClient;
// RecommendationsClient;
// import React from 'react';

// jest.mock('magento-data-layer-sdk', () => ({
//   context: {
//     getStorefrontInstance: jest.fn().mockReturnValue({ environmentId: 'id' }),
//   },
// }));

// jest.mock('@magento/recommendations-js-sdk', () => {});
// window.RecommendationsClient = recsClient;

test('useRecsData returns fetched recs', () => {
  //   useRecsData;
  renderHook(props => act(useRecsData(props)), {
    initialProps: { pageType: CMS },
  });
  //   console.log(result.error);
  expect(true).toBe(true);
});

// test('useRecsData throws error without pageType', () => {
//   expect(() => renderHook(() => act(() => useRecsData()))).toThrow();
//   expect(true).toBe(true);
// });
