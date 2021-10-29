// import { Injectable } from "@nestjs/common";
// import { EntityFactory } from "src/database/entity.factory";
// import { VerificationTokenEntityRepository } from "./db/verification_token/verification_token_entity.repository";
// import { VerificationToken } from "./VerificationToken";

// @Injectable()
// export class VerificationTokenFactory implements EntityFactory<VerificationToken> {
//     constructor(private readonly verificationTokenEntityRepository:VerificationTokenEntityRepository) {}
//     async create( userEmail: string , type:string): VerificationToken | Promise<VerificationToken> {
//         const vTokens = await this.verificationTokenEntityRepository.findByUserEmailAndType(userEmail,type);

//         if(vTokens.length) {
//             await this.verificationTokenEntityRepository.
//         }
//     }
// }