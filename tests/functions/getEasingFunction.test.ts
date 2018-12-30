import {
  EasingCurves,
} from '../../src/Fade/EasingCurves';
import {
  getEasingFunction,
} from '../../src/functions/getEasingFunction';

describe('getEasingFunction unit tests.', () => {
  it('Has a function for each value in the EasingCurves enum.', () => {
    let foundAll = true;
    (Object as any).values(EasingCurves).forEach((value: EasingCurves) => {
      if (typeof getEasingFunction(value) !== 'function') {
        foundAll = false;
      }
    });

    expect(foundAll).toBe(true);
  });
});
