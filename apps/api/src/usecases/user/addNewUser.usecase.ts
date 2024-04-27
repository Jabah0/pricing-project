import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class AddNewUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(
    fullName: string,
    username: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userRepository.addNewUser(
      fullName,
      username,
      hashedPassword,
    );

    this.logger.log(
      'addNewUserUseCases execute',
      `New User: ${newUser.username} have been inserted`,
    );

    return {
      id: newUser.id,
      fullName: newUser.fullName,
      username: newUser.username,
      lastLogin: newUser.lastLogin,
      hashRefreshToken: newUser.hashRefreshToken,
      createDate: newUser.createDate,
      updatedDate: newUser.updatedDate,
    };
  }

  async hashPassword(password: string) {
    return this.bcryptService.hash(password);
  }
}
