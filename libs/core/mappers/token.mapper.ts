import { Token } from '../models/token';

import { TokenDto } from './../dtos/token.dto';

export namespace TokenMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: TokenDto): Token {

    return new Token({
      refresh: dto.refresh,
      access: dto.access,
    });
  }
}
