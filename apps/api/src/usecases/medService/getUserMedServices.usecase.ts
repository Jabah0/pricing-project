import { MedService } from '../../domain/model/medService';
import { MedServiceRepository } from '../../domain/repositories/medServiceRepository.interface';

export class GetUserMedServicesUseCase {
  constructor(private readonly medServiceRepository: MedServiceRepository) {}

  async execute(
    userId: number,
    name: string,
    code: string,
    dalilCode: string,
  ): Promise<MedService[]> {
    return await this.medServiceRepository.findByUser(
      userId,
      name,
      code,
      dalilCode,
    );
  }
}
