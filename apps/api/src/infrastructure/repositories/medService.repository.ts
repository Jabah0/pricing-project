import { MedService } from 'src/domain/model/medService';
import { MedServiceRepository } from '../../domain/repositories/medServiceRepository.interface';
import { PrismaService } from '../config/prisma-orm/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseMedServiceRepository implements MedServiceRepository {
  constructor(private prisma: PrismaService) {}

  async insert(medService: MedService): Promise<MedService> {
    const newMedService = await this.prisma.medService.create({
      data: {
        id: medService.id,
        name: medService.name,
        code: medService.code,
        dalilName: medService.dalilName,
        nationalCode: medService.nationalCode,
        price: medService.price,
        unitSize: medService.unitSize,
      },
    });

    return newMedService;
  }

  async findAll(
    name: string,
    code: string,
    dalilCode: string,
  ): Promise<MedService[]> {
    return await this.prisma.medService.findMany({
      where: {
        name: {
          contains: name,
        },
        code: {
          contains: code,
        },
        dalilName: {
          contains: dalilCode,
        },
      },
    });
  }

  async findById(id: string): Promise<MedService> {
    const selectedMedService = await this.prisma.medService.findUnique({
      where: {
        id,
      },
    });

    if (!selectedMedService) return null;

    return selectedMedService;
  }

  async deleteById(id: string): Promise<MedService> {
    const deletedService = await this.prisma.medService.delete({
      where: { id },
    });

    if (!deletedService) return null;

    return deletedService;
  }

  async patch(
    id: string,
    updateBody: Partial<MedService>,
  ): Promise<MedService> {
    const updatedService = await this.prisma.medService.update({
      where: { id },
      data: { ...updateBody },
    });

    if (!updatedService) return null;

    return updatedService;
  }
}
