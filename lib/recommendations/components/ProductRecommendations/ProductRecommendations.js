import React from 'react';
import useRecsTrackingProps from '../../hooks/useRecsTrackingProps';
export const ProductRecommendations = props => {
  console.log(props);
  const { data, error, isLoading } = useRecsTrackingProps(props);
  return <div>Loading</div>;
};
