import { useEffect, useMemo, useState } from 'react';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';
import { findMatchingVariant } from '@magento/peregrine/lib/util/findMatchingProductVariant';
import useProductContextEvents from '../hooks/useProductContextEvents';

const trackProductFullDetail = orig => {
  return function useProductFullDetail(props) {
    const product = props.product;
    const [selectedOption, setSelectedOption] = useState(null);
    const [productSku, setProductSku] = useState(null);
    useMemo(() => {
      if (selectedOption) {
        setProductSku(prepareProductSku(product, selectedOption));
      }
    }, [selectedOption, product, setProductSku]);

    const {
      pushProductPageView,
      resetProductPageView,
    } = useProductContextEvents({ product });

    const { pushProductAddToCart } = useProductContextEvents({
      product,
      productSku,
    });

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
        pushProductAddToCart();
        return api.handleAddToCart(...args);
      },
      handleSelectionChange(...args) {
        setSelectedOption(args);
        return api.handleSelectionChange(...args);
      },
    };
  };
};

const prepareProductSku = (product, args) => {
  if (!isProductConfigurable(product)) {
    return null;
  }
  const prepareOptionSelections = () => {
    const optionSelections = new Map();
    optionSelections.set(args[0], args[1]);
    return optionSelections;
  };

  const prepareOptionCodes = () => {
    const optionCodes = new Map();
    const option = product.configurable_options.filter(option => {
      return option['attribute_id'] === args[0];
    });
    optionCodes.set(args[0], option[0]['attribute_code']);
    return optionCodes;
  };

  const variant = findMatchingVariant({
    variants: product.variants,
    optionSelections: prepareOptionSelections(),
    optionCodes: prepareOptionCodes(),
  });

  return (variant && variant.product.sku) || null;
};

export default trackProductFullDetail;
