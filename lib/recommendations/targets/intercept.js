const myName = 'recommendations-pwa-collector';
module.exports = targets => {
  const builtins = targets.of('@magento/pwa-buildpack');
  builtins.envVarDefinitions.tap(defs => {
    builtins.specialFeatures.tap(flags => {
      flags[targets.name] = {
        esModules: true,
        graphqlQueries: true,
      };
    });
    targets.of('@magento/peregrine').talons.tap(talons => {
      talons.App.useApp.wrapWith(
        `${myName}/lib/recommendations/wrappers/wrapUseApp`,
      );
      return talons;
    });
  });
};
