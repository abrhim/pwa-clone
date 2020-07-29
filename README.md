# data-services-pwa-recs

## Extension Setup
- Clone the `data-services-pwa-recs` repo into a directory inside your PWA Studio directory
- Using the command line navigate to the `data-services-pwa-recs` repo location and run `yarn link`
- Navigate to the PWA Studio directory again and run `yarn link @magento/product-recommendations`
- Run the following from the PWA Studio directory `BUILDBUS_DEPS_ADDITIONAL='@magento/product-recommendations' yarn run watch:venia`