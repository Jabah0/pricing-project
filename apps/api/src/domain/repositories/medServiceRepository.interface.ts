import { MedService } from '../model/medService';

export interface MedServiceRepository {
  insert(medService: MedService): Promise<MedService>;
  findAll(): Promise<MedService[]>;
  findById(id: number): Promise<MedService>;
  deleteById(id: number): Promise<void>;
}
