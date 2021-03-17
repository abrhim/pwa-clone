import React from 'react';
import useRecsTrackingProps from '../../hooks/useRecsTrackingProps';
import Gallery from '@magento/venia-ui/lib/components/Gallery';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
// import defaultClasses from './ProductRecommendations.css';

export const ProductRecommendations = props => {
  const { units } = useRecsTrackingProps(props);

  let galleryUnits = units.map(recommendationUnit => {
    const items = recommendationUnit.products.map(shapeItem);
    return (
      <div
        key={recommendationUnit.unitId}
        data-unit-id={recommendationUnit['data-unit-id']}
      >
        <Gallery items={items} />
      </div>
    );
  });

  if (units.length > 0) {
    return <div>{galleryUnits}</div>;
  }
  return <div>Loading</div>;
};

// format data for GalleryItem
const shapeItem = item => {
  const {
    url,
    image: { url: imageUrl },
    prices,
    productId,
    currency,
  } = item;
  const urlArray = String(url)
    .split('/')
    .splice(-1)[0]
    .split('.');
  const url_key = urlArray[0];
  const url_suffix = `.${urlArray[1]}`;
  const price = {
    regularPrice: {
      amount: {
        value: prices.minimum.regular,
        currency,
      },
    },
  };

  return {
    ...item,
    id: productId,
    small_image: imageUrl,
    url_key,
    url_suffix,
    price,
  };
};
