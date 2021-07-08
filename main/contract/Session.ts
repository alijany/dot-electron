export default abstract class Session<Type> {

    // Get all of the session data.
    public abstract all(): Record<string, Type>;

    // Checks if a key is present 
    public abstract has(key: string): boolean;

    // Get an item from the session.
    public abstract get(key: string, $default?: Type): Type | undefined;

    // Put a value in the session and return its key.
    public abstract add(value: Type): string;

    // Remove an item from the session.
    public abstract remove(key: string): void;

    // Remove all of the items from the session.
    public abstract flush(): void;

    // Start the session, reading the data from a handler.
    public abstract read(): Promise<void>;

    // Save the session data to storage.
    public abstract save(): Promise<void>;

}