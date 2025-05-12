import { openDB, IDBPDatabase } from "idb";
import { useEffect, useState, useCallback } from "react";

export interface UseIndexedDBOptions {
  dbName: string;
  version?: number;
  storeNames: string[];
}

export interface UseIndexedDBReturn {
  loading: boolean;
  getItem: <T>(storeName: string, key: IDBValidKey) => Promise<T | undefined>;
  setItem: <T>(storeName: string, key: IDBValidKey, value: T) => Promise<void>;
  deleteItem: (storeName: string, key: IDBValidKey) => Promise<void>;
  clear: (storeName: string) => Promise<void>;
  getAll: <T>(storeName: string) => Promise<T[]>;
  keys: (storeName: string) => Promise<IDBValidKey[]>;
}

export function useIndexedDB(options: UseIndexedDBOptions): UseIndexedDBReturn {
  const { dbName, storeNames, version = 1 } = options;
  const [db, setDb] = useState<IDBPDatabase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDB = async () => {
      const dbInstance = await openDB(dbName, version, {
        upgrade(db) {
          for (const storeName of storeNames) {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName);
            }
          }
        },
      });
      setDb(dbInstance);
      setLoading(false);
    };

    initDB().catch(console.error);
  }, [dbName, version, storeNames]);

  const ensureReady = () => {
    if (!db) throw new Error("IndexedDB is not ready yet.");
  };

  const getItem = useCallback(
    async <T>(storeName: string, key: IDBValidKey): Promise<T | undefined> => {
      ensureReady();
      return await db!.get(storeName, key);
    },
    [db]
  );

  const setItem = useCallback(
    async <T>(storeName: string, key: IDBValidKey, value: T) => {
      ensureReady();
      await db!.put(storeName, value, key);
    },
    [db]
  );

  const deleteItem = useCallback(
    async (storeName: string, key: IDBValidKey) => {
      ensureReady();
      await db!.delete(storeName, key);
    },
    [db]
  );

  const clear = useCallback(
    async (storeName: string) => {
      ensureReady();
      await db!.clear(storeName);
    },
    [db]
  );

  const getAll = useCallback(
    async <T>(storeName: string): Promise<T[]> => {
      ensureReady();
      return await db!.getAll(storeName);
    },
    [db]
  );

  const keys = useCallback(
    async (storeName: string): Promise<IDBValidKey[]> => {
      ensureReady();
      return await db!.getAllKeys(storeName);
    },
    [db]
  );

  return {
    loading,
    getItem,
    setItem,
    deleteItem,
    clear,
    getAll,
    keys,
  };
}
