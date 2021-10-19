import { Body, Controller, Post, Session} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "./commands/create_user/create_user.command";
import { SignInUserCommand } from "./commands/sign_in_user/sign_in_user.command";
import { CreateUserRequest } from "./dto/create_user_request.dto";
import { SignInResponseTokens } from "./dto/sign_in_tokens.response";
import { SignInUserRequest } from "./dto/sign_in_user_request.dto";


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

  @Post("/signin")
    async signIn (
        @Body() signInUserRequest: SignInUserRequest,
    ): Promise<any> {
        return this.commandBus.execute<SignInUserCommand, SignInResponseTokens>(
        new SignInUserCommand(signInUserRequest),
        );
    
  }

}