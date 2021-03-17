import mdl from '@adobe/magento-data-layer-sdk';

const wrapUseSignIn = origUseSignIn => {
  return function useSignIn(props) {
    const api = origUseSignIn(props);
    return {
      ...api,
      handleSubmit(...args) {
        mdl.context.setShopper({
          shopperId: 'logged-in',
        });
        mdl.publish.signIn();
        return api.handleSubmit(...args);
      },
    };
  };
};

export default wrapUseSignIn;
