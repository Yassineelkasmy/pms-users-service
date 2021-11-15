import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'hosting-orders', timestamps: true })
export class HostingOrderSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly userId: string;
  @Prop()
  readonly domain: string;
  @Prop()
  readonly status: number;
  @Prop()
  readonly plan: number;
  @Prop()
  readonly createdAt: Date;
  @Prop()
  readonly updatedAt: Date;
}
