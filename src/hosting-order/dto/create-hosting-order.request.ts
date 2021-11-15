import { IsNumber, IsUrl } from 'class-validator';
import { HostingPlan } from '../hosting-plan.enum';

export class CreateHostingOrderRequest {
  @IsNumber()
  plan: HostingPlan;

  @IsUrl()
  domain: string;
}
