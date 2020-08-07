const collectorName = "magento_store_events";

export function loadCollector(globalObj) {
    // Stop if the Snowplow namespace i already exists
    if (!globalObj[collectorName]) {
        // Initialise the 'GlobalSnowplowNamespace' array
        globalObj["GlobalSnowplowNamespace"] =
            globalObj["GlobalSnowplowNamespace"] || [];

        // Add the new Snowplow namespace to the global array so sp.js can find it
        globalObj["GlobalSnowplowNamespace"].push(collectorName);

        // Create the Snowplow function
        globalObj[collectorName] = function() {
            (globalObj[collectorName].q = globalObj[collectorName].q || []).push(
                arguments,
            );
        };

        // Initialise the asynchronous queue
        globalObj[collectorName].q = globalObj[collectorName].q || [];

        import("./components/Snowplow/Snowplow.js")
            .then(() => {
                window.Snowplow.getTrackerCf().setDebug(true);
            })
            .catch(e => {
                console.error(
                    "Product Recommendations Collector script failed to load:",
                    e,
                );
            });

        const magentoStoreEvents = globalObj[collectorName];
        magentoStoreEvents(
            "newCollector",
            "magento-storefront-js",
            process.env.SNOWPLOW_URL,
            {
                platform: "web",
                appId: process.env.SNOWPLOW_APP_ID,
                cookieDomain: null,
                eventMethod: navigator.sendBeacon ? "beacon" : "post",
                discoverRootDomain: true,
                cookieName: "mg",
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
                stateStorageStrategy: "localStorage",
                contexts: {
                    webPage: true,
                    performanceTiming: true,
                },
            },
        );

        magentoStoreEvents("enableActivityTracking", 5, 5);
        magentoStoreEvents("trackPageView");
        magentoStoreEvents("enableLinkClickTracking");
        magentoStoreEvents("setOptOutCookie", "mg_dnt");
    }
    return globalObj[collectorName];
}

export function collectEvents(args, globalObj = window) {
    const magentoStoreEvents = loadCollector(globalObj);
    magentoStoreEvents(...args);
}

export function resetCollector(globalObj) {
    delete globalObj[collectorName];
}

