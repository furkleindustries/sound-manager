import {
  EasingCurves,
} from '../../src/enums/EasingCurves';
import {
  getFadeValueAtTime,
} from '../../src/functions/getFadeValueAtTime';

import {
  getEasingFunction,
} from '../../src/functions/getEasingFunction';
jest.mock('../../src/functions/getEasingFunction');

describe('getFadeValueAtTime unit tests.', () => {
  beforeEach(() => {
    (getEasingFunction as any).mockClear();
  });

  it('Calls getEasingFunction with the provided curve and then passes the remaining arguments to the resulting function.', () => {
    const mock = jest.fn();
    (getEasingFunction as any).mockImplementation(() => (
      (...args: any[]) => mock(...args))
    );

    const change = 1;
    const curve = EasingCurves.EqualPower;
    const duration = 2;
    const initial = 0.1;
    const time = 200;
    getFadeValueAtTime({
      change,
      curve,
      duration,
      initial,
      time,
    });

    expect(getEasingFunction).toBeCalledTimes(1);
    expect(getEasingFunction).toBeCalledWith(curve);
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(time, initial, change, duration);
  });
});
