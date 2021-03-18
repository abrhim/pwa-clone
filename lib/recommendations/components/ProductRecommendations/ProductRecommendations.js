import React from 'react';
import useRecsTrackingProps from '../../hooks/useRecsTrackingProps';
import Gallery from '@magento/venia-ui/lib/components/Gallery';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from '!!style-loader!css-loader?modules!./ProductRecommendations.css';

export const ProductRecommendations = props => {
  const { units } = useRecsTrackingProps(props);

  const classes = mergeClasses(defaultClasses, props.classes);

  let galleryUnits = units.map(recommendationUnit => {
    const items = recommendationUnit.products.map(shapeItem);
    return (
      <div
        key={recommendationUnit.unitId}
        data-unit-id={recommendationUnit['data-unit-id']}
        className={[classes.root]}
      >
        <Gallery classes={{ items: classes.galleryItems }} items={items} />
      </div>
    );
  });

  if (units.length > 0) {
    return <div>{galleryUnits}</div>;
  }
  return null;
};

// format data for GalleryItem, exported for testing
export const shapeItem = item => {
  const {
    url,
    image: { url: imageUrl },
    prices,
    productId,
    currency,
  } = item;

  // derive the url_key and url_suffix from the url
  // example url --> https://magento.com/blah/blah/url_key.url_suffix
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
