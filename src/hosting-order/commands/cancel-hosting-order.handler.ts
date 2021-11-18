import { CancelHostingOrderCommand } from 'src/hosting-order/commands/cancel-hosting-order.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HostingOrderEntityRepository } from 'src/hosting-order/db/hosting-order-entity.repository';
import { NotFoundException } from '@nestjs/common';
@CommandHandler(CancelHostingOrderCommand)
export class CancelHostingOrderHandler implements ICommandHandler<CancelHostingOrderCommand>{
	
	constructor(private readonly hostingOrderEntityRepository: HostingOrderEntityRepository){}

	async execute({cancelHostingOrderRequest, userId}: CancelHostingOrderCommand):Promise<void> {
		const {orderId} = cancelHostingOrderRequest;
		const [hostingOrder] = await  this.hostingOrderEntityRepository.find({orderId});
		if(hostingOrder && hostingOrder.getUserId() == userId) {
			//TODO: Replace this implementation 
		const deleted = await this.hostingOrderEntityRepository.deleteOneById(orderId);
			if (!deleted){  
			throw new NotFoundException('order-not-found');
			}
		} else {
			throw new NotFoundException('order-not-found');
		}
	}

}
