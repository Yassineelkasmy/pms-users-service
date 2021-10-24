import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserCommandHandlers } from './commands';
import { UserSchema } from './db/user.schema';
import { UserEntityRepository } from './db/user_entity.repository';
import { UserSchemaFactory } from './db/user_schema.factory';
import { UserEventHandlers } from './events';
import { UserFactory } from './user.factory';
import { UsersController } from './users.controller';

@Module({
    imports:[
        CqrsModule,
        MongooseModule.forFeature(
            [
                {
                    name: UserSchema.name,
                    schema:SchemaFactory.createForClass(UserSchema)
                }
            ]
        )
    ],
    providers:[
        UserEntityRepository,
        UserSchemaFactory,
        UserFactory,
        ...UserCommandHandlers,
        ...UserEventHandlers,
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
