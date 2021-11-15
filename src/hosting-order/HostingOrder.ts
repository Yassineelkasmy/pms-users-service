import { AggregateRoot } from '@nestjs/cqrs';

export class HostingOrder extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly plan: HostingPlan,
    private readonly userId: string,
    private readonly status: HostingOrderStatus,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }
  getUserId(): string {
    return this.userId;
  }

  getHosingPlan(): HostingPlan {
    return this.plan;
  }

  getOrderStatus(): HostingOrderStatus {
    return this.status;
  }

  getUpdateDate(): Date {
    return this.updatedAt;
  }

  getCreateDate(): Date {
    return this.createdAt;
  }
}

export enum HostingPlan {
  REGULAR = 8,
  BUSINESS = 16,
  CORPORATE = 35,
  PROFESSIONAL = 49,
}

export enum HostingOrderStatus {
  PENDING,
  VALIDATED,
}
