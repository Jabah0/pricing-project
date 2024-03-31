import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { UserM } from 'src/domain/model/user';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserM[]> {
    return await this.userRepository.getUsers();
  }
}
