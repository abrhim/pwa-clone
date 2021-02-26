import useSyncMDLToLocalStorage from '../hooks/useSyncMDLToLocalStorage';
import useRecsData from '../hooks/useRecsData';
import { CMS } from '../constants';
export default function wrapUseApp(origUseApp) {
  return function (props) {
    useRecsData({ pageType: CMS });
    useSyncMDLToLocalStorage();
    return origUseApp(props);
  };
}
