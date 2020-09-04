import { useCallback, useState } from 'react';
import { useEventListener } from '@magento/peregrine';

const useScrolls = () => {
    const [xOffset, setXOffset] = useState(0);
    const [yOffset, setYOffset] = useState(0);

    const documentScrollTop = useCallback(() => {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }, []);

    const documentScrollLeft = useCallback(() => {
        return document.body.scrollLeft || document.documentElement.scrollLeft;
    }, []);

    const handleScroll = useCallback(() => {
        setXOffset(documentScrollLeft());
        setYOffset(documentScrollTop());
    }, [documentScrollLeft, documentScrollTop]);

    useEventListener(window, 'scroll', handleScroll);

    return {
        xOffset,
        yOffset
    };
};

export default useScrolls;
