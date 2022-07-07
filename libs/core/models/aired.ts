import { Immerable, OmitImmerable } from './immerable';

/** Aired. */
export class Aired extends Immerable {

  /** Start date of airing. */
  public readonly start: Date;

  /** End date of airing. */
  public readonly end: Date;

  public constructor(data: InitArgsAired) {
    super();
    this.start = data.start;
    this.end = data.end;
  }
}

type InitArgsAired = OmitImmerable<Aired>;
