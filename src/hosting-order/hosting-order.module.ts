import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { HostingOrderSchema } from './db/hosting-order.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { HostingOrdersController } from 'src/hosting-order/hosting-orders.controller';
import { HostingOrderCommandHandlers } from 'src/hosting-order/commands';
import { HostingOrderEntityRepository } from './db/hosting-order-entity.repository';
import {HostingOrderSchemaFactory} from './db/hosting-order-schema.factory';
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
  providers:[
	HostingOrderEntityRepository,
	HostingOrderSchemaFactory,
	...HostingOrderCommandHandlers,
  ],
  controllers: [HostingOrdersController],
})
export class HostingOrderModule {}
