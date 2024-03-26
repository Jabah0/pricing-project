import { ILogger } from '../../domain/logger/logger.interface';
import { MedService } from '../../domain/model/medService';
import { MedServiceRepository } from '../../domain/repositories/medServiceRepository.interface';

export class addMedServiceUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly medServiceRepository: MedServiceRepository,
  ) {}

  async execute(newService: MedService): Promise<MedService> {
    const result = await this.medServiceRepository.insert(newService);

    this.logger.log(
      'addMedServiceUseCase execute',
      'New medService have been inserted',
    );
    return result;
  }
}
