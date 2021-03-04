const myName = 'recommendations-pwa-collector';
const Targetables = require('@magento/pwa-buildpack/lib/WebpackTools/targetables');
const pwaBuildpack = require('@magento/pwa-buildpack');

module.exports = targets => {
  const builtins = targets.of('@magento/pwa-buildpack');
  // console.log(builtins);

  // console.log(pwaBuildpack);

  console.log('buildPack', pwaBuildpack);
  console.log('WebpackTools', pwaBuildpack.WebpackTools);
  const targetables = Targetables.using(targets);
  const GalleryItem = targetables.reactComponent(
    '@magento/venia-ui/lib/components/Gallery/item.js',
    {
      async publish(myTargets) {
        console.log('myTargets!', myTargets);
      },
    },
  );

  targetables.reactComponent('@my/library/Button.js', {
    async publish(myTargets) {
      console.log('myTargets', myTargets);
      const classnames = await myTargets.buttonClassnames.promise([]);
      classnames.forEach(name => this.addJSXClassName('<button>', name));
    },
  });
  console.log(GalleryItem);
  // const Gallery = targetables.reactComponent(
  //   '@magento/venia-ui/lib/components/Gallery/gallery',
  // );

  // console.log(GalleryItem);

  // GalleryItem.prepend('<Link />', '<div onClick={props.onClick}>');
  // GalleryItem.append('<Link />', '</div>');

  targets.of('@magento/peregrine').talons.tap(talons => {
    talons.App.useApp.wrapWith(
      `${myName}/lib/recommendations/wrappers/wrapUseApp`,
    );
    return talons;
  });

  builtins.envVarDefinitions.tap(() => {
    builtins.specialFeatures.tap(flags => {
      flags[targets.name] = {
        esModules: true,
        graphqlQueries: true,
      };
    });

    // targets
    //   .of('@magento/venia-ui')
    //   .richContentRenderers.tap(richContentRenderers =>
    //     richContentRenderers.add({
    //       componentName: 'GalleryItem',
    //       importPath: '../',
    //     }),
    //   );
  });
};
