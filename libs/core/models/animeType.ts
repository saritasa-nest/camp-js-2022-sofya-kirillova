/** Available anime types. */
export enum AnimeType {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'Movie',
  Special = 'Special',
  Ona = 'ONA',
  Music = 'Music',
}

/**
 * Check whether the value is Type.
 * @param value Tested value.
 */
export function checkIsType(value: string): value is AnimeType {
  return Object.values(AnimeType).includes(value as AnimeType);
}
