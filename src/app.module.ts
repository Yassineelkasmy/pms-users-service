import {  Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';


@Module({
  imports: [DatabaseModule, UsersModule, SessionsModule],
  controllers: [],
  providers: [],
})  
export class AppModule{}
