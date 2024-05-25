import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { PrismaService } from '../config/prisma-orm/prisma.service';
import { UserM } from '../../domain/model/user';
import { Prisma, User } from '@prisma/client';
import { formatISO } from 'date-fns';
import { Role } from '../common/enums/role.enum';
import { paginator } from './paginator';
import {
  PaginateFunction,
  PaginatedResult,
} from 'src/domain/model/apiResponse';

const paginate: PaginateFunction = paginator({ perPage: 30 });

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(
    page: number,
    perPage?: number,
    role?: Role,
    username?: string,
    fullName?: string,
  ): Promise<PaginatedResult<UserM>> {
    return paginate(
      this.prisma.user,
      {
        where: {
          role,
          fullName: {
            contains: fullName,
            mode: 'insensitive',
          },
          username: {
            contains: username,
            mode: 'insensitive',
          },
        } as Prisma.UserWhereInput,
        select: {
          id: true,
          username: true,
          fullName: true,
          role: true,
          hashRefreshToken: true,
          lastLogin: true,
          createDate: true,
          updatedDate: true,
        } as Prisma.UserSelect,
      },
      { page, perPage },
    );
  }

  async getUser(id: number): Promise<UserM> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return this.toUser(user);
  }

  async patchUser(
    id: number,
    updateBody: Omit<Partial<UserM>, 'id'>,
  ): Promise<UserM> {
    const user = await this.prisma.user.update({
      data: {
        ...updateBody,
      },
      where: {
        id,
      },
    });

    return user;
  }

  async deleteUser(id: number): Promise<UserM> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    if (!deletedUser) return null;

    return this.toUser(deletedUser);
  }

  async getUserByUsername(username: string): Promise<UserM> {
    const adminUserEntity = await this.prisma.user.findFirst({
      where: { username: username },
    });

    if (!adminUserEntity) {
      return null;
    }

    return this.toUser(adminUserEntity);
  }

  async addNewUser(
    fullName,
    username: string,
    password: string,
    role: Role,
  ): Promise<UserM> {
    const newUser = await this.prisma.user.create({
      data: {
        fullName,
        password,
        username,
        lastLogin: formatISO(new Date().toDateString()),
        hashRefreshToken: '',
        role,
      },
    });

    return this.toUser(newUser);
  }

  async updateLastLogin(username: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        username,
      },
      data: {
        lastLogin: formatISO(new Date().toDateString()),
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

  async getMe(
    id: number,
  ): Promise<{ fullName: string; username: string; role: string }> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        fullName: true,
        username: true,
        role: true,
      },
    });
  }

  private toUser(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity.id;
    adminUser.fullName = adminUserEntity.fullName;
    adminUser.role = adminUserEntity.role;
    adminUser.username = adminUserEntity.username;
    adminUser.password = adminUserEntity.password;
    adminUser.createDate = adminUserEntity.createDate;
    adminUser.updatedDate = adminUserEntity.updatedDate;
    adminUser.lastLogin = adminUserEntity.lastLogin;
    adminUser.hashRefreshToken = adminUserEntity.hashRefreshToken;

    return adminUser;
  }
}
