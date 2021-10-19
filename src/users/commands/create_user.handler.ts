import { ConflictException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UserFactory } from "../user.factory";
import { CreateUserCommand } from "./create_user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    
    constructor(private readonly userFactory: UserFactory,
                private readonly eventPublisher: EventPublisher,){}

    async execute({createUserRequest}: CreateUserCommand) : Promise<void> {
        
            const {username, email, phone, password, company} = createUserRequest;
            
            
            const user = this.eventPublisher.mergeObjectContext(
            await this.userFactory.create(username, email, phone, password, company)
            );
            user.commit();
        
    }

    }