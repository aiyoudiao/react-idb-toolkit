/**
 * @description useIndexedDB is a custom React hook that provides a simple interface for interacting with IndexedDB.
 */
import { IndexedDBOptions } from "./IndexedDBHelper";
export interface UseIndexedDBReturn {
    loading: boolean;
    getItem: <T>(storeName: string, key: IDBValidKey) => Promise<T | undefined>;
    setItem: <T>(storeName: string, key: IDBValidKey, value: T) => Promise<void>;
    deleteItem: (storeName: string, key: IDBValidKey) => Promise<void>;
    clear: (storeName: string) => Promise<void>;
    getAll: <T>(storeName: string) => Promise<T[] | undefined>;
    keys: (storeName: string) => Promise<IDBValidKey[] | undefined>;
}
export declare function useIndexedDB(options: IndexedDBOptions): UseIndexedDBReturn;
