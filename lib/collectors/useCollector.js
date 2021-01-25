import { useCallback, useEffect } from 'react';

const COLLECTOR_NAME = 'magento_store_events';
const SNOWPLOW_JS_URL = 'https://commerce.adobedtm.com/sp/v2/sp.js';

(function(p, l, o, w, i, n, g) {
  if (!p[i]) {
    p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
    p.GlobalSnowplowNamespace.push(i);
    p[i] = function() {
      (p[i].q = p[i].q || []).push(arguments);
    };
    p[i].q = p[i].q || [];
    n = l.createElement(o);
    g = l.getElementsByTagName(o)[0];
    n.async = 1;
    n.src = w;
    g.parentNode.insertBefore(n, g);
  }
})(window, document, 'script', SNOWPLOW_JS_URL, COLLECTOR_NAME);

const useCollector = () => {
  useEffect(() => {
    const magentoStoreEvents = window[COLLECTOR_NAME];

    magentoStoreEvents(
      'newTracker',
      'magento-storefront-js',
      process.env.SNOWPLOW_URL,
      {
        appId: process.env.SNOWPLOW_APP_ID,
        platform: 'web',
        cookieDomain: null,
        eventMethod: navigator.sendBeacon ? 'beacon' : 'post',
        discoverRootDomain: true,
        cookieName: 'mg',
        encodeBase64: false,
        respectDoNotTrack: false,
        userFingerprint: true,
        userFingerprintSeed: 7089491512,
        pageUnloadTimer: 500,
        forceSecureTracker: true,
        bufferSize: 1,
        postPath: process.env.SNOWPLOW_COLLECTOR,
        maxPostBytes: 45000,
        cookieLifetime: 63072000, // 1 year
        stateStorageStrategy: 'localStorage',
        contexts: {
          webPage: true,
          performanceTiming: true,
        },
      },
    );

    magentoStoreEvents('enableLinkClickTracking');
    magentoStoreEvents('setOptOutCookie', 'mg_dnt');
  }, []);

  return window[COLLECTOR_NAME];
};

export default useCollector;
