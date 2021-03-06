import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { TokensModule } from 'src/tokens/tokens.module';
import { UsersModule } from 'src/users/users.module';
import { UserSessionCommandHandlers } from './commands';
import { UserSessionSchema } from './db/user_session/user_session.schema';
import { UserSessionEntityRepository } from './db/user_session/user_session_entity.repository';
import { UserSessionSchemaFactory } from './db/user_session/user_session_schema.factory';
import { UserSessionEventHandlers } from './events';
import { SessionsController } from './sessions.controller';
import { UserSessionFactory } from './UserSession.factory';

@Module({
  controllers: [SessionsController],
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: UserSessionSchema.name,
        schema: SchemaFactory.createForClass(UserSessionSchema),
      },
    ]),
    TokensModule,
    UsersModule,
    EmailModule,
  ],
  providers: [
    AuthGuard,
    EmailService,
    UserSessionFactory,
    UserSessionEntityRepository,
    UserSessionSchemaFactory,
    ...UserSessionCommandHandlers,
    ...UserSessionEventHandlers,
  ],
})
export class SessionsModule {}
