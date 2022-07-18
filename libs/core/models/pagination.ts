import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class Pagination<T> extends Immerable {
  /** Total count of items. */
  public readonly count: number;

  /** Array of items requested. */
  public readonly results: readonly T[];

  public constructor(data: InitArgsPagination<T>) {
    super();
    this.count = data.count;
    this.results = data.results;
  }
}

type InitArgsPagination<T> = OmitImmerable<Pagination<T>>;
