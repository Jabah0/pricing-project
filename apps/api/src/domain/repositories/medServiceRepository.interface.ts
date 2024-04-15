import { MedService } from '../model/medService';

export interface MedServiceRepository {
  insert(medService: MedService): Promise<MedService>;
  findAll(name: string, code: string, dalilCode: string): Promise<MedService[]>;
  findById(id: string): Promise<MedService>;
  deleteById(id: string): Promise<MedService>;
}
