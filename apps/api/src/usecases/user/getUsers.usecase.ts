import { PaginatedResult } from 'src/domain/model/apiResponse';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserM } from 'src/domain/model/user';
import { Role } from 'src/infrastructure/common/enums/role.enum';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    page: number,
    perPage?: number,
    role?: Role,
    username?: string,
    fullName?: string,
  ): Promise<PaginatedResult<UserM>> {
    return await this.userRepository.getUsers(
      page,
      perPage,
      role,
      username,
      fullName,
    );
  }
}
