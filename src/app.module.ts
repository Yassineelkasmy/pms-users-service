import { Module } from '@nestjs/common';
import { CampersModule } from './campers/campers.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CampersModule, DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
