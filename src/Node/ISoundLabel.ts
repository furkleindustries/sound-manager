export interface ISoundLabel {
  readonly artistName: string;
  readonly title: string;
  readonly contributors?: string[];
  readonly license?: string;
  readonly link?: string;
}
