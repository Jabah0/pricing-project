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
        numberOfPricing: medService.numberOfPricing,
      },
    });

    return newMedService;
  }

  async findAll(
    name: string,
    code: string,
    dalilCode: string,
  ): Promise<MedService[]> {
    const medServices = await this.prisma.medService.findMany({
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
      include: {
        users: true,
      },
      orderBy: { id: 'asc' },
    });

    const filteredMedServices = medServices.filter(
      (medService) => medService.users.length < 3,
    );

    return filteredMedServices;
  }

  async findByUser(
    userId: number,
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
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findById(id: string): Promise<MedService> {
    const selectedMedService = await this.prisma.medService.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
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
    userId: number,
    serviceId: string,
    updateBody: Partial<MedService>,
  ): Promise<MedService> {
    const updatedService = await this.prisma.medService.update({
      where: { id: serviceId },
      data: {
        ...updateBody,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (!updatedService) return null;

    return updatedService;
  }
}
