import { ILogger } from 'src/domain/logger/logger.interface';
import { MedServiceRepository } from 'src/domain/repositories/medServiceRepository.interface';

export class UpdateNumberOfPricingUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly medServiceRepository: MedServiceRepository,
  ) {}

  async execute(limit: number): Promise<void> {
    await this.medServiceRepository.updateNumberOfPricing(limit);

    this.logger.log(
      'UpdateNumberOfPricingUseCase execute',
      `MedServices limit of pricing have been Updated`,
    );
  }
}
