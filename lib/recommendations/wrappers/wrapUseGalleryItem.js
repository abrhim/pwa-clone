export default function wrapUseGalleryItem(origUseGalleryItem) {
  return function(props) {
    const orig = origUseGalleryItem(props);
    const handleLinkClick = props.item.onClick ? props.item.onClick : undefined;
    if (!props.item.onClick && props.item) console.log(props.item);
    return {
      ...orig,
      handleLinkClick,
    };
  };
}
