const myName = 'recommendations-pwa-collector';
// const { Targetables } = require('@magento/pwa-buildpack');

module.exports = targets => {
  // const recommendations = Targetables.using(targets);
  // recommendations.setSpecialFeatures(
  //   'esModules',
  //   'cssModules',
  //   'graphqlQueries',
  // );

  const builtins = targets.of('@magento/pwa-buildpack');
  builtins.specialFeatures.tap(flags => {
    flags[targets.name] = {
      esModules: true,
      graphqlQueries: true,
      cssModules: true,
    };
  });

  builtins.envVarDefinitions.tap(() => {
    targets.of('@magento/peregrine').talons.tap(talons => {
      talons.App.useApp.wrapWith(
        `${myName}/lib/recommendations/wrappers/wrapUseApp`,
      );
      talons.Gallery.useGalleryItem.wrapWith(
        `${myName}/lib/recommendations/wrappers/wrapUseGalleryItem`,
      );
      return talons;
    });
  });
};
