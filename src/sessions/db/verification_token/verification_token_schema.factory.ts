import { Injectable } from "@nestjs/common";
import { EntitySchemaFactory } from "src/database/entity-schema.factory";
import { VerificationToken } from "../../VerificationToken";
import { VerificationTokenSchema } from "./verification_token.schema";
import { ObjectId } from "mongodb";

@Injectable()
export class VerificationTokenSchemaFactory implements EntitySchemaFactory<VerificationTokenSchema, VerificationToken> {
    create(verificationToken :VerificationToken) : VerificationTokenSchema {
        return {
            _id: new ObjectId(verificationToken.getId()),
            userEmail: verificationToken.getUserEmail(),
            type: verificationToken.getType(),
            used: verificationToken.isUsed(),
            createdAt: verificationToken.getCreateDate(),
            updatedAt: verificationToken.getUpdateDate(),
        }

    }

    createFromSchema( verificationTokenSchema : VerificationTokenSchema ) : VerificationToken {
        return new VerificationToken(
            verificationTokenSchema._id.toHexString(),
            verificationTokenSchema.userEmail,
            verificationTokenSchema.type,
            verificationTokenSchema.used,
            verificationTokenSchema.createdAt,
            verificationTokenSchema.updatedAt,
        );
    }
}