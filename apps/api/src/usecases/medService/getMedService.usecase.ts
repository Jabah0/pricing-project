import { MedService } from 'src/domain/model/medService';
import { MedServiceRepository } from 'src/domain/repositories/medServiceRepository.interface';

export class GetMedServiceUseCase {
  constructor(private readonly medServiceRepository: MedServiceRepository) {}

  async execute(id: number): Promise<MedService> {
    return await this.medServiceRepository.findById(id);
  }
}
