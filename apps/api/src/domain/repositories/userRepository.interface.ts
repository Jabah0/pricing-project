import { UserM } from '../model/user';

export interface UserRepository {
  getUsers(): Promise<UserM[]>;
  getUserByUsername(username: string): Promise<UserM>;
  addNewUser(username: string, password: string): Promise<UserM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
}
