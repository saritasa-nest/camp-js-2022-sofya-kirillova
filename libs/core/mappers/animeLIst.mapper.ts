import { AnimeCommonDto } from '../dtos/animeCommon.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { AnimeCommon } from '../models/animeCommon';
import { Pagination } from '../models/pagination';

import { AnimeCommonMapper } from './animeCommon.mapper';

export namespace AnimeListMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination dto.
   */
  export function fromDto(dto: PaginationDto<AnimeCommonDto>): Pagination<AnimeCommon> {
    const results = dto.results.map(anime => AnimeCommonMapper.fromDto(anime));
    return new Pagination<AnimeCommon>({
      count: dto.count,
      results,
    });
  }
}
