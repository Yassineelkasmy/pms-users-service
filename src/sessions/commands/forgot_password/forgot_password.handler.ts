import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { EmailService } from "src/email/email.service";
import { TokenEntityRepository } from "src/tokens/db/token_entity.repository";
import { TokenType } from "src/tokens/Token";
import { TokenFactory } from "src/tokens/token.factory";
import { UserEntityRepository } from "src/users/db/user_entity.repository";
import { signRecoverPasswordVerificationJwt } from "src/utils/jwt.utils";
import { ForgotPasswordCommand } from "./forgot_password.command";

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler implements ICommandHandler<ForgotPasswordCommand>{
  constructor(private readonly userEntityRepository:UserEntityRepository,
        private readonly emailService: EmailService,
        private readonly tokenFactory:TokenFactory,
        private readonly tokenEntityRepository: TokenEntityRepository,
    ) {}

  async execute({forgotPasswordRequest}: ForgotPasswordCommand) {

    const {email} = forgotPasswordRequest;

    const [user] = await this.userEntityRepository.findOneByEmail(email);

    if(!user) throw new NotFoundException("user_not_found");

    if(!user.isVerified()) throw new UnauthorizedException("user_not_verified");

    const token =  signRecoverPasswordVerificationJwt(
        { email: email },
        { expiresIn:"5m" } 
    );
    

    
    await this.tokenEntityRepository.deleteByEmailAndType(email,TokenType.PASSWORD_RESET);
   
    await this.tokenFactory.create(email, TokenType.PASSWORD_RESET);


    const url = `http://www.localhost:3000/sessions/reset-password?token=${token}`;

    const text = `Reset your password here: ${url}`;

    await this.emailService.sendMail({
      to: email,
      subject: 'Password Reset',
      text,
    });



  }


}