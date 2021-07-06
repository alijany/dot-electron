import PasswordHash from "../contract/utilities/PasswordHash";
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

export default class $PasswordHash extends PasswordHash {

    private keyLength = 100;


    public async hash(password: string) {
        const $scrypt = promisify<string, Buffer, number, Buffer>(scrypt)
        const salt = randomBytes(16);
        const derivedKey = await $scrypt(password, salt, this.keyLength)
        return Buffer.concat([salt, derivedKey]).toString();
    }


    public async verify(password: string, hash: string) {
        const $scrypt = promisify<string, Buffer, number, Buffer>(scrypt);
        const stringBuffer = Buffer.from(hash, 'hex')
        const salt = stringBuffer.slice(0, 16);
        const encrypted = stringBuffer.slice(16)
        const derivedKey = await $scrypt(password, salt, 100)
        return timingSafeEqual(encrypted, derivedKey)
    }
}