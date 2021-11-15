import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { EmailModule } from './email/email.module';
import { TokensModule } from './tokens/tokens.module';
import { HostingOrderModule } from './hosting-order/hosting-order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    TokensModule,
    SessionsModule,
    EmailModule,
    HostingOrderModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'users'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
