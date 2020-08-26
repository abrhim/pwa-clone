import useCollector from './useCollector';
import { useEffect } from 'react';

const useCollectorEvents = args => {
    const magentoStoreEvents = useCollector();

    useEffect(() => {
        if (args) {
            magentoStoreEvents(...args);
        }
    }, [args, magentoStoreEvents]);
};

export default useCollectorEvents;
