import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "../user.dto";
import { ObjectId } from 'mongodb';
import { UserSchema } from "./user.schema";

@Injectable()
export class UserDtoRepository{
    constructor(
        @InjectModel(UserSchema.name)
        private readonly userModel : Model<UserSchema>
    ){}

    async findAll() :Promise<UserDto[]> {
    const users =await  this.userModel.find({}, {}, { lean: true });
       const usersDtos =  users.map(user => {
           const userDto= UserDto.fromRepository(user);
           return userDto;
       });
    return usersDtos;
    }

    async findOneById(id:string) :Promise<UserDto> {
        const user = await this.userModel.findById( new ObjectId(id));
        if(!user) throw new NotFoundException("user_not_found");
        const userDto = UserDto.fromRepository(user);

        return userDto;
         
    }
}

