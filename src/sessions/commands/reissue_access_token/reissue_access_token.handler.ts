import { UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { get } from "lodash";
import { UserSessionEntityRepository } from "src/sessions/db/user_session/user_session_entity.repository";
import { UserEntityRepository } from "src/users/db/user_entity.repository";
import { signJwt, verifyJwt } from "src/utils/jwt.utils";
import { ReIssueAccessTokenCommand } from "./reissue_access_token.command";
import config  from "config/default";

@CommandHandler(ReIssueAccessTokenCommand)
export class ReIssueAccessTokenHandler implements ICommandHandler<ReIssueAccessTokenCommand, string> {
    
    constructor(private readonly userSessionEntityRepository: UserSessionEntityRepository,
            private readonly userEntityRepository : UserEntityRepository,
        ){}
    async execute({x_refresh_token}: ReIssueAccessTokenCommand): Promise<string> {
        const { decoded } = verifyJwt(x_refresh_token);
        const sessionId = get(decoded, "session") as string;
        if (!decoded || !sessionId) throw new UnauthorizedException("x_refresh_token_expired");

        const session = await this.userSessionEntityRepository.findOneById(sessionId);

        if (!session || !session.isValid()) throw new UnauthorizedException("invalid_session");

        const user = await this.userEntityRepository.findOneById(session.getUserId());

        const accessToken = signJwt(
            { userId:user.getId(), session: session.getId() },
            { expiresIn: config.accessTokenTtl } // 15 minutes
        );
        
          return accessToken;
    }   
}