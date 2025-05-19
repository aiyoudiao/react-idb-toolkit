/**
 * @description useIndexedDB is a custom React hook that provides a simple interface for interacting with IndexedDB.
 */

import { useEffect, useState, useRef, useCallback } from "react";
import { IndexedDBHelper, IndexedDBOptions } from "./IndexedDBHelper";

export interface UseIndexedDBReturn {
  loading: boolean;
  getItem: <T>(storeName: string, key: IDBValidKey) => Promise<T | undefined>;
  setItem: <T>(storeName: string, key: IDBValidKey, value: T) => Promise<void>;
  deleteItem: (storeName: string, key: IDBValidKey) => Promise<void>;
  clear: (storeName: string) => Promise<void>;
  getAll: <T>(storeName: string) => Promise<T[] | undefined>;
  keys: (storeName: string) => Promise<IDBValidKey[] | undefined>;
}

export function useIndexedDB(options: IndexedDBOptions): UseIndexedDBReturn {
  const [loading, setLoading] = useState(true);
  const dbRef = useRef<IndexedDBHelper | null>(null);

  useEffect(() => {
    const db = new IndexedDBHelper(options);

    db.init()
      .then(() => {
        dbRef.current = db;
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to initialize IndexedDBHelper:", err);
        setLoading(false);
      });
  }, [options]);

  const getItem = useCallback(
    async <T>(storeName: string, key: IDBValidKey): Promise<T | undefined> => {
      if (!dbRef.current) return;

      return await dbRef.current.getItem(storeName, key);
    },
    [loading, dbRef.current]
  );

  const setItem = useCallback(
    async <T>(storeName: string, key: IDBValidKey, value: T) => {
      if (!dbRef.current) return;

      await dbRef.current.setItem(storeName, key, value);
    },
    [loading, dbRef.current]
  );

  const deleteItem = useCallback(
    async (storeName: string, key: IDBValidKey) => {
      if (!dbRef.current) return;

      await dbRef.current.deleteItem(storeName, key);
    },
    [loading, dbRef.current]
  );

  const clear = useCallback(
    async (storeName: string) => {
      if (!dbRef.current) return;

      await dbRef.current.clear(storeName);
    },
    [loading, dbRef.current]
  );

  const getAll = useCallback(
    async <T>(storeName: string): Promise<T[] | undefined> => {
      if (!dbRef.current) return;

      return await dbRef.current.getAll(storeName);
    },
    [loading, dbRef.current]
  );

  const keys = useCallback(
    async (storeName: string): Promise<IDBValidKey[] | undefined> => {
      if (!dbRef.current) return;

      return await dbRef.current.keys(storeName);
    },
    [loading, dbRef.current]
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
