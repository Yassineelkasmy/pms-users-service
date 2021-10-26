import { ForgotPasswordRequest } from "src/sessions/dto/forgot_password_request.dto";

export class ForgotPasswordCommand{
    constructor(public readonly forgotPasswordRequest:ForgotPasswordRequest){}
}