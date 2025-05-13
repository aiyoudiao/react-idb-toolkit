/**
 * @description IndexedDBUtils is a utility module for managing IndexedDB operations.
 */
import { IndexedDBHelper, IndexedDBOptions } from "./IndexedDBHelper";
/**
 * Initialize IndexedDB (make sure it is initialized only once)
 */
export declare function initIndexedDB(options: IndexedDBOptions): Promise<IndexedDBHelper>;
/**
 * Get the current IndexedDBHelper instance (must be initialized first)
 */
export declare function getIndexedDBHelper(): IndexedDBHelper;
/**
 * Set the dbHelper to null (for testing purposes)
 */
export declare function __setDBNull(): Promise<void>;
