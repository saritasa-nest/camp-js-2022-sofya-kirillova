import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class Pagination<T> extends Immerable {
  /** Total count of items. */
  public readonly count: number;

  /** Next page of items. */
  public readonly urlNextPage: string;

  /** Previous page of items. */
  public readonly urlPreviousPage: string;

  /** Array of items requested. */
  public readonly results: readonly T[];

  public constructor(data: InitArgsPagination<T>) {
    super();
    this.count = data.count;
    this.urlNextPage = data.urlNextPage;
    this.urlPreviousPage = data.urlPreviousPage;
    this.results = data.results;
  }
}

type InitArgsPagination<T> = OmitImmerable<Pagination<T>>;
