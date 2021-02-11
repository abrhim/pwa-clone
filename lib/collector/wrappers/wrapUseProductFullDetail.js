import { useEffect, useState } from 'react';
import useProductContextEvents from '../hooks/useProductContextEvents';

const wrapUseProductFullDetail = origUseProductFullDetail => {
  return function(props) {
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

    const api = origUseProductFullDetail(props);
    return api;
  };
};

export default wrapUseProductFullDetail;
