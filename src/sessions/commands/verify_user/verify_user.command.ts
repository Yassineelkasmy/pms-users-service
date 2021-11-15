import { VerifyUserRequest } from 'src/sessions/dto/verify_user.request';

export class VerifyUserCommand {
  constructor(public readonly verifyUserReqeuest: VerifyUserRequest) {}
}

