export const updateDataLayer = props => {
  const { context, contextName, event } = props;
  if (context && contextName && event) {
    adobeDataLayer.push({
      [contextName]: context,
      event,
    });
  } else if (context && contextName) {
    adobeDataLayer.push({
      [contextName]: context,
    });
  } else if (event) {
    adobeDataLayer.push({
      event,
    });
  }
};
