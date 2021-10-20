import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { EntitySchemaFactory } from '../../database/entity-schema.factory';
import { UserSession } from '../UserSession';
import { UserSessionSchema } from './user_session.schema';

@Injectable()
export class UserSessionSchemaFactory
  implements EntitySchemaFactory<UserSessionSchema, UserSession> {
  create(userSession: UserSession): UserSessionSchema {
    return {
      _id: new ObjectId(userSession.getId()),
      userId:userSession.getUserId(),
      userAgent: userSession.getUserAgent(),
      valid: userSession.isValid(),
      createdAt: userSession.getCreateDate(),
      updatedAt: userSession.getUpdateDate(),
      
    };
  }

  createFromSchema(userSessionSchema: UserSessionSchema): UserSession {
    return new UserSession(
      userSessionSchema._id.toHexString(),
      userSessionSchema.userId,
      userSessionSchema.valid,
      userSessionSchema.userAgent,
      userSessionSchema.createdAt,
      userSessionSchema.updatedAt
    );
  }
}
