const myName = "@magento/product-recommendations";
module.exports = targets => {
    const builtins = targets.of("@magento/pwa-buildpack");
    builtins.envVarDefinitions.tap(defs => {
        defs.sections.push({
            name: "Product Recommendations Engine",
            variables: [
                {
                    name: "SNOWPLOW_URL",
                    type: "str",
                    desc: "Base URL of the domain where the Snowplow tracker lives",
                    default: "com-magento-prod1.mini.snplow.net",
                },
                {
                    name: "SNOWPLOW_COLLECTOR",
                    type: "str",
                    desc: "Pathname of the Snowplow collector API endpoint",
                    default: "/com.snowplowanalytics.snowplow/tp2",
                },
                {
                    name: "SNOWPLOW_APP_ID",
                    type: "str",
                    desc: "Snowplow app identifier",
                    default: "magento-ds",
                },
            ],
        });
    });
    targets.of("@magento/peregrine").talons.tap(talons => {
        talons.App.useApp.wrapWith(`${myName}/lib/wrappers/wrapUseApp`);
        talons.Checkout.useFlow.wrapWith(`${myName}/lib/wrappers/wrapUseFlow`);
        return talons;
    });
};