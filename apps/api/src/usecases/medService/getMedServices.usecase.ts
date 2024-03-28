import { MedService } from 'src/domain/model/medService';
import { MedServiceRepository } from 'src/domain/repositories/medServiceRepository.interface';

export class GetMedServicesUseCase {
  constructor(private readonly medServiceRepository: MedServiceRepository) {}

  async execute(): Promise<MedService[]> {
    return await this.medServiceRepository.findAll();
  }
}
