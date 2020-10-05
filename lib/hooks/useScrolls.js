import {useCallback, useRef} from 'react';
import { useEventListener } from '@magento/peregrine';
import debounce from 'lodash.debounce';

const useScrolls = () => {
    const xOffset = useRef(0);
    const yOffset = useRef(0);

    const documentScrollTop = () => document.body.scrollTop || document.documentElement.scrollTop;

    const documentScrollLeft = () => document.body.scrollLeft || document.documentElement.scrollLeft;

    const handleScrollUpdate = useCallback(() => {
        xOffset.current = documentScrollLeft();
        yOffset.current = documentScrollTop();
    }, []);

    const debouncedHandleScroll = debounce(handleScrollUpdate, 50);

    useEventListener(window, 'scroll', debouncedHandleScroll);

    return {
        xOffset : xOffset.current,
        yOffset : yOffset.current
    };
};

export default useScrolls;
