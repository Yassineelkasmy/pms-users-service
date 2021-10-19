import { SignInUserRequest } from "src/users/dto/sign_in_user_request.dto";

export class SignInUserCommand{
    constructor(public readonly signInUserRequest: SignInUserRequest) {

    }
}