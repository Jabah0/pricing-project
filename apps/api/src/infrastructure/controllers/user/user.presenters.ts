import { ApiProperty } from '@nestjs/swagger';
import { UserM } from 'src/domain/model/user';

export class UserPresenters {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  createDate: Date;
  @ApiProperty()
  updatedDate: Date;
  @ApiProperty()
  lastLogin: Date;
  @ApiProperty()
  hashRefreshToken: string;

  constructor(user: UserM) {
    this.id = user.id;
    this.username = user.username;
    this.hashRefreshToken = user.hashRefreshToken;
    this.lastLogin = user.lastLogin;
    this.createDate = user.createDate;
    this.updatedDate = user.updatedDate;
  }
}
