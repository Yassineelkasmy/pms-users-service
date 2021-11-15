import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { HostingOrder } from '../HostingOrder';
import { HostingOrderSchema } from './hosting-order.schema';
import { ObjectId } from 'mongodb';

export class HostingOrderSchemaFactory
  implements EntitySchemaFactory<HostingOrderSchema, HostingOrder>
{
  create(hostingOrder: HostingOrder): HostingOrderSchema {
    return {
      _id: new ObjectId(),
      userId: hostingOrder.getUserId(),
      domain: hostingOrder.getDomin(),
      plan: hostingOrder.getHosingPlan(),
      status: hostingOrder.getOrderStatus(),
      createdAt: hostingOrder.getCreateDate(),
      updatedAt: hostingOrder.getUpdateDate(),
    };
  }

  createFromSchema(hostingOrderSchema: HostingOrderSchema): HostingOrder {
    return new HostingOrder(
      hostingOrderSchema._id.toHexString(),
      hostingOrderSchema.userId,
      hostingOrderSchema.domain,
      hostingOrderSchema.plan,
      hostingOrderSchema.status,
      hostingOrderSchema.createdAt,
      hostingOrderSchema.updatedAt,
    );
  }
}
