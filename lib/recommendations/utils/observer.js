// create a new intersection observer, maintain if it has "cleared", then fire an event for each time it has been viewed.
import mse from '@adobe/magento-storefront-events-sdk';
import { useState } from 'react';

let cleared = {};

const [units, setUnits] = useState([]);
const meetThreshold = (entries, unit) => {
  entries.forEach(entry => {
    console.log(entry, unit);
    const { isIntersecting, intersectionRatio } = entry;
    const { unitId } = unit;

    if (!isIntersecting) {
      cleared[unitId] = true;
    }
    if (cleared[unitId] !== false && intersectionRatio >= 0.5) {
      cleared[unitId] = false;
      console.log('VIEWED!');
    }
  });
};

export const observeUnit = (unit, element) => {
  if (element) {
    const options = {
      threshold: [0.0, 0.5],
    };

    const observer = new IntersectionObserver(
      entries => meetThreshold(entries, unit),
      options,
    );

    console.log(element);

    observer.observe(element);
  }
};
