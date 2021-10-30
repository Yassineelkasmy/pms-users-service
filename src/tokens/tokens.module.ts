import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { TokenSchema } from './db/token.schema';
import { TokenEntityRepository } from './db/token_entity.repository';
import { TokenSchemaFactory } from './db/token_schema.factory';
import { TokenFactory } from './token.factory';

@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature(
            [
                {
                    name: TokenSchema.name,
                    schema:SchemaFactory.createForClass(TokenSchema)
                }
            ]
        ),

    ],
    providers: [
        TokenEntityRepository,
        TokenSchemaFactory,
        TokenFactory,
    ],
    exports : [
        TokenEntityRepository,
        TokenSchemaFactory,
        TokenFactory,
    ]
    
})
export class TokensModule {}

