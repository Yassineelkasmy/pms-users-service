import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { EntitySchemaFactory } from '../../database/entity-schema.factory';
import { Token } from '../Token';
import { TokenSchema } from './token.schema';

@Injectable()
export class TokenSchemaFactory
  implements EntitySchemaFactory<TokenSchema, Token> {
  create(token: Token): TokenSchema {
    return {
      _id: new ObjectId(token.getId()),
      email: token.getEmail(),
      type: token.getType(),
  }}

  createFromSchema(tokenSchema: TokenSchema): Token {
    return new Token(
      tokenSchema._id.toHexString(),
      tokenSchema.email,
      tokenSchema.type,

    );
  }
}
