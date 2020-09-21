import useCollector from './useCollector';
import { useLayoutEffect } from 'react';

const useCollectorEvents = args => {
    const magentoStoreEvents = useCollector();

    useLayoutEffect(() => {
        if (args) {
            magentoStoreEvents(...args);
        }
    }, [args, magentoStoreEvents]);
};

export default useCollectorEvents;
