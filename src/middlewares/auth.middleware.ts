import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from 'src/utils/jwt.utils';
import { get } from 'lodash';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
//   constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    
      
      const {access_token , refresh_token} = req.signedCookies['auth-cookie']
    
      if (!access_token) {
        return next();
      }
    
      const { decoded, expired } = verifyJwt(access_token);
    
      if (decoded) {
        res.locals.user = decoded;
        return next();
      }
    
    //   if (expired && refreshToken) {
    //     const newAccessToken = await reIssueAccessToken({ refreshToken });
    
    //     if (newAccessToken) {
    //       res.setHeader("x-access-token", newAccessToken);
    //     }
    
    //     const result = verifyJwt(newAccessToken as string);
    
    //     res.locals.user = result.decoded;
    //     return next();
    //   }

    
    
      return next();
  }
}