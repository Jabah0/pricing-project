import { ApiProperty } from '@nestjs/swagger';
import { MedService } from 'src/domain/model/medService';

export class MedServicePresenters {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  dalilCode: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  nationalCode: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  unitSize: number;

  constructor(medService: MedService) {
    this.id = medService.id;
    this.name = medService.name;
    this.code = medService.code;
    this.dalilCode = medService.dalilCode;
    this.nationalCode = medService.nationalCode;
    this.price = medService.price;
    this.unitSize = medService.unitSize;
  }
}
