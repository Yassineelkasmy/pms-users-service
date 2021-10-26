import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'user_sessions' , timestamps: true})
export class UserSessionSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly userId: string;

  @Prop()
  readonly userAgent:string;

  @Prop()
  readonly valid: boolean;

  @Prop()
  readonly createdAt: Date;

  @Prop()
  readonly updatedAt: Date;

}