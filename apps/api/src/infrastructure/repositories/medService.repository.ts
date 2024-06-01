import { MedService } from 'src/domain/model/medService';
import {
  MedServiceRepository,
  PriceFilter,
} from '../../domain/repositories/medServiceRepository.interface';
import { PrismaService } from '../config/prisma-orm/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  PaginateFunction,
  PaginatedResult,
} from 'src/domain/model/apiResponse';
import { paginator } from './paginator';
import { Prisma } from '@prisma/client';

const paginate: PaginateFunction = paginator({ perPage: 30 });

type UserMedServiceResult = {
  medService: MedService;
  price: number;
  unitSize: number;
};

@Injectable()
export class DatabaseMedServiceRepository implements MedServiceRepository {
  constructor(private prisma: PrismaService) {}

  async insert(medService: MedService): Promise<MedService> {
    const newMedService = await this.prisma.medService.create({
      data: {
        ...medService,
      },
    });

    return newMedService;
  }

  async findAll(
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
    unitSizeFilter?: PriceFilter,
  ): Promise<PaginatedResult<MedService>> {
    const sortOrder = orderDirection === 'desc' ? 'desc' : 'asc';
    const sortBy = orderBy ? orderBy : 'price';

    const price = priceFilter ? priceFilter : undefined;
    const unitSize = unitSizeFilter ? unitSizeFilter : undefined;

    return paginate(
      this.prisma.medService,
      {
        where: {
          price,
          unitSize,
          name: {
            contains: name,
            mode: 'insensitive',
          },
          code: {
            contains: code,
            mode: 'insensitive',
          },
          dalilCode: {
            contains: dalilCode,
            mode: 'insensitive',
          },
          nationalCode: {
            contains: nationalCode,
            mode: 'insensitive',
          },
          numberOfPricing: {
            lt: this.prisma.medService.fields.limitNumberOfPricing,
          },
          NOT: {
            users: {
              some: {
                userId: userId,
              },
            },
          },
        } as Prisma.MedServiceWhereInput,
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
        } as Prisma.MedServiceInclude,
        orderBy: {
          [sortBy]: sortOrder,
        } as Prisma.MedServiceOrderByWithRelationInput,
      },
      { page, perPage },
    );
  }

  async findByUser(
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
    unitSizeFilter?: PriceFilter,
  ): Promise<PaginatedResult<MedService>> {
    const sortOrder = orderDirection === 'desc' ? 'desc' : 'asc';
    const sortBy = orderBy ? orderBy : 'price';

    const price = priceFilter ? priceFilter : undefined;
    const unitSize = unitSizeFilter ? unitSizeFilter : undefined;

    const result: PaginatedResult<UserMedServiceResult> = await paginate(
      this.prisma.userMedServices,
      {
        where: {
          userId,
          price: price,
          unitSize: unitSize,
          medService: {
            name: {
              contains: name,
              mode: 'insensitive',
            },
            code: {
              contains: code,
              mode: 'insensitive',
            },
            dalilCode: {
              contains: dalilCode,
              mode: 'insensitive',
            },
            nationalCode: {
              contains: nationalCode,
              mode: 'insensitive',
            },
          },
        } as Prisma.UserMedServicesWhereInput,
        select: {
          medService: {
            select: {
              id: true,
              name: true,
              code: true,
              dalilCode: true,
              nationalCode: true,
              numberOfPricing: true,
            },
          },
          price: true,
          unitSize: true,
        } as Prisma.UserMedServicesSelect,
        orderBy:
          sortBy === 'price' || sortBy === 'unitSize'
            ? ({
                [sortBy]: sortOrder,
              } as Prisma.UserMedServicesOrderByWithRelationInput)
            : ({
                medService: {
                  [sortBy]: sortOrder,
                },
              } as Prisma.UserMedServicesOrderByWithRelationInput),
      },

      { page, perPage },
    );

    return {
      meta: result.meta,
      data: result.data.map(
        (item) =>
          ({
            id: item.medService.id,
            name: item.medService.name,
            dalilCode: item.medService.dalilCode,
            code: item.medService.code,
            nationalCode: item.medService.nationalCode,
            numberOfPricing: item.medService.numberOfPricing,
            unitSize: item.unitSize,
            price: item.price,
          }) as MedService,
      ),
    };
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
    const { price, unitSize } = updateBody;
    const service = await this.prisma.medService.findUnique({
      where: { id: serviceId },
    });

    const updatedService = await this.prisma.medService.update({
      where: { id: serviceId },
      data: {
        numberOfPricing: { increment: 1 },
        users: {
          upsert: {
            create: {
              price: price ? price : service.price,
              unitSize: unitSize ? unitSize : service.unitSize,
              user: {
                connect: { id: userId },
              },
            },
            update: {
              price,
              unitSize,
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
