import { Body, Controller, Get, Param, Post, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
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

    @Get("/verify")
    async verify(@Query("token") token:string) {
       return await this.commandBus.execute<VerifyUserCommand>(
           new VerifyUserCommand(token),
       );
    }

    @Post("forgot-password")
    async forgotPassword(@Body() forgotPasswordRequest: ForgotPasswordRequest) {
        await this.commandBus.execute<ForgotPasswordCommand>(
            new ForgotPasswordCommand(forgotPasswordRequest)
        );
    }

    @Post("reset-passwrod")
    async resetPassword(@Body() resetPasswordRequest: ResetPasswordRequest) {
        return await this.commandBus.execute<ResetPasswordCommand>(
            new ResetPasswordCommand(resetPasswordRequest)
        );
    }

    






}
