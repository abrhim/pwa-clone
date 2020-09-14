import { updateDataLayer } from '../util/updateDataLayer';
import { useCallback } from 'react';

const useCreateAccountDataLayer = props => {
    const pushCreateAccountSignIn = useCallback(() => {
        updateDataLayer({
            contextName: 'shopper',
            context:  {},
            event: 'sign-in'
        });
    }, []);

    return {
        pushCreateAccountSignIn,
    };
};

export default useCreateAccountDataLayer;