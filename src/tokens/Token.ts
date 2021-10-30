import {AggregateRoot} from "@nestjs/cqrs";

export class Token extends AggregateRoot {
    constructor(private readonly _id,
            private email:string,
            private type: TokenType,
        ){
            super();
        }

        getId() :string {
            return this._id;
        }

        getEmail() :string {
            return this.email;
        }

        getType() : TokenType {
            return this.type;
        }
}


export enum TokenType {
    EMAIL_VERIFICATION,
    PASSWORD_RESET
}