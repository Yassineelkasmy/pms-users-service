import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PasswordResetEvent } from "./password_reset.event";

@EventsHandler(PasswordResetEvent)
export class PasswordResetHandler implements IEventHandler {
    async handle(passwordResetEvent: PasswordResetEvent) {
        const {userId, userEmail} = passwordResetEvent;

        

    }
}