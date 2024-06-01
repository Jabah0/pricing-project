import { PaginatedResult } from 'src/domain/model/apiResponse';
import { MedService } from '../../domain/model/medService';
import {
  MedServiceRepository,
  PriceFilter,
} from '../../domain/repositories/medServiceRepository.interface';

export class GetUserMedServicesUseCase {
  constructor(private readonly medServiceRepository: MedServiceRepository) {}

  async execute(
    userId: number,
    name: string,
    code: string,
    dalilCode: string,
    nationalCode: string,
    orderBy: string,
    orderDirection: string,
    page: number,
    perPage?: number,
    price?: PriceFilter,
    unitSize?: PriceFilter,
  ): Promise<PaginatedResult<MedService>> {
    return await this.medServiceRepository.findByUser(
      userId,
      name,
      code,
      dalilCode,
      nationalCode,
      orderBy,
      orderDirection,
      page,
      perPage,
      price,
      unitSize,
    );
  }
}
