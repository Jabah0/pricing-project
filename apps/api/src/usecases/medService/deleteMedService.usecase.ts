import { ILogger } from 'src/domain/logger/logger.interface';
import { MedServiceRepository } from 'src/domain/repositories/medServiceRepository.interface';

export class DeleteMedServiceUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly medServiceRepository: MedServiceRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.medServiceRepository.deleteById(id);
    this.logger.log(
      'deleteMedServiceUseCase execute',
      `MedService ${id} have been deleted`,
    );
  }
}
