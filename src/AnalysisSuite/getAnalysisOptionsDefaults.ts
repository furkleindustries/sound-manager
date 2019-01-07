import {
  getFrozenObject,
} from '../functions/getFrozenObject';

export function getAnalysisOptionsDefaults() {
  return getFrozenObject({
    frequency: {
      byte: true,
      float: false,
    },

    timeDomain: {
      byte: true,
      float: false,
    },
  });
}
