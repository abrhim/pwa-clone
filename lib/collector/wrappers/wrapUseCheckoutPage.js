import mdl from '@adobe/magento-data-layer-sdk';
import { useEffect, useRef } from 'react';

const wrapUseCheckoutPage = origUseCheckoutPage => {
  return function (props) {
    const placeOrderFired = useRef(false);
    const api = origUseCheckoutPage(props);
    useEffect(() => {
      if (api.orderNumber && !placeOrderFired.current) {
        mdl.context.setOrder({
          orderId: api.orderNumber,
        });
        mdl.publish.placeOrder();
        placeOrderFired.current = true;
      }
      return () => {
        mdl.context.setOrder({});
      };
    }, [api.orderNumber]);
    return api;
  };
};

export default wrapUseCheckoutPage;
