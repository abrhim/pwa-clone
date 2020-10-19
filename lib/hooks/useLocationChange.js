import { useLocation } from '@magento/venia-concept/src/drivers';
import { useEffect, useReducer } from 'react';

const initState = {
    locationChanged: false,
    locationPathName: null,
    prevPathName: null
};

const reducer = (state, action) => {
    return {
        ...state,
        ...action.value
    };
};

const useLocationChange = () => {
    const location = useLocation();
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        if (state.locationChanged === true) {
            dispatch({
                value: {
                    locationChanged: false
                }
            });
        }
        if (state.locationPathName === null) {
            dispatch({
                value: {
                    locationChanged: true,
                    locationPathName: location.pathname
                }
            });
        } else if (location.pathname !== state.locationPathName) {
            dispatch({
                value: {
                    prevPathName: state.locationPathName,
                    locationPathName: location.pathname,
                    locationChanged: true
                }
            });
        }
    }, [location, state.locationChanged, state.locationPathName]);

    return {
        locationChanged: state.locationChanged,
        locationPathName: state.locationPathName,
        prevPathName: state.prevPathName
    };
};

export default useLocationChange;
