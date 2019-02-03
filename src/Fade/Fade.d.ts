import { EasingCurves } from './EasingCurves';
import { IFade } from './IFade';
import { IFadeProperty } from './IFadeProperty';
import { IFadeOptions } from './IFadeOptions';
export declare class Fade implements IFade {
    static readonly defaultCurve: EasingCurves;
    static readonly defaultLength: number;
    readonly easingCurve: IFadeProperty<EasingCurves>;
    readonly length: IFadeProperty<number>;
    constructor(options?: IFadeOptions);
}
