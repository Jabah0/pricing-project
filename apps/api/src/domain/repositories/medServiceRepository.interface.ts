import { PaginatedResult } from '../model/apiResponse';
import { MedService } from '../model/medService';

export type PriceFilter = {
  equals?: number;
  not?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
};

export interface MedServiceRepository {
  insert(medService: MedService): Promise<MedService>;

  findAll(
    userId: number,
    name: string,
    code: string,
    dalilCode: string,
    nationalCode: string,
    orderBy: string,
    orderDirection: string,
    page: number,
    perPage?: number,
    priceFilter?: PriceFilter,
    unitSize?: PriceFilter,
  ): Promise<PaginatedResult<MedService>>;

  findByUser(
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
  ): Promise<PaginatedResult<MedService>>;

  findById(id: string): Promise<MedService>;

  deleteById(id: string): Promise<MedService>;

  patch(
    userId: number,
    serviceId: string,
    updateBody: Partial<MedService>,
  ): Promise<MedService>;

  numberOfPricing(): Promise<number>;

  updateNumberOfPricing(limit: number): Promise<void>;
}
