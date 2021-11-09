import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";

@Injectable()
export class RequireUserMiddleWare implements NestMiddleware{
    async use(req: Request, res: Response, next: NextFunction) {
        
        //@ts-ignore
        const user = req.user;

        if (!user) {
          throw new UnauthorizedException("access_token_expired");
        }
      
        next();
      }
      

}
