import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UserSessionEntityRepository} from "src/sessions/db/user_session/user_session_entity.repository";
import {RemoveSessionCommand} from "./remove-session.command";

@CommandHandler(RemoveSessionCommand)
export class RemoveSessionHandler implements ICommandHandler<RemoveSessionCommand>{
    
    constructor(private readonly userSessionEntityRepo: UserSessionEntityRepository){}

    async execute({sessionId}: RemoveSessionCommand) : Promise<void> {
        this.userSessionEntityRepo.deleteOneById(sessionId);
    }

}


