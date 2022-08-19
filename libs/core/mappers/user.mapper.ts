import { User } from '../models/user';

import { UserDto } from '../dtos/user.dto';

export namespace UserMapper {

  /**
   * Maps dto to model.
   * @param dto User dto.
   */
  export function fromDto(dto: UserDto): User {

    return new User({
      firstName: dto.first_name,
      lastName: dto.last_name,
      avatar: dto.avatar,
    });
  }
}
