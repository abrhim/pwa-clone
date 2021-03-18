import { useState, useEffect } from 'react';
import useRecsData from './useRecsData';
import mse from '@adobe/magento-storefront-events-sdk';

const useRecsTrackingProps = props => {
  const [units, setUnits] = useState([]);
  const { data, isLoading, error } = useRecsData(props);

  useEffect(() => {
    if (data && data.results) {
      let tmpUnits = data.results.map(unit => {
        const products = unit.products.map(product => {
          const onClick = () => {
            mse.publish.recsItemClick({ recItem: product });
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
