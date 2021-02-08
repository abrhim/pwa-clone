import useCartPublisher from '../hooks/useCartPublisher';

export default function wrapUseProduct(orig) {
  return function useProduct(props) {
    const { setCartUpdating } = useCartPublisher();
    const newProps = {
      ...props,
      setIsCartUpdating: update => {
        props.setIsCartUpdating(update);
        setCartUpdating(update);
      },
    };

    const api = orig(newProps);
    return {
      ...api,
    };
  };
}
