import { IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateSessionRequest {
    @IsEmail()
    email:string;

    @MinLength(8)
    @MaxLength(30)
    password:string;
}