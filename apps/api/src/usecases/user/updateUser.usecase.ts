import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM, UserWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class UpdateUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(
    id: number,
    updateBody: Omit<Partial<UserM>, 'id'>,
  ): Promise<UserWithoutPassword> {
    if (updateBody.password) {
      updateBody.password = await this.hashPassword(updateBody.password);
    }
    const newUser = await this.userRepository.patchUser(id, updateBody);

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
