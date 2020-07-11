/* istanbul ignore file */

import {
  EasingCurves,
} from '../enums/EasingCurves';

export const getEasingFunction = (type: EasingCurves) => funcs[type];

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
    duration: number,
  ) =>
  {
    return change * (time / duration) + initial;
  },

  [EasingCurves.Sine]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  {
		return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + initial;
  },

  [EasingCurves.Quadratic]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  {
		if ((time /= duration / 2) < 1) {
      return change/ 2 * time * time + initial;
    }

		return -change / 2 * ((--time) * (time - 2) - 1) + initial;
  },

  [EasingCurves.Cubic]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  {
		if ((time /= duration / 2) < 1) {
      return change / 2 * time * time * time + initial;
    }

		return change / 2 * ((time -= 2) * time * time + 2) + initial;
  },

  [EasingCurves.Quartic]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  {
		if ((time /= duration / 2) < 1) {
      return change / 2 * time * time * time * time + initial;
    }

		return -change / 2 * ((time -= 2) * time * time * time - 2) + initial;
  },

  [EasingCurves.Quintic]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  {
		if ((time /= duration / 2) < 1) {
      return change / 2 * time * time * time * time * time + initial;
    }

		return change / 2 * ((time -= 2) * time * time * time * time + 2) + initial;
  },

  [EasingCurves.Exponential]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  {
		if (time <= 0) {
      return initial;
    } else if (time >= duration) {
      return initial + change;
    } else if ((time /= duration / 2) < 1) {
      return change / 2 * Math.pow(2, 10 * (time - 1)) + initial;
    }

		return change / 2 * (-Math.pow(2, -10 * --time) + 2) + initial;
	},
};
