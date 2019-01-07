import {
  getAnalysisOptionsDefaults,
} from './getAnalysisOptionsDefaults';
import {
  IAnalysisOptions,
} from './IAnalysisOptions';
import {
  IGetAnalysisOptions,
} from './IGetAnalysisOptions';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';

export function normalizeAnalysisOptions(options?: IGetAnalysisOptions): IAnalysisOptions {
  const opts = { ...getAnalysisOptionsDefaults() };

  if (options) {
    Object.assign(opts, options);
  }

  return getFrozenObject(opts);
}
