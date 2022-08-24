/** Sort settings. */
export interface AnimeSort {

  /** Ordering direction. */
  readonly direction?: Direction;

  /** Field by sort. */
  readonly order: Order;
}

/** Available values for sorting. */
export type Order = 'titleEnglish' | 'airedStart' | 'status';

/** Ordering direction. */
export enum Direction {
  Ascending = '',
  Descending = '-',
}
