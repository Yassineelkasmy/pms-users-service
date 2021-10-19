import { EntityFactory } from "src/database/entity.factory";
import { User } from "./User";
import { ObjectId } from "mongodb";
import { UserCreatedEvent } from "./events/user_created.event";
import { UserEntityRepository } from "./db/user_entity.repository";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class UserFactory implements EntityFactory<User> {
    constructor(private readonly userEntityRepository: UserEntityRepository){}
    async create(username: string, email:string, phone: string, password:string, company:string ) :Promise<User>{
        
        // TODO: Hash the password before creating the user

        const user = new User(
            new ObjectId().toHexString(),
            username,
            email,
            phone,
            password,
            company,
        );
        if(!(await this.userEntityRepository.findOneByEmail(email)).length){
            this.userEntityRepository.create(user);
            user.apply(
            new UserCreatedEvent(user.getId())
            );
            return user;
        }else{
            throw new ConflictException("email already used");
        }
        

        


    }
}