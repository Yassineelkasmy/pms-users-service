import { SendEmailVerficationHandler } from './send_email_verification.handler';
import { UserCreatedHandler } from './user_created.handler';

export const UserEventHandlers = [
  UserCreatedHandler,
  SendEmailVerficationHandler,
];
