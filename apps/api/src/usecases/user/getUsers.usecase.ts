import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserWithoutPassword } from 'src/domain/model/user';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserWithoutPassword[]> {
    const users = await this.userRepository.getUsers();
    return users.map((user) => user.toUserWithoutPassword());
  }
}
