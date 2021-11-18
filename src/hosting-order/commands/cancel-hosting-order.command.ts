import { CancelHostingOrderRequest } from "../dto/cancel-hosting-order.request";
export class CancelHostingOrderCommand{ 
	constructor(public readonly cancelHostingOrderRequest:CancelHostingOrderRequest, public readonly userId:string ){}	
}
