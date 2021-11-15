import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly username: string,
    private readonly email: string,
    private readonly phone: string,
    private password: string,
    private readonly company: string,
    private verified: boolean,
    private readonly active: boolean,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getProfile(): Object {
    return {
      id: this._id,
      username: this.username,
      email: this.email,
      phone: this.phone,
      company: this.company,
    };
  }
  getUsername(): string {
    return this.username;
  }

  getPhone(): string {
    return this.phone;
  }

  getEmail(): string {
    return this.email;
  }

  getCompany(): string {
    return this.company;
  }

  getPassword(): string {
    return this.password;
  }

  isVerified(): boolean {
    return this.verified;
  }

  isActive(): boolean {
    return this.active;
  }

  verifyUserEmail() {
    this.verified = true;
  }

  resetPassword(password: string) {
    this.password = password;
  }

  getCreateDate(): Date {
    return this.createdAt;
  }

  getUpdateDate(): Date {
    return this.updatedAt;
  }
}

