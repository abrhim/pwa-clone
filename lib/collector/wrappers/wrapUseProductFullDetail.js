import { useEffect, useState } from 'react';
import useProductContextEvents from '../hooks/useProductContextEvents';
import useCartPublisher from '../hooks/useCartPublisher';

const wrapUseProductFullDetail = orig => {
  return function useProductFullDetail(props) {
    const product = props.product;
    const [selectedOption, setSelectedOption] = useState(null);

    const { setCartUpdating } = useCartPublisher();
    const {
      pushProductPageView,
      resetProductPageView,
    } = useProductContextEvents({ product });

    useEffect(() => {
      pushProductPageView();
      return () => {
        resetProductPageView();
      };
    }, [pushProductPageView, resetProductPageView]);

    const api = orig(props);
    return {
      ...api,
      handleAddToCart(...args) {
        setCartUpdating(true);
        return api.handleAddToCart(...args);
      },
      handleSelectionChange(...args) {
        setSelectedOption(args);
        return api.handleSelectionChange(...args);
      },
    };
  };
};

export default wrapUseProductFullDetail;
