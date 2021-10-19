import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'users' })
export class UserSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly username: string;

  @Prop({
    unique:true,
  })
  readonly email:string;

  @Prop()
  readonly phone:string;

  @Prop()
  readonly password: string;

  @Prop()
  readonly company: string;

  @Prop()
  readonly verified: boolean;

  @Prop()
  readonly active: boolean;

  


}