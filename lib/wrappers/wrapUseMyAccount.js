import useMyAccountDataLayer from '../collectors/useMyAccountDataLayer';


const collectMyAccount = orig => {
    return function useMyAccount(props) {
        const api = orig(props);
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

export default collectMyAccount;