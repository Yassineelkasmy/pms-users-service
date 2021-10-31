import { Injectable } from "@nestjs/common";
import { TokenEntityRepository } from "./db/token_entity.repository";
import { Token , TokenType } from "./Token";
import { ObjectId } from "mongodb";


@Injectable()
export class TokenFactory {
    constructor(private readonly tokenEntityRepository: TokenEntityRepository){}

    async create(email:string, type:TokenType): Promise<Token> {
        const token = new Token(new ObjectId().toHexString(),email,type)
        await this.tokenEntityRepository.create(token);

        return token;
    }

} 