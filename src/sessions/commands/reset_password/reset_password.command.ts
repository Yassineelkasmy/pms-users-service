import { ResetPasswordRequest } from "src/sessions/dto/reset_password_reqeuest.dto";

export class ResetPasswordCommand {
    constructor(public readonly resetPasswordRequest: ResetPasswordRequest) {}
}