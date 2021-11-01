import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { EmailService } from "src/email/email.service";
import { TokenEntityRepository } from "src/tokens/db/token_entity.repository";
import { TokenType } from "src/tokens/Token";
import { TokenFactory } from "src/tokens/token.factory";
import { signEmailVerificationJwt } from "src/utils/jwt.utils";
import { UserCreatedEvent } from "./user_created.event";

@EventsHandler(UserCreatedEvent)
export class SendEmailVerficationHandler implements IEventHandler{
    constructor(
        private readonly emailService: EmailService,
        private readonly tokenFactory: TokenFactory,
        private readonly tokenEntityRepository:TokenEntityRepository,
        ){}
    async handle({ userEmail  } : UserCreatedEvent) : Promise<void>{
        
        const token =  signEmailVerificationJwt(
            { email: userEmail },
            { expiresIn:"15m" } // 15 minutes
        );
        
        const [prevToken] = await this.tokenEntityRepository.findOneByEmail(userEmail);
        if(prevToken) {
            await this.tokenEntityRepository.deleteByEmail(userEmail);
            
        }
        await this.tokenFactory.create(userEmail,TokenType.EMAIL_VERIFICATION);
        
        const url = `http://www.localhost:8081/auth/verify/${token}`;

        const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
 
        await this.emailService.sendMail({
          to: userEmail,
          subject: 'Email confirmation',
          text,
        });

    }
}