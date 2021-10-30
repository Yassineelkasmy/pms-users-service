import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';
import { TokenType } from '../Token';

@Schema({ versionKey: false, collection: 'tokens'})
export class TokenSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly email: string;

  @Prop()
  readonly type:TokenType;


}