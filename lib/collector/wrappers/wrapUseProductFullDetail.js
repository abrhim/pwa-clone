import { useEffect, useState } from 'react';
import useProductContextEvents from '../hooks/useProductContextEvents';
import useCartPublisher from '../hooks/useCartPublisher';

const wrapUseProductFullDetail = orig => {
  return function useProductFullDetail(props) {
    useCartPublisher();

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
