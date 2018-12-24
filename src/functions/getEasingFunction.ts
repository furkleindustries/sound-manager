import {
  EasingCurves,
} from '../Fade/EasingCurves';

export const getEasingFunction = (type: EasingCurves) => funcs[type];

type TimingArg = 'in' | 'out' | 'in-out';
/* ============================================================================================
 * Adapted from Robert Penner's Easing Equations v2.0
 * (c) 2003 Robert Penner, all rights reserved. 
 * These equations are subject to the terms in http://www.robertpenner.com/easing_terms_of_use.html.
 * ============================================================================================ */
const funcs = {
  [EasingCurves.Linear]: (
    time: number,
    initial: number,
    change: number,
    duration: number
  ) =>
  (
    change * time / duration + initial
  ),

  [EasingCurves.EqualPower]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
    timing: TimingArg,
  ) =>
  {
    const x = time / duration;
    if (timing === 'in') {
      return change * Math.cos(x * 0.5 * Math.PI);
    } else if (timing === 'out') {
      return change * Math.cos((1 - x) * 0.5 * Math.PI);
    }

    /* TODO: implement equal power
     * in 
     * out
      var gain2 = Math.cos((1.0 - x) * 0.5 * Math.PI);
     */
    return 1;
  },
  
  [EasingCurves.Quadratic]:(
    time: number,
    initial: number,
    change: number,
    duration: number,
    timing: TimingArg,
  ) =>
  {
    if (timing === 'in') {
      return change * (time /= duration) * time + initial;
    } else if (timing === 'out') {
      return -change * (time /= duration) * (time - 2) + initial;
    } else {
      if ((time /= duration / 2) < 1) {
        return change / 2 * time * time + initial;
      }

      return -change / 2 * ((--time) * (time - 2) - 1) + initial;
    }
  },

  [EasingCurves.Cubic]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
    timing: TimingArg
  ) =>
  {
    if (timing === 'in') {
      return change * (time /= duration) * time * time + initial;
    } else if (timing === 'out') {
      return change * ((time = time / duration - 1) * time * time + 1) + initial;
    } else {
      if ((time /= duration / 2) < 1) {
        return change / 2 * time * time * time + initial;
      }

      return change / 2 * ((time -= 2) * time * time + 2) + initial;
    }
  },

  [EasingCurves.Quartic]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
    timing: TimingArg
  ) =>
  {
    if (timing === 'in') {
      return change * (time /= duration) * time * time * time + initial;
    } else if (timing === 'out') {
      return -change * ((time = time / duration - 1) * time * time * time - 1) + initial;
    } else {
      if ((time /= duration / 2) < 1) {
        return change / 2 * time * time * time * time + initial;
      }

      return -change / 2 * ((time -= 2) * time * time * time - 2) + initial;
    }
  },
  
  [EasingCurves.Quintic]:(
    time: number,
    initial: number,
    change: number,
    duration: number,
    timing: TimingArg
  ) =>
  {
    if (timing === 'in') {
      return change * (time /= duration) * time * time * time * time + initial;
    } else if (timing === 'out') {
      return change * ((time = time / duration - 1) * time * time * time * time + 1) + initial;
    } else {
      if ((time /= duration / 2) < 1) {
        return change / 2 * time * time * time * time * time + initial;
      }

      return change / 2 * ((time -= 2) * time * time * time * time + 2) + initial;
    }
  },
  
  [EasingCurves.Exponential]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
    timing: TimingArg
  ) =>
  {
    if (timing === 'in') {
      return (time === 0) ? initial : change * Math.pow(2, 10 * (time / duration - 1)) + initial;
    } else if (timing === 'out') {
      return (time === duration) ? initial + change : change * (-Math.pow(2, -10 * time / duration) + 1) + initial;
    } else {
      if (time === 0) {
        return initial;
      } else if (time === duration) {
        return initial + change;
      } else if ((time /= duration / 2) < 1) {
        return change / 2 * Math.pow(2, 10 * (time - 1)) + initial;
      }

      return change / 2 * (-Math.pow(2, -10 * --time) + 2) + initial;
    }
  },
};
