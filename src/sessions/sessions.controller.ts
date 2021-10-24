import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSessionCommand } from './commands/create_session/create_session.command';
import { CreateSessionRequest } from './dto/create_session.request.dto';
import { CreateSessionResponse } from './dto/create_session.response.dto';
import { Request, Response } from 'express';
import { ReIssueAccessTokenCommand } from './commands/reissue_access_token/reissue_access_token.command';
import { AuthGuard } from 'src/middlewares/auth.guard';
@Controller('sessions')
export class SessionsController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    async createSession(
        @Body() createSessionRequest:CreateSessionRequest,
        @Res({ passthrough: true }) res: Response ,
        @Req() req: Request,
    ) : Promise<any> {
        const tokensResponse = await this.commandBus.execute<CreateSessionCommand , CreateSessionResponse>(
            
            new CreateSessionCommand(createSessionRequest , "none"),
        );
        

        res.cookie("auth-cookie", tokensResponse, {httpOnly:true ,signed:true});

    }

    @Get("/reissue")
    async reIssueAccessToken(@Res({ passthrough: true }) res: Response ,
                @Req() req: Request,
    ) {
        if(req.signedCookies['auth-cookie']) {
            const { refresh_token } = req.signedCookies['auth-cookie'];
            const access_token = await this.commandBus.execute<ReIssueAccessTokenCommand, string>(
                new ReIssueAccessTokenCommand(refresh_token)
            )
            const tokensResponse = {refresh_token , access_token};
            res.cookie("auth-cookie", tokensResponse, {httpOnly:true ,signed:true});


        }
        else {
            throw new UnauthorizedException();
        }
         

        

    }

    
}
