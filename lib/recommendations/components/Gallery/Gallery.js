import React, { useMemo } from 'react';
import { string, shape, array } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import GalleryItem from '@magento/venia-ui/lib/components/Gallery/item';
// inline loading of the css is janky, but the webpack loader gets blown out in local environment.
import defaultGalleryClasses from '!!style-loader!css-loader?modules!./gallery.css';
import defaultItemClasses from '!!style-loader!css-loader?modules!./item.css';

/**
 * Renders a Gallery of items. If items is an array of nulls Gallery will render
 * a placeholder item for each.
 *
 * @params {Array} props.items an array of items to render
 */
export const Gallery = props => {
  const galleryClasses = mergeClasses(
    defaultGalleryClasses,
    props.galleryClasses,
  );
  const itemClasses = mergeClasses(defaultItemClasses, props.itemClasses);

  const { items } = props;

  const galleryItems = useMemo(
    () =>
      items.map(item => {
        if (item === null) {
          return <GalleryItem key={item.id} />;
        }
        return <GalleryItem key={item.id} item={item} classes={itemClasses} />;
      }),
    [items],
  );

  return (
    <div className={galleryClasses.root}>
      <div className={galleryClasses.items}>{galleryItems}</div>
    </div>
  );
};

Gallery.propTypes = {
  classes: shape({
    filters: string,
    items: string,
    root: string,
  }),
  items: array.isRequired,
};
