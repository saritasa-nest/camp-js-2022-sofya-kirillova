/** Studio DTO. */
export interface StudioDto {

  /** Studio ID. */
  readonly id: number;

  /** Studio created, for example, "2014-12-20T17:30:50.416Z". */
  readonly created: string | null;

  /** Studio modified, for example, "2014-12-20T17:30:50.416Z". */
  readonly modified: string | null;

  /** Studio name. */
  readonly name: string;
}
