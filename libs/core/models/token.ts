import { Immerable, OmitImmerable } from './immerable';

/** Token. */
export class Token extends Immerable {

  /** Refresh token. */
  public readonly refresh: string;

  /** Access token. */
  public readonly access: string;

  public constructor(data: InitArgsToken) {
    super();
    this.refresh = data.refresh;
    this.access = data.access;
  }
}

type InitArgsToken = OmitImmerable<Token>;
