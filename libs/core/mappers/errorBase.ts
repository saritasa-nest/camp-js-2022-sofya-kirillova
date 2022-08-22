import { ErrorBase } from '../models/errorBase';

import { ErrorBaseDto } from './../dtos/errorBase.dto';

export namespace ErrorBaseMapper {

  /**
   * Maps dto to model.
   * @param dto Field error dto.
   */

  /**
   * Maps dto to model.
   * @param dto Error Base dto.
   * @param mapper Result mapping function.
   */
  export function fromDto<Dto, Model>(
    dto: ErrorBaseDto<Dto>,
    mapper: (data: Dto) => Model,
  ): ErrorBase<Model> {
    return new ErrorBase({
      data: dto.data ? mapper(dto.data) : null,
      detail: dto.detail,
      code: dto.code ?? null,
    });
  }
}
