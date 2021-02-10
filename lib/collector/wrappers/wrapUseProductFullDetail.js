import { useEffect, useState } from 'react';
import useProductContextEvents from '../hooks/useProductContextEvents';

const wrapUseProductFullDetail = orig => {
  return function useProductFullDetail(props) {
    const product = props.product;

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
    return api;
  };
};

export default wrapUseProductFullDetail;
