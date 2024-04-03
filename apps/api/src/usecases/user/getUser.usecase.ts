import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserWithoutPassword } from 'src/domain/model/user';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserWithoutPassword> {
    const user = await this.userRepository.getUser(id);
    return user.toUserWithoutPassword();
  }
}
