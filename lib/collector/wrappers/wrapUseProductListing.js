export default function wrapUseProductListing (original) {
    return function (props) {
        console.log(props)
        return original(props)
    }

}