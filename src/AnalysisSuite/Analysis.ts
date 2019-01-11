import {
  assertValid,
} from '../assertions/assertValid';
import {
  IAnalysis,
} from './IAnalysis';

export class Analysis implements IAnalysis {
  private __node: AnalyserNode;
  private getNode() {
    return this.__node;
  }

  private getBinCount() {
    return this.getNode().frequencyBinCount;
  }

  constructor(node: AnalyserNode) {
    this.__node = assertValid<AnalyserNode>(node);
  }

  getFrequencyByte() {
    const arr = new Uint8Array(this.getBinCount());
    this.getNode().getByteFrequencyData(arr);

    return arr;
  }

  getFrequencyFloat() {
    const arr = new Float32Array(this.getBinCount());
    this.getNode().getFloatFrequencyData(arr);

    return arr;
  }

  getTimeDomainByte() {
    const arr = new Uint8Array(this.getBinCount());
    this.getNode().getByteTimeDomainData(arr);

    return arr;
  }

  getTimeDomainFloat() {
    const arr = new Float32Array(this.getBinCount());
    this.getNode().getFloatTimeDomainData(arr);

    return arr;    
  }
}
