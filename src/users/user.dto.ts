import { UserSchema } from "./db/user.schema";

export class UserDto {
    readonly username:string;
    readonly email:string;
    readonly phone:string;
    readonly company:string;
    readonly active:boolean;
    readonly verified:boolean;
    readonly createdAt:string;

    static fromRepository(user: UserSchema) : UserDto {
        const userDto :UserDto = {
            username:user.username,
            email:user.email, 
            phone:user.phone, 
            active:user.active, 
            company:user.company, 
            verified:user.verified,
            createdAt: user.createdAt.toISOString(),

        }; 
        return userDto; 
    }
}