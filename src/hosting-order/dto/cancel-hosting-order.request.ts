import { IsString } from 'class-validator';
export class CancelHostingOrderRequest {
	@IsString()	
	orderId: string;
}
