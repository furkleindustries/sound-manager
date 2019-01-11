import {
  Analysis,
} from './Analysis';
import {
  assert,
} from '../assertions/assert';
import {
  assertValid,
} from '../assertions/assertValid';
import {
  IAnalysis,
} from './IAnalysis';
import {
  IAnalysisRenderCallback,
} from './IAnalysisRenderCallback';
import {
  IAnalysisSuite,
} from './IAnalysisSuite';

export class AnalysisSuite implements IAnalysisSuite {
  private readonly __analyserNode: AnalyserNode;
  private get node() {
    return this.__analyserNode;
  }

  private __eventMap: { [key: string]: IAnalysisRenderCallback } = {};

  private __autoIdCounter = -1;

  constructor(analyserNode: AnalyserNode) {
    this.__analyserNode = assertValid<AnalyserNode>(analyserNode);
  }

  public getAnalysis(): IAnalysis {
    return new Analysis(this.node);
  }

  public addRenderListener(
    renderCallback: IAnalysisRenderCallback,
    name: string = this.__getNewId(),
  )
  {
    assert(typeof renderCallback === 'function');
    assert(!(name in this.__eventMap));
    this.__eventMap[name] = renderCallback;
    this.__init(name, renderCallback);

    return this;
  }

  public removeRenderListener(name: string): this;
  public removeRenderListener(names: string): this;
  public removeRenderListener(names: string | string[]) {
    let arr: string[];
    if (Array.isArray(names)) {
      arr = names;
    } else {
      arr = [ names ];
    }

    arr.forEach((name) => delete this.__eventMap[name]);

    return this;
  }

  private __init(name: string, renderCallback: IAnalysisRenderCallback) {
    const loop = () => {
      /* Ends event loop if render callback is removed from the map. */
      if (this.__eventMap[name] === renderCallback) {
        renderCallback(this.getAnalysis());
        requestAnimationFrame(loop);
      }
    };

    loop();
  }

  private __getNewId() {
    return String(this.__autoIdCounter += 1);
  }
}
