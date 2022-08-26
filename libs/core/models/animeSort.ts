/** Sort settings. */
export interface AnimeSort<Order> {

  /** Ordering direction. */
  readonly direction: Direction;

  /** Field by sort. */
  readonly order: Order;
}

/** Available values for sorting. */
export type AnimeOrder = 'titleEnglish' | 'airedStart' | 'status';

/** Ordering direction. */
export enum Direction {
  Ascending = 'asc',
  Descending = 'desc',
}
