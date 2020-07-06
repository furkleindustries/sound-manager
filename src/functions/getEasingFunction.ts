/* istanbul ignore file */

import {
  EasingCurves,
} from '../Fade/EasingCurves';

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
  (
    change * (time / duration) + initial
  ),

  [EasingCurves.EqualPower]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  (
    change * (Math.sqrt((1 + time / duration) * 0.5) + initial)
  ),

  [EasingCurves.Quadratic]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  (
    change * ((time / duration) * time + initial)
  ),

  [EasingCurves.Cubic]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  (
    change * ((time / duration) * time * time + initial)
  ),

  [EasingCurves.Quartic]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  (
    change * ((time / duration) * time * time * time + initial)
  ),

  [EasingCurves.Quintic]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  (
    change * ((time / duration) * time * time * time * time + initial)
  ),

  [EasingCurves.Exponential]: (
    time: number,
    initial: number,
    change: number,
    duration: number,
  ) =>
  (
    (time === 0) ? initial : change * (Math.pow(2, 10 * (time / duration - 1)) + initial)
  ),
};
