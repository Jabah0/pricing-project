import { MedService } from '../../domain/model/medService';
import { MedServiceRepository } from '../../domain/repositories/medServiceRepository.interface';

export class GetMedServiceUseCase {
  constructor(private readonly medServiceRepository: MedServiceRepository) {}

  async execute(id: string): Promise<MedService> {
    return await this.medServiceRepository.findById(id);
  }
}
