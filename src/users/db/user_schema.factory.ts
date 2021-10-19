import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { EntitySchemaFactory } from '../../database/entity-schema.factory';
import { User } from '../User';
import { UserSchema } from './user.schema';

@Injectable()
export class UserSchemaFactory
  implements EntitySchemaFactory<UserSchema, User> {
  create(user: User): UserSchema {
    return {
      _id: new ObjectId(user.getId()),
      username: user.getId(),
      email: user.getEmail(),
      phone: user.getPhone(),
      company: user.getCompany(),
      password : user.getPassword(),
      verified: user.isVerified(),
      active: user.isActive(),
    };
  }

  createFromSchema(userSchema: UserSchema): User {
    return new User(
      userSchema._id.toHexString(),
      userSchema.username,
      userSchema.email,
      userSchema.phone,
      userSchema.password,
      userSchema.company,
      userSchema.verified,
      userSchema.active
    );
  }
}
