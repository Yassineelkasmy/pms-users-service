import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "./user_created.event";

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler{
    async handle({ userId  } : UserCreatedEvent) : Promise<void>{
        console.log(userId);
    }
}