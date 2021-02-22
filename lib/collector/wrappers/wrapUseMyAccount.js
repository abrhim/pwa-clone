import useMyAccountDataLayer from '../collectors/useMyAccountDataLayer';

const wrapUseMyAccount = origUseMyAccount => {
  return function(props) {
    const api = origUseMyAccount(props);
    const { pushMyAccountSignOut } = useMyAccountDataLayer();
    return {
      ...api,
      handleSignOut(...args) {
        pushMyAccountSignOut();
        return api.handleSignOut(...args);
      },
    };
  };
};

export default wrapUseMyAccount;
