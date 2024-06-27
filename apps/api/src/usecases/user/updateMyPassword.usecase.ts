import { HttpException, HttpStatus } from '@nestjs/common';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class UpdateMyPasswordUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepository.getUser(id);

    const isEqual = await this.bcryptService.compare(
      oldPassword,
      user.password,
    );

    if (!isEqual) {
      throw new HttpException(
        'Password does not matches',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const newHashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.updateMyPassword(id, newHashedPassword);

    this.logger.log(
      'updateMyPasswordUseCases execute',
      `User With Id ${id} password have been updated`,
    );
  }

  async hashPassword(password: string) {
    return this.bcryptService.hash(password);
  }
}
