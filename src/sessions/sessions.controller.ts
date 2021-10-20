import { Body, Controller, Post, Session } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSessionCommand } from './commands/create_session/create_session.command';
import { CreateSessionRequest } from './dto/create_session.request.dto';
import { CreateSessionResponse } from './dto/create_session.response.dto';

@Controller('sessions')
export class SessionsController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    async createSession(
        @Body() createSessionRequest:CreateSessionRequest,
        @Session() session: Record<string, any>,
    ) : Promise<CreateSessionResponse> {
        session.visits = session.visits ? session.visits + 1 : 1;
        console.log(session.visits);
        return this.commandBus.execute<CreateSessionCommand , CreateSessionResponse>(
            
            new CreateSessionCommand(createSessionRequest , "none"),
        );
    }
}
