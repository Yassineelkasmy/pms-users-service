import { IsEnum, IsUrl } from 'class-validator';
import { HostingPlan } from '../hosting-plan.enum';

export class CreateHostingOrderRequest {
  @IsEnum(HostingPlan)
  plan: HostingPlan;

  @IsUrl()
  domain: string;
}
