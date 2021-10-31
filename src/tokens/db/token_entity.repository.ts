import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseEntityRepository } from "src/database/base-entity.repository";
import { Token } from "../Token";
import { TokenSchema } from "./token.schema";
import { TokenSchemaFactory } from "./token_schema.factory";

@Injectable()
export class TokenEntityRepository extends BaseEntityRepository<TokenSchema, Token> {

    constructor(
        @InjectModel(TokenSchema.name)
        tokenModel: Model<TokenSchema>,
        tokenSchemaFactory: TokenSchemaFactory
    ){
        super(tokenModel,tokenSchemaFactory);
    }

    async findOneByEmail(email:string):Promise<Token[]> {
        return await this.find({email:email});
    }

}