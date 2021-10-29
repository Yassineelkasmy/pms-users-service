import { AggregateRoot } from "@nestjs/cqrs";

export class VerificationToken extends AggregateRoot{
    constructor(
        private readonly _id: string,
        private readonly userEmail: string,
        private readonly type: string,
        private used: boolean,
        private readonly createdAt?: Date,
        private readonly updatedAt?: Date,

    ){
        super();
    }

    getId() : string {
        return this._id;
    }


    isUsed() : boolean {
        return this.used;
    }

    getUserEmail() : string {
        return this.userEmail;
    }
    
    getType() : string {
        return this.type;
    }

    getCreateDate() : Date {
        return this.createdAt;
    }

    getUpdateDate() : Date {
        return this.updatedAt;
    }

    markAsUsed() {
        this.used = true;
    }
}