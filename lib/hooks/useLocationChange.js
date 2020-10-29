import { useLocation } from '@magento/venia-concept/src/drivers';
import { useEffect, useReducer } from 'react';

const initState = {
  locationChanged: false,
  locationPathName: null,
  prevPathName: null,
  pageLoaded: true,
};

const reducer = (state, action) => {
  return {
    ...state,
    ...action.value,
  };
};

const useLocationChange = () => {
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    let value = {};
    // restore page loaded to false
    if (state.pageLoaded === true) {
      value.pageLoaded = false;
    }
    // new page has been loaded
    if (state.locationChanged === true) {
      value.pageLoaded = true;
      value.locationChanged = false;
    }
    // first page load
    if (state.locationPathName === null) {
      value.locationChanged = false;
      value.locationPathName = location.pathname;
      // location has been changed
    } else if (location.pathname !== state.locationPathName) {
      value.prevPathName = state.locationPathName;
      value.locationPathName = location.pathname;
      value.locationChanged = true;
    }
    dispatch({ value });
  }, [location, state.locationChanged, state.locationPathName]);

  return state;
};

export default useLocationChange;
