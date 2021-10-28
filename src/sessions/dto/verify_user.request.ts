import { IsNotEmpty, IsString } from "class-validator";

export class VerifyUserRequest {
    
    @IsString()
    @IsNotEmpty()
    token: string;
}