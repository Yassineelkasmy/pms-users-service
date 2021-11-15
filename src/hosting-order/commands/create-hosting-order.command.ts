import { CreateHostingOrderRequest } from 'src/hosting-order/dto/create-hosting-order.request';
export class CreateHostingOrderCommand {
  constructor(
    public readonly createHostingOrderRequest: CreateHostingOrderRequest,
    public readonly userId: string,
  ) {}
}
