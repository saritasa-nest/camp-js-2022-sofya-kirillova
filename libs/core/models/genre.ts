
import { Immerable, OmitImmerable } from './immerable';

/** Available genre type. */
export enum GenreType {
  Genres = 'Genres',
  ExplicitGenres = 'Explicit genres',
  Themes = 'Themes',
  Demographics = 'Demographics',
}

/** Genre. */
export class Genre extends Immerable {

  /** Id. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  /** Type. */
  public readonly type: GenreType;

  public constructor(data: InitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
  }
}

type InitArgs = OmitImmerable<Genre>;
