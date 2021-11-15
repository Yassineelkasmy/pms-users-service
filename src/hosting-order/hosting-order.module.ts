import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { HostingOrderSchema } from './db/hosting-order.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { HostingOrdersController } from 'src/hosting-order/hosting-orders.controller';
@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: HostingOrderSchema.name,
        schema: SchemaFactory.createForClass(HostingOrderSchema),
      },
    ]),
  ],
  controllers: [HostingOrdersController],
})
export class HostingOrderModule {}
