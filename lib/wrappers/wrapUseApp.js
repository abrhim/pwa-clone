import { loadCollector } from "../collector";
export default function loadOnUseApp(origUseApp) {
    return function useApp(props) {
        console.log('Test Message');
        loadCollector(window);
        return origUseApp(props);
    };
}