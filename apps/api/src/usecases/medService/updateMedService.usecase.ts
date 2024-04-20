import { MedService } from 'api-contract';
import { ILogger } from 'src/domain/logger/logger.interface';
import { MedServiceRepository } from 'src/domain/repositories/medServiceRepository.interface';

export class UpdateMedServiceUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly medServiceRepository: MedServiceRepository,
  ) {}

  async execute(
    id: string,
    updateBody: { price?: number; unitSize?: number },
  ): Promise<MedService> {
    const updatedService = await this.medServiceRepository.patch(
      id,
      updateBody,
    );

    this.logger.log(
      'updateMedServiceUseCase execute',
      `MedService ${id} have been Updated`,
    );

    return updatedService;
  }
}
