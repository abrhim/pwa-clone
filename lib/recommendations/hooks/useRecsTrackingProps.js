import useRecsData from './useRecsData';

const useRecsTrackingProps = props => {
  const { data, isLoading, error } = useRecsData(props);

  return { data, isLoading, error };
};

export default useRecsTrackingProps;
