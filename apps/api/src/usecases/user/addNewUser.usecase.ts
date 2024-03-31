import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class AddNewUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(username: string, password: string): Promise<UserM> {
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userRepository.addNewUser(
      username,
      hashedPassword,
    );

    this.logger.log(
      'addNewUserUseCases execute',
      `New User: ${newUser.username} have been inserted`,
    );

    return newUser;
  }

  async hashPassword(password: string) {
    return this.bcryptService.hash(password);
  }
}
