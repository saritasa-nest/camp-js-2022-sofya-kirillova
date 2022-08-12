import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination dto.
   * @param mapper Result mapping function.
   */
  export function fromDto<Dto, Model>(
    dto: PaginationDto<Dto>,
    mapper: (result: Dto) => Model,
  ): Pagination<Model> {
    return new Pagination({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results: dto.results.map(result => mapper(result)),
    });
  }
}
