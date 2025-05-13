/**
 * @description IndexedDBHelper is a utility class for managing IndexedDB operations.
 */

import { openDB, IDBPDatabase } from "idb";

export interface IndexedDBOptions {
  dbName: string;
  version?: number;
  storeNames: string[];
}

export class IndexedDBHelper {
  private db: IDBPDatabase | null = null;
  private options: IndexedDBOptions;

  constructor(options: IndexedDBOptions) {
    this.options = options;
  }

  async init() {
    const { dbName, version = 1, storeNames } = this.options;
    this.db = await openDB(dbName, version, {
      upgrade(db) {
        for (const storeName of storeNames) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
          }
        }
      },
    });
  }

  private ensureReady() {
    if (!this.db)
      throw new Error("IndexedDB is not ready yet. Call init() first.");
  }

  async getItem<T>(
    storeName: string,
    key: IDBValidKey
  ): Promise<T | undefined> {
    this.ensureReady();
    return await this.db!.get(storeName, key);
  }

  async setItem<T>(
    storeName: string,
    key: IDBValidKey,
    value: T
  ): Promise<void> {
    this.ensureReady();
    await this.db!.put(storeName, value, key);
  }

  async deleteItem(storeName: string, key: IDBValidKey): Promise<void> {
    this.ensureReady();
    await this.db!.delete(storeName, key);
  }

  async clear(storeName: string): Promise<void> {
    this.ensureReady();
    await this.db!.clear(storeName);
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    this.ensureReady();
    return await this.db!.getAll(storeName);
  }

  async keys(storeName: string): Promise<IDBValidKey[]> {
    this.ensureReady();
    return await this.db!.getAllKeys(storeName);
  }
}
