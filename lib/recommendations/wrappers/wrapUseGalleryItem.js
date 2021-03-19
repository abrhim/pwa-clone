export default function wrapUseGalleryItem(origUseGalleryItem) {
  return function(props) {
    const orig = origUseGalleryItem(props);
    const handleLinkClick = props.item.onClick ? props.item.onClick : undefined;
    return {
      ...orig,
      handleLinkClick,
    };
  };
}
