import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { get } from "lodash";
import { UserEntityRepository } from "src/users/db/user_entity.repository";
import { hashPassword } from "src/utils/hash";
import { verifyRecoverPasswprdVerificationJwt } from "src/utils/jwt.utils";
import { ResetPasswordCommand } from "./reset_password.command";

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand>{
    
    constructor(private readonly userEntityRepository:UserEntityRepository) {}

    async execute({resetPasswordRequest}: ResetPasswordCommand ) {
        const {token , password } = resetPasswordRequest;

        const {decoded} = verifyRecoverPasswprdVerificationJwt(token);

        const userEmail = get(decoded, "email") as string;

        if(!decoded || !userEmail ) throw new UnauthorizedException("token_expired_or_user_suspended");
    
        const [user] = await this.userEntityRepository.findOneByEmail(userEmail);

        if(!user) throw new NotFoundException("user_not_found");
        if(!user.isVerified()) throw new UnauthorizedException("user_not_verified");

        const newPassword = await hashPassword(password);
        user.resetPassword(newPassword);
        await this.userEntityRepository.findOneAndReplaceById(user.getId(), user);


    }
}