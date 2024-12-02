import { MedServicePrices } from '../../domain/model/medService';
import { MedServiceRepository } from '../../domain/repositories/medServiceRepository.interface';

export class GetMedServicePricesUseCase {
  constructor(private readonly medServiceRepository: MedServiceRepository) {}

  async execute(id: string): Promise<MedServicePrices[]> {
    return await this.medServiceRepository.medServicePrices(id);
  }
}
