import { useLayoutEffect } from 'react';
import mdl from '@adobe/magento-data-layer-sdk';

const usePageHidden = isVisible => {
  useLayoutEffect(() => {
    if (!isVisible) {
      const pageOffsets = { ...mdl.context.getPageOffset() };
      mdl.context.setPageOffset({
        ...pageOffsets,
        eventType: 'visibilityHidden',
      });
      mdl.context.setPageOffset(pageOffsets);
    }
  }, [isVisible]);
};

export default usePageHidden;
