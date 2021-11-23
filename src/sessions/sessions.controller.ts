import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSessionCommand } from './commands/create_session/create_session.command';
import { CreateSessionRequest } from './dto/create_session.request.dto';
import { CreateSessionResponse } from './dto/create_session.response.dto';
import { Request, Response } from 'express';
import { ReIssueAccessTokenCommand } from './commands/reissue_access_token/reissue_access_token.command';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { VerifyUserCommand } from './commands/verify_user/verify_user.command';
import { ForgotPasswordRequest } from './dto/forgot_password_request.dto';
import { ForgotPasswordCommand } from './commands/forgot_password/forgot_password.command';
import { ResetPasswordRequest } from './dto/reset_password_reqeuest.dto';
import { ResetPasswordCommand } from './commands/reset_password/reset_password.command';
import { VerifyUserRequest } from './dto/verify_user.request';
import {RemoveSessionCommand} from './commands/remove_session/remove-session.command';
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
            throw new UnauthorizedException("refresh_token_expired");
        }
    }

    @Post("/verify")
    async verify(@Body() verifyUserRequest:VerifyUserRequest) {
       return await this.commandBus.execute<VerifyUserCommand>(
           new VerifyUserCommand(verifyUserRequest),
       );
    }

    @Post("forgot-password")
    async forgotPassword(@Body() forgotPasswordRequest: ForgotPasswordRequest) {
        await this.commandBus.execute<ForgotPasswordCommand>(
            new ForgotPasswordCommand(forgotPasswordRequest)
        );
    }

    @Post("reset-password")
    async resetPassword(@Body() resetPasswordRequest: ResetPasswordRequest) {
        return await this.commandBus.execute<ResetPasswordCommand>(
            new ResetPasswordCommand(resetPasswordRequest)
        );
    }
    
    @UseGuards(AuthGuard)
    @Post("remove-session")
    async removeSession(@Req() req:any) {
        const sessionId = req.user.session as string;

        return await this.commandBus.execute<RemoveSessionCommand>(
            new RemoveSessionCommand(sessionId)
        );
    } 






}
