import useCreateAccountDataLayer from '../collectors/useCreateAccountDataLayer';

const collectCreateAccount = orig => {
    return function useCreateAccount(props) {
        const api = orig(props);
        const { pushCreateAccountSignIn } = useCreateAccountDataLayer();
        return {
            ...api,
            handleSubmit(...args) {
                debugger;
                pushCreateAccountSignIn();
                return api.handleSubmit(...args);
            },
        };
    };
};

export default collectCreateAccount;