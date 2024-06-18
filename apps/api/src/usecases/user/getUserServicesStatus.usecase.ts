import { ILogger } from 'src/domain/logger/logger.interface';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class GetUserServicesStatusUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    userId: number,
  ): Promise<{ pricedServices: number; totalServices: number }> {
    const userServicesStatus = await this.userRepository.userStatus(userId);

    this.logger.log(
      'updateMedServiceUseCase execute',
      `User ${userId} get status`,
    );

    return userServicesStatus;
  }
}
