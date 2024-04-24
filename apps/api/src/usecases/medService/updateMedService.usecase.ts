import { MedService } from 'api-contract';
import { ILogger } from 'src/domain/logger/logger.interface';
import { MedServiceRepository } from 'src/domain/repositories/medServiceRepository.interface';

export class UpdateMedServiceUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly medServiceRepository: MedServiceRepository,
  ) {}

  async execute(
    userId,
    serviceId: string,
    updateBody: { price?: number; unitSize?: number },
  ): Promise<MedService> {
    const updatedService = await this.medServiceRepository.patch(
      userId,
      serviceId,
      updateBody,
    );

    this.logger.log(
      'updateMedServiceUseCase execute',
      `MedService ${serviceId} have been Updated`,
    );

    return updatedService;
  }
}
