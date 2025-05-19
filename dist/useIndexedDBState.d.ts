/// <reference types="react" />
export interface UseIndexedDBStateOptions<T> {
    storeName: string;
    key: IDBValidKey;
    defaultValue?: T | (() => T);
    onError?: (error: Error) => void;
}
export declare function useIndexedDBState<T>(options: UseIndexedDBStateOptions<T>): readonly [T, import("react").Dispatch<import("react").SetStateAction<T>>, {
    readonly loading: boolean;
    /** 手动同步最新数据库状态 */
    readonly sync: () => Promise<void>;
}];
