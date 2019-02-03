import { EasingCurves } from '../Fade/EasingCurves';
export declare const getFadeValueAtTime: ({ change, curve, duration, initial, time }: {
    change: number;
    curve: EasingCurves;
    duration: number;
    initial: number;
    time: number;
}) => number;
