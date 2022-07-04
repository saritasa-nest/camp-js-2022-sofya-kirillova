import { Immerable, OmitImmerable } from './immerable';

/** Aired. */
export class Aired extends Immerable {

  /** Start date, for example, "2014-12-20T17:30:50.416Z". */
  start: Date;

  /** End date, for example, "2014-12-20T17:30:50.416Z". */
  end: Date;

  public constructor(data: PostInitArgsAired) {
    super();
    this.start = data.start;
    this.end = data.end;
  }
}

type PostInitArgsAired = OmitImmerable<Aired>;
