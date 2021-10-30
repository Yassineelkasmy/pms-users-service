import {  Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { EmailModule } from './email/email.module';
import { TokensModule } from './tokens/tokens.module';


@Module({
  imports: [DatabaseModule, UsersModule, TokensModule, SessionsModule, EmailModule],
  controllers: [],
  providers: [],
})  
export class AppModule{}
