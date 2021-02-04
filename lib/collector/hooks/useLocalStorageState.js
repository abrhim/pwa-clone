import React, { useEffect, useState } from 'react';

export default function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        JSON.stringify(defaultValue) || window.localStorage.getItem(key),
      );
    } catch (e) {
      value = defaultValue;
    }
    return value;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}