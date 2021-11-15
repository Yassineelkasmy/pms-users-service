import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { User } from '../User';
import { UserSchema } from './user.schema';
import { UserSchemaFactory } from './user_schema.factory';

@Injectable()
export class UserEntityRepository extends BaseEntityRepository<
  UserSchema,
  User
> {
  constructor(
    @InjectModel(UserSchema.name)
    userModel: Model<UserSchema>,
    userSchemaFactory: UserSchemaFactory,
  ) {
    super(userModel, userSchemaFactory);
  }

  async findOneByEmail(email: string): Promise<User[]> {
    return await this.find({ email: email });
  }
  async findVerifiedByEmail(email: string) {
    return await this.find({ email: email, verified: true });
  }
}
