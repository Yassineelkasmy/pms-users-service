import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserDtoRepository } from "src/users/db/user_dto.repository";
import { UserProfileQuery } from "./user_profile.query";

@QueryHandler(UserProfileQuery)
export class UserProfileHandler implements IQueryHandler<UserProfileQuery> {
    constructor(private readonly userDtoRepository: UserDtoRepository){}
    async execute(userProfileQuery: UserProfileQuery): Promise<any> {
        const {userId} = userProfileQuery;

        const user = await this.userDtoRepository.findOneById(userId);

        return user;
        
    }

}