import { Module } from '@nestjs/common';
import { DatabaseMedServiceRepository } from './medService.repository';
import { DatabaseUserRepository } from './user.repository';
import { PrismaService } from '../config/prisma-orm/prisma.service';

@Module({
  imports: [],
  providers: [
    DatabaseUserRepository,
    DatabaseMedServiceRepository,
    PrismaService,
  ],
  exports: [DatabaseUserRepository, DatabaseMedServiceRepository],
})
export class RepositoriesModule {}
