import { CreateUserHandler } from "./create_user/create_user.handler";
import { SignInUserHandler } from "./sign_in_user/sign_in_user.handler";

export const UserCommandHandlers = [
    CreateUserHandler,
    SignInUserHandler,
]