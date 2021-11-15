import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserVerifiedEvent } from 'src/users/events/user-verified.event';
import { UserEntityRepository } from '../db/user_entity.repository';

@EventsHandler(UserVerifiedEvent)
export class CreateUserProfileAvatarHandler
  implements IEventHandler<UserVerifiedEvent>
{
  constructor(private readonly userEntityRepo: UserEntityRepository) {}

  async handle(userVerifiedEvent: UserVerifiedEvent) {
    const { userId } = userVerifiedEvent;
    const user = await this.userEntityRepo.findOneById(userId);
    if (user) {
      //TODO: Create the user avatar image and store it in the users avatars folder
    }
  }
}
