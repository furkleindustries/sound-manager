import {
  IAnalysis,
} from './IAnalysis';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export class Analysis implements IAnalysis {
  private __node: AnalyserNode;
  private __getNode = () => {
    return this.__node;
  };

  constructor(node: AnalyserNode) {
    this.__node = assertValid<AnalyserNode>(node);
  }

  public readonly getBinCount = () => (
     this.__getNode().frequencyBinCount
  );

  public readonly getFrequencyByte = (array?: Uint8Array) => {
    const binCount = this.getBinCount();
    const arr = array || new Uint8Array(binCount);
    assert(arr.length === binCount);
    this.__getNode().getByteFrequencyData(arr);

    return arr;
  };

  public readonly getFrequencyFloat = (array?: Float32Array) => {
    const binCount = this.getBinCount();
    const arr = array || new Float32Array(binCount);
    assert(arr.length === binCount);
    this.__getNode().getFloatFrequencyData(arr);

    return arr;
  };

  public getTimeDomainByte = (array?: Uint8Array) => {
    const binCount = this.getBinCount();
    const arr = array || new Uint8Array(binCount);
    assert(arr.length === binCount);
    this.__getNode().getByteTimeDomainData(arr);

    return arr;
  };

  public getTimeDomainFloat = (array?: Float32Array) => {
    const binCount = this.getBinCount();
    const arr = array || new Float32Array(binCount);
    assert(arr.length === binCount);
    this.__getNode().getFloatTimeDomainData(arr);

    return arr;    
  };
}
