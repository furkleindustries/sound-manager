export interface IAnalysis {
  getBinCount(): number;
  getFrequencyByte(array?: Uint8Array): Uint8Array;
  getFrequencyFloat(array?: Float32Array): Float32Array;
  getTimeDomainByte(array?: Uint8Array): Uint8Array;
  getTimeDomainFloat(array?: Float32Array): Float32Array;
}
