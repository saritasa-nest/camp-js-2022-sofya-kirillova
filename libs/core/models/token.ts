import { Immerable, OmitImmerable } from './immerable';

/** Token. */
export class Token extends Immerable {

  /** Access token. */
  public readonly access: string;

  /** Refresh token. */
  public readonly refresh: string;

  public constructor(data: InitArgsToken) {
    super();
    this.access = data.access;
    this.refresh = data.refresh;
  }
}

type InitArgsToken = OmitImmerable<Token>;
