export class UserWithoutPassword {
  id: number;
  username: string;
  createDate: Date;
  updatedDate: Date;
  lastLogin: Date;
  hashRefreshToken: string;
}

export class UserM extends UserWithoutPassword {
  password: string;

  toUserWithoutPassword() {
    return {
      id: this.id,
      username: this.username,
      createDate: this.createDate,
      updatedDate: this.updatedDate,
      lastLogin: this.lastLogin,
      hashRefreshToken: this.hashRefreshToken,
    };
  }
}
