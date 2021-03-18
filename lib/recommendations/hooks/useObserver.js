// create a new intersection observer, maintain if it has "cleared", then fire an event for each time it has been viewed.
import mse from '@adobe/magento-storefront-events-sdk';

let cleared = {};

const useObserver = () => {
  const meetThreshold = (entries, unit) => {
    entries.forEach(entry => {
      const { isIntersecting, intersectionRatio } = entry;
      const { unitId } = unit;

      if (!isIntersecting) {
        cleared[unitId] = true;
      }
      if (cleared[unitId] !== false && intersectionRatio >= 0.5) {
        cleared[unitId] = false;
        mse.publish.recsUnitView({ recUnit: unit });
      }
    });
  };

  const observeUnit = (unit, element) => {
    if (element) {
      const options = {
        threshold: [0.0, 0.5],
      };
      const observer = new IntersectionObserver(
        entries => meetThreshold(entries, unit),
        options,
      );
      observer.observe(element);
    }
  };
  return { observeUnit };
};

export default useObserver;
