import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { get } from "lodash";
import { TokenEntityRepository } from "src/tokens/db/token_entity.repository";
import { UserEntityRepository } from "src/users/db/user_entity.repository";
import { verifyEmailVerificationJwt } from "src/utils/jwt.utils";
import { VerifyUserCommand } from "./verify_user.command";

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
    constructor(
        private readonly userEntityRepository: UserEntityRepository,
        private readonly tokenEntityRepository: TokenEntityRepository,
        
        ) {}
    async execute({verifyUserReqeuest}:VerifyUserCommand) {
        const { token } = verifyUserReqeuest;
        const {decoded} = verifyEmailVerificationJwt(token);
        const email = get(decoded, "email") as string;


        if (!decoded || !email) throw new UnauthorizedException("Email verification link expired");
        
        const [vToken] = await this.tokenEntityRepository.findOneByEmail(email);

        if(!vToken) {
            throw new UnauthorizedException("Email verification link expired");
        }

        await this.tokenEntityRepository.deleteByEmailAndType(email,vToken.getType());

        const [user]  = await this.userEntityRepository.findOneByEmail(email);
        if(!user) {
            throw new NotFoundException("use_not_found");
        }



        if(!user.isVerified()){
            user.verifyUserEmail();
            await this.userEntityRepository.findOneAndReplaceById(user.getId(), user);
        }

    

    }
}