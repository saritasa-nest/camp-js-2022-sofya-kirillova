import { Immerable, OmitImmerable } from './immerable';

/** Studio. */
export class Studio extends Immerable {

  /** Studio ID. */
  public readonly id: number;

  /** Studio name. */
  public readonly name: string;

  public constructor(data: InitArgsStudio) {
    super();
    this.id = data.id;
    this.name = data.name;
  }
}

type InitArgsStudio = OmitImmerable<Studio>;
