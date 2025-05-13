/**
 * @description IndexedDBHelper is a utility class for managing IndexedDB operations.
 */
export interface IndexedDBOptions {
    dbName: string;
    version?: number;
    storeNames: string[];
}
export declare class IndexedDBHelper {
    private db;
    private options;
    constructor(options: IndexedDBOptions);
    init(): Promise<void>;
    private ensureReady;
    getItem<T>(storeName: string, key: IDBValidKey): Promise<T | undefined>;
    setItem<T>(storeName: string, key: IDBValidKey, value: T): Promise<void>;
    deleteItem(storeName: string, key: IDBValidKey): Promise<void>;
    clear(storeName: string): Promise<void>;
    getAll<T>(storeName: string): Promise<T[]>;
    keys(storeName: string): Promise<IDBValidKey[]>;
}
