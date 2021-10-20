import { AggregateRoot } from "@nestjs/cqrs";

export class UserSession extends AggregateRoot{
    constructor(
        private readonly _id: string,
        private readonly userId: string,
        private readonly valid: boolean,
        private readonly userAgent: string,
        private readonly createdAt?: Date,
        private readonly updatedAt?: Date,

    ){
        super();
    }

    getId() : string {
        return this._id;
    }

    getUserId() : string {
        return this.userId;
    }

    isValid() : boolean {
        return this.valid;
    }

    getUserAgent() : string {
        return this.userAgent;
    }    

    getCreateDate() : Date {
        return this.createdAt;
    }

    getUpdateDate() : Date {
        return this.updatedAt;
    }
}