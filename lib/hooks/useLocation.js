import { useLocation as useLocationDriver } from '@magento/venia-concept/src/drivers';

// This thin wrapper prevents us from having references to venia drivers literred around the code
const useLocation = () => {
  const location = useLocationDriver();

  return location;
};

export default useLocation;
