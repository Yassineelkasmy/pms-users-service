import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseEntityRepository } from "src/database/base-entity.repository";
import { VerificationToken } from "../../VerificationToken";
import { VerificationTokenSchema } from "./verification_token.schema";
import { VerificationTokenSchemaFactory } from "./verification_token_schema.factory";

@Injectable()
export class VerificationTokenEntityRepository extends BaseEntityRepository<VerificationTokenSchema,VerificationToken> {
    constructor(
        @InjectModel(VerificationTokenSchema.name)
        verificationTokenModel :Model<VerificationTokenSchema>,
        verificationTokenSchemaFactory : VerificationTokenSchemaFactory,

    ){
        super(verificationTokenModel,verificationTokenSchemaFactory);
    }

    async findByUserEmailAndType(userEmail : string, type : string) : Promise<VerificationToken[]> {
        const vTokens = await this.find({userEmail:userEmail, type:type});

        return vTokens;
    }
} 