const trackerName = "magento_store_events";

export function loadTracker(globalObj) {
    // Stop if the Snowplow namespace i already exists
    if (!globalObj[trackerName]) {
        // Initialise the 'GlobalSnowplowNamespace' array
        globalObj["GlobalSnowplowNamespace"] =
            globalObj["GlobalSnowplowNamespace"] || [];

        // Add the new Snowplow namespace to the global array so sp.js can find it
        globalObj["GlobalSnowplowNamespace"].push(trackerName);

        // Create the Snowplow function
        globalObj[trackerName] = function() {
            (globalObj[trackerName].q = globalObj[trackerName].q || []).push(
                arguments,
            );
        };

        // Initialise the asynchronous queue
        globalObj[trackerName].q = globalObj[trackerName].q || [];

        import("./components/Snowplow/Snowplow.js")
            .then(() => {
                window.Snowplow.getTrackerCf().setDebug(true);
            })
            .catch(e => {
                console.error(
                    "Product Recommendations Tracker script failed to load:",
                    e,
                );
            });

        const magentoStoreEvents = globalObj[trackerName];
        magentoStoreEvents(
            "newTracker",
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
    return globalObj[trackerName];
}

export function trackEvents(args, globalObj = window) {
    const magentoStoreEvents = loadTracker(globalObj);
    magentoStoreEvents(...args);
}

export function resetTracker(globalObj) {
    delete globalObj[trackerName];
}

