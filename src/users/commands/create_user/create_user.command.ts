import { CreateUserRequest } from "../../dto/create_user_request.dto";

export class CreateUserCommand{
    constructor(public readonly createUserRequest: CreateUserRequest) {

    }
}