import { MedServiceRepository } from '../../domain/repositories/medServiceRepository.interface';

export class GetServicesNumberOfPricingUseCase {
  constructor(private readonly medServiceRepository: MedServiceRepository) {}

  async execute(): Promise<number> {
    return await this.medServiceRepository.numberOfPricing();
  }
}
