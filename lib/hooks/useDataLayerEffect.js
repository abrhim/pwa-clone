import { useEffect } from 'react';

const useDataLayerEffect = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://unpkg.com/@adobe/adobe-client-data-layer@1.0.0/dist/adobe-client-data-layer.min.js';
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
    window.adobeDataLayer = window.adobeDataLayer || [];
  }, []);
};

export default useDataLayerEffect;
