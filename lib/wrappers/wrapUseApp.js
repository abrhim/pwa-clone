export default function loadOnUseApp(origUseApp) {
    return function useApp(props) {
        console.log('Test Message');
        loadTracker(window);
        return origUseApp(props);
    };
}