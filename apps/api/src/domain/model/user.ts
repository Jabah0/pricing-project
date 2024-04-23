import { MedService } from 'api-contract';

export class UserWithoutPassword {
  id: number;
  username: string;
  createDate: Date;
  updatedDate: Date;
  lastLogin: Date;
  hashRefreshToken: string;
  medServices?: MedService[];
}

export class UserM extends UserWithoutPassword {
  password: string;

  // toUserWithoutPassword() {
  //   return {
  //     id: this.id,
  //     username: this.username,
  //     createDate: this.createDate,
  //     updatedDate: this.updatedDate,
  //     lastLogin: this.lastLogin,
  //     hashRefreshToken: this.hashRefreshToken,
  //     medServices: this.medServices,
  //   };
  // }
}
