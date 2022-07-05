import { Immerable, OmitImmerable } from './immerable';

/** Aired. */
export class Aired extends Immerable {

  /** Start date, for example, "2014-12-20T17:30:50.416Z". */
  public readonly start: Date;

  /** End date, for example, "2014-12-20T17:30:50.416Z". */
  public readonly end: Date;

  public constructor(data: InitArgsAired) {
    super();
    this.start = data.start;
    this.end = data.end;
  }
}

type InitArgsAired = OmitImmerable<Aired>;
