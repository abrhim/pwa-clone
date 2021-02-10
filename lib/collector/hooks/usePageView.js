import useLocation from '../hooks/useLocation';
import { useEffect } from 'react';
import mdl from 'magento-data-layer-sdk';

const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    mdl.publish.pageView();
  }, [location]);
};

export default usePageView;
