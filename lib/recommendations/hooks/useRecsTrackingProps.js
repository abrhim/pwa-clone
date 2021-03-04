import useRecsData from './useRecsData';
import { recsPropChecking } from '../utils';

export default useRecsTrackingProps = () => {
  const { data, error, isLoading } = useRecsData(props);
  //   expect an array --> go thru it and decorate it!!

  const dataWithProps = [];
  data.array.forEach(unit => {
    const newUnit = { ...unit };
    dataWithProps.push(newUnit);
  });

  return;
};
