import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { EmailService } from "src/email/email.service";
import { signEmailVerificationJwt } from "src/utils/jwt.utils";
import { UserCreatedEvent } from "./user_created.event";

@EventsHandler(UserCreatedEvent)
export class SendEmailVerficationHandler implements IEventHandler{
    constructor(private readonly emailService: EmailService){}
    async handle({ userEmail  } : UserCreatedEvent) : Promise<void>{
        

        const token =  signEmailVerificationJwt(
            { email: userEmail },
            { expiresIn:"15m" } // 15 minutes
        );

        const url = `http://www.localhost:8081/auth/verify/${token}`;

        const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
 
        await this.emailService.sendMail({
          to: userEmail,
          subject: 'Email confirmation',
          text,
        });

    }
}