import mdl from '@adobe/magento-data-layer-sdk';

const wrapUseMyAccount = origUseMyAccount => {
  return function (props) {
    const api = origUseMyAccount(props);
    return {
      ...api,
      handleSignOut(...args) {
        mdl.context.setShopper({
          shopperId: 'guest',
        });
        mdl.publish.signOut();
        return api.handleSignOut(...args);
      },
    };
  };
};

export default wrapUseMyAccount;
