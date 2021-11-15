import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { CreateHostingOrderRequest } from 'src/hosting-order/dto/create-hosting-order.request';
import { CreateHostingOrderCommand } from 'src/hosting-order/commands/create-hosting-order.command';
@Controller('hosting-orders')
export class HostingOrdersController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(AuthGuard)
  @Post()
  async createHostingOrder(
    @Req() req: any,
    @Body() hostingOrderRequest: CreateHostingOrderRequest,
  ) {
    const userId = req.user.userId;
    await this.commandBus.execute<CreateHostingOrderCommand>(
      new CreateHostingOrderCommand(hostingOrderRequest, userId),
    );
  }
}
