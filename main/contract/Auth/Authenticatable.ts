export default interface Authenticatable {

    id: string | number;

    password: string;

    getToken(): Promise<string>;

    setToken(): any;
    
}