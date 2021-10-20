import { EntityFactory } from "src/database/entity.factory";
import { UserSession } from "./UserSession";
import { ObjectId } from 'mongodb';
import { UserSessionEntityRepository } from "./db/user_session_entity.repository";
import { UserEntityRepository } from "src/users/db/user_entity.repository";
import { verifyPassword } from "src/utils/hash";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class UserSessionFactory implements EntityFactory<UserSession> {

    constructor(private readonly userSessionEntityRepository: UserSessionEntityRepository,
            private readonly userEntityRepository: UserEntityRepository,
        ){}

    async create(userAgent:string,email:string, password:string): Promise<UserSession> {
        const [user] = await this.userEntityRepository.findOneByEmail(email);

        if(user) {
            const isPasswordValid :boolean = await verifyPassword(user.getPassword(), password);
            if(isPasswordValid) {

                const userSession = new UserSession(
                    new ObjectId().toHexString(),
                    user.getId(),
                    true,
                    userAgent,
                );
        
                await this.userSessionEntityRepository.create(userSession);
        
                return userSession;

                
                

            }else{
                throw new UnauthorizedException("invalid_user_credentials");
            }
        }else{
            throw new UnauthorizedException("invalid_user_credentials");
        }
        
        
       
    }   
}