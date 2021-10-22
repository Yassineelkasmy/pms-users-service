import * as jwt from 'jsonwebtoken'; // We must import it this way cuz nestjs has custom TS Settings
import config from 'config/default';

const privateKey = config.privateKey;
const publicKey = config.publicKey;

export function signJwt(object: Object, options) : string {
  

  return jwt.sign(object, privateKey, {
    ...options,
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}