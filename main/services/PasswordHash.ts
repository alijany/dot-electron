import PasswordHash from "../contract/utilities/PasswordHash";
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

export default class $PasswordHash extends PasswordHash {

    private keyLength = 64;


    private saltLength = 16;


    public async hash(password: string) {
        const $scrypt = promisify<string, string, number, Buffer>(scrypt)
        const salt = randomBytes(this.saltLength).toString("binary");
        const derivedKey = await $scrypt(password, salt, this.keyLength);
        return salt + derivedKey.toString('binary');
    }


    public async verify(password: string, hash: string) {
        const $scrypt = promisify<string, string, number, Buffer>(scrypt);
        const salt = hash.slice(0, this.saltLength);
        const encrypted = Buffer.from(hash.slice(this.saltLength), "binary");
        const derivedKey = await $scrypt(password, salt, this.keyLength);
        return timingSafeEqual(encrypted, derivedKey)
    }
}