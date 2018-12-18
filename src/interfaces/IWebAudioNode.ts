import {
  IAudioNode,
} from './IAudioNode';

export interface IWebAudioNode extends IAudioNode {
  getGainNode(): GainNode;
  getInputNode(): AudioNode;
  getOutputNode(): AudioNode;
}
