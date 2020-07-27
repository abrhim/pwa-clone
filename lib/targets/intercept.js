module.exports = targets => {
    targets.of("@magento/peregrine").talons.tap(talons => {
        talons.App.useApp.wrapWith(`@magento/product-recommendations/lib/wrappers/wrapUseApp`);
        return talons;
    });
};