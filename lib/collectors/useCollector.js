import { useCallback, useEffect } from 'react';

const collectorName = 'magento_store_events';

const useCollector = () => {
    const defaultMagentoStoreEvents = useCallback(() => {
        const magentoStoreEvents = window[collectorName];

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
                    performanceTiming: true
                }
            }
        );

        magentoStoreEvents('enableActivityTracking', 5, 5);
        magentoStoreEvents('enableLinkClickTracking');
        magentoStoreEvents('setOptOutCookie', 'mg_dnt');
    }, []);

    useEffect(() => {
        // Initialise the 'GlobalSnowplowNamespace' array
        window['GlobalSnowplowNamespace'] =
            window['GlobalSnowplowNamespace'] || [];

        // Add the new Snowplow namespace to the global array so sp.js can find it
        window['GlobalSnowplowNamespace'].push(collectorName);

        // Create the Snowplow function
        window[collectorName] = function() {
            (window[collectorName].q = window[collectorName].q || []).push(
                arguments
            );
        };

        // Initialise the asynchronous queue
        window[collectorName].q = window[collectorName].q || [];

        import('../src/sp')
            .then(() => {
                window.Snowplow.getTrackerCf().setDebug(true);
            })
            .catch(e => {
                console.error(
                    'Product Recommendations Collector script failed to load:',
                    e
                );
            });
        defaultMagentoStoreEvents();
    }, [defaultMagentoStoreEvents]);

    return window[collectorName];
};

export default useCollector;
