import { Prop, Schema } from "@nestjs/mongoose";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";


@Schema({ versionKey: false, collection: 'verification_tokens' , timestamps: true})
export class VerificationTokenSchema extends IdentifiableEntitySchema  {

    @Prop()
    readonly userEmail:string;

    @Prop()
    readonly type: string;

    @Prop()
    readonly used: boolean;

    @Prop()
    readonly createdAt: Date;
    
    @Prop()
    readonly updatedAt: Date;

}