export default interface Authorizable {

    can(...params: any[]): Promise<boolean>;

}