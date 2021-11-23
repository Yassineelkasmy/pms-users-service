import { EntityFactory } from 'src/database/entity.factory';
import { User } from './User';
import { ObjectId } from 'mongodb';
import { UserCreatedEvent } from './events/user_created.event';
import { UserEntityRepository } from './db/user_entity.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/utils/hash';

@Injectable()
export class UserFactory implements EntityFactory<User> {
  constructor(private readonly userEntityRepository: UserEntityRepository) {}
  async create(
    username: string,
    email: string,
    phone: string,
    password: string,
    company: string,
  ): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const user = new User(
      new ObjectId().toHexString(),
      username,
      email,
      phone,
      hashedPassword,
      company,
      false,
      true,
    );
    const [checkUser] = await this.userEntityRepository.findOneByEmail(email);
    if (checkUser) {
      if (!checkUser.isVerified()) {
        await this.userEntityRepository.deleteOneById(checkUser.getId());
        await this.userEntityRepository.create(user);
        user.apply(new UserCreatedEvent(user.getId(), user.getEmail()));
        return user;
      } else {
        throw new ConflictException('email already used');
      }
    } else {
      await this.userEntityRepository.create(user);
      user.apply(new UserCreatedEvent(user.getId(), user.getEmail()));
      return user;
    }
  }
}
