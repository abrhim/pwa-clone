import { useEffect, useRef } from 'react';

const usePageVisibility = () => {
    const getIsDocumentVisible = () => document.visibilityState === 'visible';
    const isVisible = useRef(getIsDocumentVisible());

    useEffect(() => {
        const handleVisibilityChange = () =>
            (isVisible.current = getIsDocumentVisible());

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );
        };
    }, []);

    return { isVisible: isVisible.current };
};

export default usePageVisibility;
