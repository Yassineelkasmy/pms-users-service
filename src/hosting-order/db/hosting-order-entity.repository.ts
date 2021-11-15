import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { HostingOrder } from '../HostingOrder';
import { HostingOrderSchemaFactory } from './hosting-order-schema.factory';
import { HostingOrderSchema } from './hosting-order.schema';
import { Model } from 'mongoose';
@Injectable()
export class HostingOrderEntityRepository extends BaseEntityRepository<
  HostingOrderSchema,
  HostingOrder
> {
  constructor(
    @InjectModel(HostingOrderSchema.name)
    hostingOrderModel: Model<HostingOrderSchema>,
    hostingOrderSchemaFactory: HostingOrderSchemaFactory,
  ) {
    super(hostingOrderModel, hostingOrderSchemaFactory);
  }
}
