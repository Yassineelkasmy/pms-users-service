import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSessionResponse } from "src/sessions/dto/create_session.response.dto";
import { UserSessionFactory } from "src/sessions/UserSession.factory";
import { signJwt } from "src/utils/jwt.utils";
import { CreateSessionCommand } from "./create_session.command";
import config  from 'config/default';

@CommandHandler(CreateSessionCommand)
export class CreateSessionHandler implements ICommandHandler<CreateSessionCommand, CreateSessionResponse>{
    
    constructor(
            private readonly userSessionFactory: UserSessionFactory,
        ){}

    async execute({createSessionRequest , userAgent}: CreateSessionCommand): Promise<CreateSessionResponse> {
        const {email , password} = createSessionRequest;

        const userSession  = await this.userSessionFactory.create(userAgent,email,password);

        const accessToken = signJwt(
            { userId:userSession.getUserId(), session: userSession.getId() },
            { expiresIn: config.accessTokenTtl } // 15 minutes
          );

        const refreshToken = signJwt(
            { userId:userSession.getUserId(), session: userSession.getId() },
            { expiresIn: config.refreshTokenTtl } // 1 year
          );

        return {
            access_token: accessToken,
            refresh_token: refreshToken
    
    }

}
}


