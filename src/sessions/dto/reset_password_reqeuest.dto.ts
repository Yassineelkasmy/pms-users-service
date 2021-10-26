import {IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ResetPasswordRequest {
    
    @IsString()
    @IsNotEmpty()
    token:string;
    @MinLength(8)
    @MaxLength(30)
    password:string;
}