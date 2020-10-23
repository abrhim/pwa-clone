import { useEffect, useState } from 'react';

const usePageVisibility = () => {
  const getIsDocumentVisible = () => document.visibilityState === 'visible';
  const [isVisible, setIsVisible] = useState(getIsDocumentVisible());

  useEffect(() => {
    const handleVisibilityChange = () => setIsVisible(getIsDocumentVisible());

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { isVisible };
};

export default usePageVisibility;
