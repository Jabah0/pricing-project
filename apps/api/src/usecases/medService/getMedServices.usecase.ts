import { MedService } from '../../domain/model/medService';
import { MedServiceRepository } from '../../domain/repositories/medServiceRepository.interface';

export class GetMedServicesUseCase {
  constructor(private readonly medServiceRepository: MedServiceRepository) {}

  async execute(
    name: string,
    code: string,
    dalilCode: string,
  ): Promise<MedService[]> {
    return await this.medServiceRepository.findAll(name, code, dalilCode);
  }
}
