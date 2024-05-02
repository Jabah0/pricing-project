import { MedService } from '../model/medService';

export interface MedServiceRepository {
  insert(medService: MedService): Promise<MedService>;
  findAll(
    userId: number,
    name: string,
    code: string,
    dalilCode: string,
  ): Promise<MedService[]>;
  findByUser(
    userId: number,
    name: string,
    code: string,
    dalilCode: string,
  ): Promise<MedService[]>;
  findById(id: string): Promise<MedService>;
  deleteById(id: string): Promise<MedService>;
  patch(
    userId: number,
    serviceId: string,
    updateBody: Partial<MedService>,
  ): Promise<MedService>;
}
