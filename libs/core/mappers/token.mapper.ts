import { Token } from '../models/token';

import { TokenDto } from './../dtos/token.dto';

export namespace TokenMapper {

  /**
   * Maps dto to model.
   * @param dto Token dto.
   */
  export function fromDto(dto: TokenDto): Token {

    return new Token({
      refresh: dto.refresh,
      access: dto.access,
    });
  }

  /**
   * Maps dto to model.
   * @param dto Token dto.
   */
  export function toDto(dto: Token): TokenDto {

    return {
      refresh: dto.refresh,
      access: dto.access,
    };
  }
}
