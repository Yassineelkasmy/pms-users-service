import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseEntityRepository } from "src/database/base-entity.repository";
import { UserSession } from "../../UserSession";
import { UserSessionSchema } from "./user_session.schema";
import { UserSessionSchemaFactory } from "./user_session_schema.factory";

@Injectable()
export class UserSessionEntityRepository extends BaseEntityRepository<UserSessionSchema, UserSession> {

    
    constructor(
        @InjectModel(UserSessionSchema.name)
        userSessionModel: Model<UserSessionSchema>,
        userSessionSchemaFactory: UserSessionSchemaFactory
    ){
        super(userSessionModel,userSessionSchemaFactory);
    }

   

}
