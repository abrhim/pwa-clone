export default function wrapUseGalleryItem(origUseGalleryItem) {
  return function(props) {
    const orig = origUseGalleryItem(props);
    return {
      ...orig,
      handleLinkClick: () => {
        props.item.onClick(props.item);
      },
    };
  };
}
