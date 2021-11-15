import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { CreateUserCommand } from './commands/create_user/create_user.command';
import { CreateUserRequest } from './dto/create_user_request.dto';
import { UserProfileQuery } from './queries/user_profile_query/user_profile.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  async createUser(@Body() createUserRequest: CreateUserRequest): Promise<any> {
    return this.commandBus.execute<CreateUserCommand, void>(
      new CreateUserCommand(createUserRequest),
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async userProfile(@Req() userProfileRequest) {
    const userId = userProfileRequest.user.userId;

    return await this.queryBus.execute<UserProfileQuery>(
      new UserProfileQuery(userId),
    );
  }
}

