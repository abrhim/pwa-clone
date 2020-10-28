import useLocationChange from '../hooks/useLocationChange';
import { useEffect } from 'react';
import usePageViewEvents from './usePageViewEvents';

const usePageView = () => {
  const { pageLoaded } = useLocationChange();
  const { updatePageViewContext } = usePageViewEvents();
  useEffect(() => {
    if (pageLoaded === true) {
      updatePageViewContext();
    }
  }, [pageLoaded, updatePageViewContext]);
};

export default usePageView;
