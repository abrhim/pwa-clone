import useSyncMDLToLocalStorage from '../hooks/useSyncMDLToLocalStorage';
import { CMS } from '../constants';
import useRecsData from '../hooks/useRecsData';
export default function wrapUseApp(origUseApp) {
  return function (props) {
    useSyncMDLToLocalStorage();
    useRecsData({ pageType: CMS });
    return origUseApp(props);
  };
}
