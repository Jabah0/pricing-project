import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMedServiceDto {
  @ApiProperty({ required: true })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly unitSize: number;
}

export class AddMedServiceDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly dalilName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly nationalCode: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly unitSize: number;
}
