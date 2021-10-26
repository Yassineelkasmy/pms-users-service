import { CreateSessionHandler } from "./create_session/create_session.handler";
import { ForgotPasswordHandler } from "./forgot_password/forgot_password.handler";
import { ReIssueAccessTokenHandler } from "./reissue_access_token/reissue_access_token.handler";
import { ResetPasswordHandler } from "./reset_password/reset_password.handler";
import { VerifyUserHandler } from "./verify_user/verify_user.handler";

export const UserSessionCommandHandlers = [
    CreateSessionHandler,
    ReIssueAccessTokenHandler,
    VerifyUserHandler,
    ForgotPasswordHandler,
    ResetPasswordHandler,
];