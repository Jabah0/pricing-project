import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserM } from 'src/domain/model/user';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserM> {
    return await this.userRepository.getUser(id);
  }
}
