import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHostingOrderCommand } from 'src/hosting-order/commands/create-hosting-order.command';
import { ObjectId } from 'mongodb';
import { HostingOrderEntityRepository } from '../db/hosting-order-entity.repository';
import { HostingOrder } from '../HostingOrder';
import { HostingOrderStatus } from '../hosting-plan.enum';
import { UnauthorizedException } from '@nestjs/common';
@CommandHandler(CreateHostingOrderCommand)
export class CreateHostingOrderHandler
  implements ICommandHandler<CreateHostingOrderCommand>
{
  constructor(
    private readonly hostingOrderEntityRepo: HostingOrderEntityRepository,
  ) {}
  async execute({
    createHostingOrderRequest,
    userId,
  }: CreateHostingOrderCommand) {
    const { plan, domain } = createHostingOrderRequest;

    const hostingOrder = new HostingOrder(
      new ObjectId().toHexString(),
      userId,
      domain,
      plan,
      HostingOrderStatus.PENDING,
    );

    const hostingOrderWithThisDomain = await this.hostingOrderEntityRepo.find({
      domain,
    });

    if (hostingOrderWithThisDomain.length) {
      throw new UnauthorizedException('hosting_order_domain_already_exists');
    }

    await this.hostingOrderEntityRepo.create(hostingOrder);
  }
}
