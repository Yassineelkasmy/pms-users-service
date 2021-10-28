import { UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { get } from "lodash";
import { UserEntityRepository } from "src/users/db/user_entity.repository";
import { verifyEmailVerificationJwt } from "src/utils/jwt.utils";
import { VerifyUserCommand } from "./verify_user.command";

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
    constructor(public readonly userEntityRepository: UserEntityRepository) {}
    async execute({verifyUserReqeuest}:VerifyUserCommand) {
        const { token } = verifyUserReqeuest;
        const {decoded} = verifyEmailVerificationJwt(token);
        const email = get(decoded, "email") as string;
        if (!decoded || !email) throw new UnauthorizedException("Email verification link expired");
        const [user]  = await this.userEntityRepository.findOneByEmail(email);
        if(!user.isVerified()){
            user.verifyUserEmail();
            await this.userEntityRepository.findOneAndReplaceById(user.getId(), user);
        }

    

    }
}