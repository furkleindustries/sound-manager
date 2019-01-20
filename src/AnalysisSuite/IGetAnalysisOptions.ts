export interface IGetAnalysisOptions {
  readonly frequency?: {
    readonly byte?: boolean;
    readonly float?: boolean;
  };

  readonly timeDomain?: {
    readonly byte: boolean;
    readonly float: boolean;
  };
}
