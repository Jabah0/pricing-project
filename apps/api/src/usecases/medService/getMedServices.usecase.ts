import { MedService } from '../../domain/model/medService';
import { MedServiceRepository } from '../../domain/repositories/medServiceRepository.interface';

export class GetMedServicesUseCase {
  constructor(private readonly medServiceRepository: MedServiceRepository) {}

  async execute(): Promise<MedService[]> {
    return await this.medServiceRepository.findAll();
  }
}
