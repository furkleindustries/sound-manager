export interface IAnalysis {
  getFrequencyByte(): Uint8Array;
  getFrequencyFloat(): Float32Array;
  getTimeDomainByte(): Uint8Array;
  getTimeDomainFloat(): Float32Array;
}
