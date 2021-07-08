import { randomBytes } from 'crypto';
import User from '../contract/model/User';
import UsersSession from "../contract/UsersSession";

export default class $UsersSession extends UsersSession {

    private data: Record<string, User> = {}


    private createKey(){
        return randomBytes(16).toString("binary")
    }

    public all() {
        return this.data;
    }


    public has(key: string): boolean {
        return key in this.data
    }


    public get(key: string, $default: User) {
       if (!this.has(key)) return $default;
       else return this.data[key]
    }


    public add(value: User): string {
        const key = this.createKey();
        this.data[key] = value;
        return key
    }


    public remove(key: string) {
        delete this.data[key];
    }


    public flush(): void {
        this.data = {}
    }


    public read(): Promise<void> {
        throw new Error("Method not implemented.");
    }


    public save(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    

}