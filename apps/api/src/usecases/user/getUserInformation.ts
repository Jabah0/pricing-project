import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class GetUserInformationUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<{ fullName: string; username: string }> {
    return await this.userRepository.getUser(id);
  }
}
