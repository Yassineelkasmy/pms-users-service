import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserVerifiedEvent } from 'src/sessions/events/user-verified/user-verified.event';
import { UserEntityRepository } from 'src/users/db/user_entity.repository';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';
import * as fs from 'fs';
import { randomUUID } from 'crypto';

const static_files_directory = '../static';

@EventsHandler(UserVerifiedEvent)
export class CreateUserProfileAvatarHandler
  implements IEventHandler<UserVerifiedEvent>
{
  constructor(private readonly userEntityRepo: UserEntityRepository) {}

  async handle(userVerifiedEvent: UserVerifiedEvent) {
    const { userId } = userVerifiedEvent;
    const user = await this.userEntityRepo.findOneById(userId);
    if (user) {
      const imageName = randomUUID() + '.svg';
      const svg = createAvatar(style, { seed: userId });
      fs.writeFileSync(
        static_files_directory + '/profile/' + 'images/' + imageName,
        svg,
      );
      user.setProfileImage(imageName);
      await this.userEntityRepo.findOneAndReplaceById(user.getId(), user);
      //TODO: Create the user avatar image and store it in the users avatars folder
    }
  }
}
