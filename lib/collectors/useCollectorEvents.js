import useCollector from './useCollector';
import { useLayoutEffect } from 'react';

const useCollectorEvents = args => {
  const magentoStoreEvents = useCollector();

  if (args) {
    const entries = Object.values(args);
    entries.forEach(value => {
      magentoStoreEvents(...value);
    });
  }
};

export default useCollectorEvents;
