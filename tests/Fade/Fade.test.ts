import {
  Fade,
} from '../../src/Fade/Fade';
import {
  EasingCurves,
} from '../../src/Fade/EasingCurves';

describe('Fade unit tests.', () => {
  it('Sets the easingCurve properties to quadratic by default.', () => {
    const curve = EasingCurves.Quadratic;
    const fade = new Fade();

    expect(fade.easingCurve.in).toBe(curve);
    expect(fade.easingCurve.out).toBe(curve);
  });

  it('Sets the length properties to 2 by default.', () => {
    const len = 2;
    const fade = new Fade();

    expect(fade.length.in).toBe(len);
    expect(fade.length.out).toBe(len);
  });

  it('Sets both easingCurve properties to the single value provided.', () => {
    const curve = EasingCurves.Quartic;
    const fade = new Fade({ easingCurve: curve, });

    expect(fade.easingCurve.in).toBe(curve);
    expect(fade.easingCurve.out).toBe(curve);
  });

  it('Sets both members of the provided array to the in and out properties of the curve.', () => {
    const curveIn = EasingCurves.Quintic;
    const curveOut = EasingCurves.Exponential;
    const fade = new Fade({ easingCurve: [ curveIn, curveOut, ], });

    expect(fade.easingCurve.in).toBe(curveIn);
    expect(fade.easingCurve.out).toBe(curveOut);
  });

  it('Throws if an array is provided for the easing curve but does not have a length of 2.', () => {
    const curveIn = EasingCurves.Quintic;
    const curveOut = EasingCurves.Exponential;
    const func = () => new Fade({
      easingCurve: [ curveIn, curveOut, curveIn, ] as any,
    });

    expect(func).toThrow();
  });

  it('Clones the in and out properties of the curve.', () => {
    const curveIn = EasingCurves.Quintic;
    const curveOut = EasingCurves.Exponential;
    const curve = {
      in: curveIn,
      out: curveOut,
    };

    const fade = new Fade({
      easingCurve: curve,
    });

    expect(fade.easingCurve.in).toBe(curveIn);
    expect(fade.easingCurve.out).toBe(curveOut);
    expect(fade.easingCurve).not.toBe(curve);
  });

  it('Throws if easingCurve is truthy but is not TFeedArg.', () => {
    const func = () => new Fade({ easingCurve: true as any, });
    expect(func).toThrow();
  });

  it('Throws if both the in and out properties of the easing curve are falsy.', () => {
    const curve = {
      in: false,
      out: false,
    } as any;

    const func = () => new Fade({ easingCurve: curve, });

    expect(func).toThrow();
  });

  it('Coerces falsy in curve values to null.', () => {
    expect(new Fade({
      easingCurve: {
        in: false,
        out: EasingCurves.EqualPower,
      } as any,
    }).easingCurve.in).toBe(null);
  });

  it('Coerces falsy out curve values to null.', () => {
    expect(new Fade({
      easingCurve: [
        EasingCurves.Linear,
        undefined,
      ] as any,
    }).easingCurve.out).toBe(null);
  });

  it('Sets both length properties to the single value provided.', () => {
    const len = 4;
    const fade = new Fade({ length: len, });

    expect(fade.length.in).toBe(len);
    expect(fade.length.out).toBe(len);
  });

  it('Sets both members of the provided array to the in and out properties of the length.', () => {
    const lengthIn = 5;
    const lengthOut = 6;
    const fade = new Fade({ length: [ lengthIn, lengthOut, ], });

    expect(fade.length.in).toBe(lengthIn);
    expect(fade.length.out).toBe(lengthOut);
  });

  it('Throws if an array is provided for the length but does not have a length of 2.', () => {
    const lengthIn = 1;
    const lengthOut = 2;
    const func = () => new Fade({
      length: [ lengthIn, lengthOut, lengthIn, ] as any,
    });

    expect(func).toThrow();
  });

  it('Clones the in and out properties of the length.', () => {
    const lengthIn = 6;
    const lengthOut = 8;
    const length = {
      in: lengthIn,
      out: lengthOut,
    };

    const fade = new Fade({
      length,
    });

    expect(fade.length.in).toBe(lengthIn);
    expect(fade.length.out).toBe(lengthOut);
    expect(fade.length).not.toBe(length);
  });

  it('Throws if length is truthy but is not TFeedArg.', () => {
    const func = () => new Fade({ length: true as any, });
    expect(func).toThrow();
  });

  it('Throws if both the in and out properties of the length are falsy.', () => {
    const length = {
      in: false,
      out: false,
    } as any;

    const func = () => new Fade({ length, });

    expect(func).toThrow();
  });

  it('Coerces falsy in length values to 0.', () => {
    expect(new Fade({
      length: {
        in: false,
        out: 14,
      } as any,
    }).length.in).toBe(0);
  });

  it('Coerces falsy out length values to 0.', () => {
    expect(new Fade({
      length: [
        23,
        NaN,
      ] as any,
    }).length.out).toBe(0);
  });
});
