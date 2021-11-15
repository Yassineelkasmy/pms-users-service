import { HostingOrder } from '../HostingOrder';
import { HostingOrderSchema } from './hosing-order.schema';

export class HosingOrderSchemaFactor
  implements EntitySchemaFactory<HostingOrderSchema, HostingOrder> {}
