import { Immerable, OmitImmerable } from './immerable';

/** Error. */
export class ErrorBase<T> extends Immerable {

  /** Fields validation errors. */
  public readonly data: T | null;

  /** Code of error. */
  public readonly code: string | null;

  /** General information about the error. */
  public readonly detail: string;

  public constructor(data: InitArgsError<T>) {
    super();
    this.data = data.data;
    this.detail = data.detail;
    this.code = data.code;
  }
}

type InitArgsError<T> = OmitImmerable<ErrorBase<T>>;
