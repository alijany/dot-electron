export default abstract class PasswordHash {

    public abstract hash(password: string): string | Promise<string>

    public abstract verify(
        password: string,
        hash: string
    ): boolean | Promise<boolean>;
}