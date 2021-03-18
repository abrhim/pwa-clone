import { useState, useEffect } from 'react';
import useRecsData from './useRecsData';
import mdl from '@adobe/magento-data-layer-sdk';

const useRecsTrackingProps = props => {
  const [units, setUnits] = useState([]);
  const { data, isLoading, error } = useRecsData(props);

  useEffect(() => {
    if (data && data.results) {
      console.log(data);
      let tmpUnits = data.results.map(unit => {
        const products = unit.products.map(product => {
          const onClick = item => {
            console.log(item);
          };

          return {
            ...product,
            onClick,
            unit: { ...unit, configType: 'preconfigured' },
          };
        });

        return { ...unit, products, 'data-unit-id': unit.unitId };
      });
      setUnits(tmpUnits);
    }
  }, [data]);

  return { units, isLoading, error };
};

export default useRecsTrackingProps;
