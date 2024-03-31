import { MedService } from '../model/medService';

export interface MedServiceRepository {
  insert(medService: MedService): Promise<MedService>;
  findAll(): Promise<MedService[]>;
  findById(id: string): Promise<MedService>;
  deleteById(id: string): Promise<MedService>;
}
