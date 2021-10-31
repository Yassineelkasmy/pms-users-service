import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { TokenEntityRepository } from 'src/tokens/db/token_entity.repository';
import { TokenSchemaFactory } from 'src/tokens/db/token_schema.factory';
import { TokenFactory } from 'src/tokens/token.factory';
import { TokensModule } from 'src/tokens/tokens.module';
import { UserCommandHandlers } from './commands';
import { UserSchema } from './db/user.schema';
import { UserDtoRepository } from './db/user_dto.repository';
import { UserEntityRepository } from './db/user_entity.repository';
import { UserSchemaFactory } from './db/user_schema.factory';
import { UserEventHandlers } from './events';
import { UserQueryHandlers } from './queries';
import { UserFactory } from './user.factory';
import { UsersController } from './users.controller';

@Module({
    imports:[
        CqrsModule,
        EmailModule,
        MongooseModule.forFeature(
            [
                {
                    name: UserSchema.name,
                    schema:SchemaFactory.createForClass(UserSchema)
                },
               
            ]
        ),
        TokensModule,

    ],
    providers:[
        UserEntityRepository,
        UserDtoRepository,
        UserSchemaFactory,
        UserFactory,
        ...UserCommandHandlers,
        ...UserQueryHandlers,
        ...UserEventHandlers,
        EmailService,
        AuthGuard,
        TokenFactory,
        TokenSchemaFactory,
        //TokenEntityRepository,
    ],
    controllers:[
        UsersController,
    ],
    exports: [
        UserEntityRepository,
        UserSchemaFactory,
        UserFactory,
    ]
})
export class UsersModule {}
