import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { PrismaService } from '../config/prisma-orm/prisma.service';
import { UserM } from '../../domain/model/user';
import { User } from '@prisma/client';
import { formatISO } from 'date-fns';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<UserM[]> {
    const users = await this.prisma.user.findMany({ orderBy: { id: 'asc' } });

    return users.map((user) => this.toUser(user));
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
  ): Promise<UserM> {
    const newUser = await this.prisma.user.create({
      data: {
        fullName,
        password,
        username,
        lastLogin: formatISO(new Date().toDateString()),
        hashRefreshToken: '',
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

  async getMe(id: number): Promise<{ fullName: string; username: string }> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        fullName: true,
        username: true,
      },
    });
  }

  private toUser(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity.id;
    adminUser.fullName = adminUserEntity.fullName;
    adminUser.username = adminUserEntity.username;
    adminUser.password = adminUserEntity.password;
    adminUser.createDate = adminUserEntity.createDate;
    adminUser.updatedDate = adminUserEntity.updatedDate;
    adminUser.lastLogin = adminUserEntity.lastLogin;
    adminUser.hashRefreshToken = adminUserEntity.hashRefreshToken;

    return adminUser;
  }
}
