import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { PrismaService } from '../config/prisma-orm/prisma.service';
import { UserM } from 'src/domain/model/user';
import { User } from '@prisma/client';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getUserByUsername(username: string): Promise<UserM> {
    const adminUserEntity = await this.prisma.user.findFirst({
      where: { username: username },
    });

    if (!adminUserEntity) {
      return null;
    }

    return this.toUser(adminUserEntity);
  }
  async updateLastLogin(username: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        username,
      },
      data: {
        lastLogin: 'CURRENT_TIMESTAMP',
      },
    });
  }

  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: {
        username,
      },
      data: {
        hashRefreshToken: refreshToken,
      },
    });
  }

  private toUser(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity.id;
    adminUser.username = adminUserEntity.username;
    adminUser.createDate = adminUserEntity.createDate;
    adminUser.updatedDate = adminUserEntity.updateDate;
    adminUser.lastLogin = adminUserEntity.lastLogin;
    adminUser.hashRefreshToken = adminUserEntity.hashRefreshToken;

    return adminUser;
  }
}
