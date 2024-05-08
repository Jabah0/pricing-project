import { PaginatedResult } from 'src/domain/model/apiResponse';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserM } from 'src/domain/model/user';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    page: number,
    perPage?: number,
  ): Promise<PaginatedResult<UserM>> {
    return await this.userRepository.getUsers(page, perPage);
  }
}
