import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { verifyPassword } from "src/utils/hash";
import { UserEntityRepository } from "src/users/db/user_entity.repository";
import { SignInResponseTokens } from "src/users/dto/sign_in_tokens.response";
import { SignInUserCommand } from "./sign_in_user.command";

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand , SignInResponseTokens>{
    constructor(private readonly userEntityRepository: UserEntityRepository,
        private readonly eventPublisher: EventPublisher,){}

        async execute({signInUserRequest}: SignInUserCommand) : Promise<SignInResponseTokens> {
            const { email, password } = signInUserRequest;
            const [user] = await this.userEntityRepository.findOneByEmail(email);
            if(user){
                
                const isPasswordValid = await verifyPassword(user.getPassword(), password);
                if(isPasswordValid){

                    //Generate 
                    
                    return { token:";ssss", refresh_token:"sdsdsd" };
                }

                else{
                    throw new UnauthorizedException();
                }

            }else{
                throw new NotFoundException();
            }
        }   

}