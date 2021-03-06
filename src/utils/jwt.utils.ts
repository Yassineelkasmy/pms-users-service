import * as jwt from 'jsonwebtoken'; // We must import it this way cuz nestjs has custom TS Settings
import config from 'config/default';

const privateKey = config.privateKey;
const publicKey = config.publicKey;
const verificationPrivateKey = config.verificationPrivateKey;
const verificationPublicKey = config.verificationPublicKey;
const passwordRecoverPrivateKey = config.passwordRecoverPrivateKey;
const passwordRecoverPublicKeyKey = config.passwordRecoverPublicKey;

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
    // console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}

export function signEmailVerificationJwt(object: Object, options) : string {
  

  return jwt.sign(object, verificationPrivateKey, {
    ...options,
    algorithm: "RS256",
  });
}


export function verifyEmailVerificationJwt(token: string) {
  try {
    const decoded = jwt.verify(token, verificationPublicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    // console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }

}


export function signRecoverPasswordVerificationJwt(object: Object, options) : string {
  

  return jwt.sign(object, passwordRecoverPrivateKey , {
    ...options,
    algorithm: "RS256",
  });
}


export function verifyRecoverPasswprdVerificationJwt(token: string) {
  try {
    const decoded = jwt.verify(token, passwordRecoverPublicKeyKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    // console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
