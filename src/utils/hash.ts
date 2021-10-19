import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export async function hashPassword(password:string ) : Promise<string> {

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    return result;
}

export async function verifyPassword(userPassword:string , password:string ): Promise<boolean>{

    const [salt, storedHash] = userPassword.split(".");
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return hash.toString('hex') == storedHash;
}   