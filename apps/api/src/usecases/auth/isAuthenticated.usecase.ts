import { UserM, UserWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: UserRepository) {}

  async execute(username: string): Promise<UserWithoutPassword> {
    const user: UserM = await this.adminUserRepo.getUserByUsername(username);

    return {
      id: user.id,
      username: user.username,
      lastLogin: user.lastLogin,
      hashRefreshToken: user.hashRefreshToken,
      createDate: user.createDate,
      updatedDate: user.updatedDate,
    };
  }
}
