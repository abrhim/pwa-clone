import { useCallback, useState } from 'react';
import { useEventListener } from '@magento/peregrine';

const useScrolls = () => {
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  let waitingOnAnimRequest = false;

  const documentScrollTop = () =>
    document.body.scrollTop || document.documentElement.scrollTop;

  const documentScrollLeft = () =>
    document.body.scrollLeft || document.documentElement.scrollLeft;

  const handleScrollUpdate = useCallback(() => {
    setXOffset(documentScrollLeft());
    setYOffset(documentScrollTop());
  }, []);

  const handleScroll = () => {
    if (!waitingOnAnimRequest) {
      requestAnimationFrame(() => {
        handleScrollUpdate();
        waitingOnAnimRequest = false;
      });
      waitingOnAnimRequest = true;
    }
  };

  useEventListener(window, 'scroll', handleScroll);

  return {
    xOffset: xOffset,
    yOffset: yOffset,
  };
};

export default useScrolls;
