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
    userId: number,
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
        users: {
          every: {
            userId: {
              not: userId,
            },
          },
        },
      },
      include: {
        users: {
          select: {
            price: true,
            user: {
              select: {
                id: true,
                fullName: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    const filteredMedServices = medServices.filter(
      (medService) => medService.users.length < medService.numberOfPricing,
    );

    return filteredMedServices;
  }

  async findByUser(
    userId: number,
    name: string,
    code: string,
    dalilCode: string,
  ): Promise<MedService[]> {
    const userMedServices = await this.prisma.userMedServices.findMany({
      where: {
        userId,
        medService: {
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
      },
      select: {
        medService: {
          select: {
            id: true,
            name: true,
            code: true,
            dalilName: true,
            nationalCode: true,
            numberOfPricing: true,
            unitSize: true,
          },
        },
        price: true,
      },
    });

    return userMedServices.map((service) => ({
      ...service.medService,
      price: service.price,
    }));
  }

  async findById(id: string): Promise<MedService> {
    const selectedMedService = await this.prisma.medService.findUnique({
      where: {
        id,
      },
      include: {
        users: {
          select: {
            price: true,
            user: {
              select: {
                id: true,
                fullName: true,
                username: true,
                lastLogin: true,
              },
            },
          },
        },
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
        users: {
          upsert: {
            create: {
              price: updateBody.price,
              user: {
                connect: { id: userId },
              },
            },
            update: {
              price: updateBody.price,
            },
            where: {
              medServiceId_userId: {
                userId,
                medServiceId: serviceId,
              },
            },
          },
        },
      },
    });

    if (!updatedService) return null;

    return updatedService;
  }
}
