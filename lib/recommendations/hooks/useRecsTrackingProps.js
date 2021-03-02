import useRecsData from './useRecsData';

const useRecsTrackingProps = props => {
  const { data, error, isLoading } = useRecsData(props);
  //   expect an array --> go thru it and decorate it!!

  let dataWithProps;
  if (data) {
    dataWithProps = data.array.map(unit => {
      const trackingProps = {
        'data-unit-id': unit.unitId,
      };
      return { ...unit, trackingProps };
    });
  }

  return { data: dataWithProps, error, isLoading };
};
export default useRecsTrackingProps;
