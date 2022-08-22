/** Available genre type. */
export enum GenreTypeDto {
  Genres = 'GENRES',
  ExplicitGenres = 'EXPLICIT_GENRES',
  Themes = 'THEMES',
  Demographics = 'DEMOGRAPHICS',
}

/** Genre DTO. */
export interface GenreDto {

  /** Id. */
  readonly id: number;

  /** Name. */
  readonly name: string;

  /** Type. */
  readonly type: GenreTypeDto;

}
