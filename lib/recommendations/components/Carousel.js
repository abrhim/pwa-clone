import React from 'react';
import GalleryItem from '@magento/venia-ui/lib/components/Gallery/item';

const Carousel = () => {
  console.log('heyo!');
  return (
    <div>
      <h1>Test</h1>
      <GalleryItem
        item={{
          id: 954,
          name: 'Thing',
          url_key: 'carola-infinity-scarf',
          small_image:
            'https://master-7rqtwti-5k2ulbou6q5ti.us-4.magentosite.cloud/media/catalog/product/v/a/va24_main.jpg?auto=webp&format=pjpg&width=160&height=200&fit=cover',
          price: {
            regularPrice: {
              amount: {
                value: 291,
                currency: 'USD',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Carousel;
