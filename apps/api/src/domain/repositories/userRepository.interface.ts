import { UserM } from '../model/user';

export interface UserRepository {
  getUser(id: number): Promise<UserM>;
  getUsers(): Promise<UserM[]>;
  deleteUser(id: number): Promise<UserM>;
  getUserByUsername(username: string): Promise<UserM>;
  addNewUser(
    fullName: string,
    username: string,
    password: string,
  ): Promise<UserM>;
  patchUser(id: number, updateBody: Partial<UserM>);
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}
