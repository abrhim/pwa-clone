import useSyncMDLToLocalStorage from '../hooks/useSyncMDLToLocalStorage';
export default function wrapUseApp(origUseApp) {
  return function (props) {
    useSyncMDLToLocalStorage();
    return origUseApp(props);
  };
}
