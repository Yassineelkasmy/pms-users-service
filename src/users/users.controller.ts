import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "./commands/create_user.command";
import { CreateUserRequest } from "./dto/create_user_request.dto";

@Controller('users')
export class UsersController {
constructor(private readonly commandBus: CommandBus){}
    @Post()
    async createUser (
        @Body() createUserRequest: CreateUserRequest,
    ): Promise<any> {
        return this.commandBus.execute<CreateUserCommand, void>(
        new CreateUserCommand(createUserRequest),
        );
    
  }

}