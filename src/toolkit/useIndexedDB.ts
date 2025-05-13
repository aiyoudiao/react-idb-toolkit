/**
 * @description useIndexedDB is a custom React hook that provides a simple interface for interacting with IndexedDB.
 */

import { useEffect, useState, useMemo } from "react";
import { IndexedDBHelper, IndexedDBOptions } from "./IndexedDBHelper";

export interface UseIndexedDBReturn {
  loading: boolean;
  getItem: <T>(storeName: string, key: IDBValidKey) => Promise<T | undefined>;
  setItem: <T>(storeName: string, key: IDBValidKey, value: T) => Promise<void>;
  deleteItem: (storeName: string, key: IDBValidKey) => Promise<void>;
  clear: (storeName: string) => Promise<void>;
  getAll: <T>(storeName: string) => Promise<T[]>;
  keys: (storeName: string) => Promise<IDBValidKey[]>;
}

export function useIndexedDB(options: IndexedDBOptions): UseIndexedDBReturn {
  const [loading, setLoading] = useState(true);

  const dbHelper = useMemo(
    () => new IndexedDBHelper(options),
    [options.dbName, options.version, options.storeNames]
  );

  useEffect(() => {
    dbHelper
      .init()
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Failed to initialize IndexedDBHelper:", err);
        setLoading(false);
      });
  }, [dbHelper]);

  return {
    loading,
    getItem: dbHelper.getItem.bind(dbHelper),
    setItem: dbHelper.setItem.bind(dbHelper),
    deleteItem: dbHelper.deleteItem.bind(dbHelper),
    clear: dbHelper.clear.bind(dbHelper),
    getAll: dbHelper.getAll.bind(dbHelper),
    keys: dbHelper.keys.bind(dbHelper),
  };
}
