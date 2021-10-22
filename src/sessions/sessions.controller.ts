import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSessionCommand } from './commands/create_session/create_session.command';
import { CreateSessionRequest } from './dto/create_session.request.dto';
import { CreateSessionResponse } from './dto/create_session.response.dto';
import { Request, Response } from 'express';
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
        
        console.log(req.signedCookies['auth-cookie']);
        res.cookie("auth-cookie", tokensResponse, {httpOnly:true ,signed:true})

        

    }
}
