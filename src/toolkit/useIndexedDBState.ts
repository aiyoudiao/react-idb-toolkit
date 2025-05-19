import { useState, useEffect, useCallback } from "react";
import { useIndexedDB } from "./useIndexedDB"; // 修改为实际的路径

export interface UseIndexedDBStateOptions<T> {
  storeName: string;
  key: IDBValidKey;
  defaultValue?: T | (() => T);
  onError?: (error: Error) => void;
}

export function useIndexedDBState<T>(options: UseIndexedDBStateOptions<T>) {
  const {
    storeName,
    key,
    defaultValue,
    onError = (error) => console.error("IndexedDB Error:", error),
  } = options;

  const { loading, getItem, setItem } = useIndexedDB({
    dbName: storeName,
    storeNames: [storeName],
  });

  const [state, setState] = useState<T>(() => {
    const resolvedValue =
      typeof defaultValue === "function"
        ? (defaultValue as () => T)()
        : defaultValue;

    return resolvedValue as T;
  });

  const [isInitializing, setIsInitializing] = useState(true);

  // 初始化状态
  useEffect(() => {
    if (loading) return; // 如果数据库还在加载中，则不执行初始化

    const initialize = async () => {
      try {
        const storedValue = await getItem<T>(storeName, key);

        if (storedValue !== undefined) {
          setState(storedValue);
        } else if (defaultValue !== undefined) {
          // 如果没找到存储值且存在默认值，则初始化存储
          await setItem(storeName, key, state);
        }
      } catch (error) {
        onError(error as Error);
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, [loading]); // 只在初始化完成后运行

  // 状态同步方法
  const setDBState = useCallback<React.Dispatch<React.SetStateAction<T>>>(
    async (value) => {
      try {
        const newValue = value instanceof Function ? value(state) : value;

        // 先更新本地状态
        setState(newValue);

        // 异步更新数据库
        await setItem(storeName, key, newValue);
      } catch (error) {
        onError(error as Error);
        // 回滚到之前的状态
        setState(state);
      }
    },
    [storeName, key, setItem, state]
  );

  return [
    state,
    setDBState,
    {
      loading: loading || isInitializing,
      /** 手动同步最新数据库状态 */
      sync: async () => {
        try {
          const storedValue = await getItem<T>(storeName, key);
          if (storedValue !== undefined) setState(storedValue);
        } catch (error) {
          onError(error as Error);
        }
      },
    },
  ] as const;
}
