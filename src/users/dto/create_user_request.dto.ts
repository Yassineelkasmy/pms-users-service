import { IsEmail, IsPhoneNumber, MaxLength, MinLength } from "class-validator";

export class CreateUserRequest {
    @MinLength(8)
    @MaxLength(30)
    username:string;
    @IsEmail()
    email:string;
    @IsPhoneNumber()
    phone:string;
    @MinLength(8)
    @MaxLength(30)
    password:string;
    @MinLength(3)
    @MaxLength(30)
    company:string;

}