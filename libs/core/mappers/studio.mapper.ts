import { StudioDto } from '../dtos/studio.dto';
import { Studio } from '../models/studio';

export namespace StudioMapper {

  /**
   * Maps dto to model.
   * @param dto Studio dto.
   */
  export function fromDto(dto: StudioDto): Studio {
    return new Studio({
      id: dto.id,
      name: dto.name,
    });
  }

  /**
   * Maps model to dto.
   * @param model Studio model.
   */
  export function toDto(model: Studio): StudioDto {
    return {
      id: model.id,
      name: model.name,
    };
  }
}
