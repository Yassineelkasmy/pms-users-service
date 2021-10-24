import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from 'src/utils/jwt.utils';
import { get } from 'lodash';


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    
      if(req.signedCookies['auth-cookie'])
      {
        const {access_token , refresh_token} = req.signedCookies['auth-cookie'];
        if (!access_token) {
          next();
        }
       else{
        const { decoded, expired } = verifyJwt(access_token);
        if (decoded) {
          // @ts-ignore
          req.user = decoded;
          next();
        }
       }
      }
      
    
     
    
     
      else {
        next();
      }
    
    //   if (expired && refreshToken) {
    //     const newAccessToken = await reIssueAccessToken({ refreshToken });
    
    //     if (newAccessToken) {
    //       res.setHeader("x-access-token", newAccessToken);
    //     }
    
    //     const result = verifyJwt(newAccessToken as string);
    
    //     res.locals.user = result.decoded;
    //     next();
    //   }

    
    
  }
