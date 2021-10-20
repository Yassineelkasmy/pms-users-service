import { CreateSessionRequest } from "src/sessions/dto/create_session.request.dto";

export class CreateSessionCommand {
    constructor(public readonly createSessionRequest:CreateSessionRequest, public readonly userAgent:string) {

    }
}