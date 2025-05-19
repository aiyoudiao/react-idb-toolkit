import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { IndexedDBHelper } from "./IndexedDBHelper";

export interface IndexedDBStateProviderProps {
  storeName: string;
  children: React.ReactNode;
}

interface IndexedDBStateContextValue {
  setItem: (key: IDBValidKey, value: any) => Promise<void>;
  getItem: (key: IDBValidKey) => Promise<any | undefined>;
  deleteItem: (key: IDBValidKey) => Promise<void>;
  clear: () => Promise<void>;
  getAll: () => Promise<any[] | undefined>;
  keys: () => Promise<IDBValidKey[] | undefined>;
  loading: boolean;
  states: Record<string, any>;
  setStates: (states: Record<string, any>) => void;
}

const IndexedDBStateContext = createContext<IndexedDBStateContextValue | null>(null);

export function IndexedDBStateProvider({
  storeName,
  children,
}: IndexedDBStateProviderProps) {
  const [states, setStates] = useState<Record<string, any>>({});
  const dbRef = useRef<IndexedDBHelper | null>(null);
  const [loading, setLoading] = useState(true);

  // 初始化数据库
  useEffect(() => {
    const db = new IndexedDBHelper({
      dbName: storeName,
      storeNames: [storeName],
    });

    db.init().then(() => {
      dbRef.current = db;
      setLoading(false);
    });
  }, [storeName]);

  const getItem = useCallback(
    async (key: IDBValidKey): Promise<any[] | undefined> => {
      if (!dbRef.current) return;

      return await dbRef.current.getItem(storeName, key);
    },
    [dbRef.current, storeName, loading]
  );

  const setItem = useCallback(
    async (key: IDBValidKey, value: any) => {
      if (!dbRef.current) return;

      await dbRef.current.setItem(storeName, key, value);
    },
    [dbRef.current, storeName, loading]
  );

  const deleteItem = useCallback(
    async (key: IDBValidKey) => {
      if (!dbRef.current) return;

      await dbRef.current.deleteItem(storeName, key);
    },
    [dbRef.current, storeName, loading]
  );

  const clear = useCallback(
    async () => {
      if (!dbRef.current) return;

      await dbRef.current.clear(storeName);
    },
    [dbRef.current, storeName, loading]
  );

  const getAll = useCallback(
    async () => {
      if (!dbRef.current) return;

      return await dbRef.current.getAll(storeName);
    },
    [dbRef.current, storeName, loading]
  );

  const keys = useCallback(
    async (): Promise<IDBValidKey[] | undefined> => {
      if (!dbRef.current) return;

      return await dbRef.current.keys(storeName);
    },
    [dbRef.current, storeName, loading]
  );

  return (
    <IndexedDBStateContext.Provider
      value={{
        setItem,
        getItem,
        deleteItem,
        clear,
        getAll,
        keys,
        loading,
        states,
        setStates,
      }}
    >
      {children}
    </IndexedDBStateContext.Provider>
  );
}

export function useIndexedDBStateContext<T>(
  key: IDBValidKey,
  defaultValue?: T
) {
  const context = useContext(IndexedDBStateContext);
  const { states, setStates } = context || {};

  useEffect(() => {
    if (context?.loading) return;

    context?.getItem(key).then((value) => {
      if (value !== undefined) {
        setStates?.((prevStates: any) => ({ ...prevStates, [key as string]: value }));
      } else {
        if (defaultValue === undefined) return;
        setStates?.((prevStates: any) => ({ ...prevStates, [key as string]: defaultValue }));
        context?.setItem(key, defaultValue);
      }
    });
  }, [context?.loading, key]);

  const updateValue = useCallback(
    (newValue: T) => {
      context?.setItem(key, newValue);
      setStates?.((prevStates: any) => ({ ...prevStates, [key as string]: newValue }));
    },
    [context, key]
  );

  return [states?.[key as string] ?? defaultValue, updateValue, context?.loading ?? true] as const;
}
