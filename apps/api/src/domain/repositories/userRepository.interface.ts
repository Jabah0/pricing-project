import { Role } from 'src/infrastructure/common/enums/role.enum';
import { UserM } from '../model/user';
import { PaginatedResult } from '../model/apiResponse';

export interface UserRepository {
  getUser(id: number): Promise<UserM>;
  getUsers(
    page: number,
    perPage?: number,
    role?: Role,
    username?: string,
    fullName?: string,
  ): Promise<PaginatedResult<UserM>>;
  deleteUser(id: number): Promise<UserM>;
  getUserByUsername(username: string): Promise<UserM>;
  addNewUser(
    fullName: string,
    username: string,
    password: string,
    role: Role,
  ): Promise<UserM>;
  patchUser(id: number, updateBody: Partial<UserM>);
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  getMe(
    id: number,
  ): Promise<{ fullName: string; username: string; role: string }>;
}
