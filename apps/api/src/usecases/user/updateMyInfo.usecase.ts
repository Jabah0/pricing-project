import { User } from 'api-contract';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class UpdateMyInfoUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    id: number,
    newUserData: Partial<
      Omit<User, 'password' | 'id' | 'createdDate' | 'updatedDate'>
    >,
  ): Promise<void> {
    await this.userRepository.patchUser(id, newUserData);

    this.logger.log(
      'updateMyDataUseCases execute',
      `User With Id ${id} data have been updated`,
    );
  }
}
