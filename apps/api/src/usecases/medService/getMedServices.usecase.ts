import { PaginatedResult } from 'src/domain/model/apiResponse';
import { MedService } from '../../domain/model/medService';
import { MedServiceRepository } from '../../domain/repositories/medServiceRepository.interface';

export class GetMedServicesUseCase {
  constructor(private readonly medServiceRepository: MedServiceRepository) {}

  async execute(
    userId: number,
    name: string,
    code: string,
    dalilCode: string,
    page: number,
    perPage?: number,
  ): Promise<PaginatedResult<MedService>> {
    return await this.medServiceRepository.findAll(
      userId,
      name,
      code,
      dalilCode,
      page,
      perPage,
    );
  }
}
