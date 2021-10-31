import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://yassine:yassine@cluster0.qztsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/pms')],
})
export class DatabaseModule {}
