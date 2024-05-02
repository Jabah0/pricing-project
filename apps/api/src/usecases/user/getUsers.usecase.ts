import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserWithoutPassword } from 'src/domain/model/user';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserWithoutPassword[]> {
    const users = await this.userRepository.getUsers();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      lastLogin: user.lastLogin,
      hashRefreshToken: user.hashRefreshToken,
      createDate: user.createDate,
      updatedDate: user.updatedDate,
    }));
  }
}
