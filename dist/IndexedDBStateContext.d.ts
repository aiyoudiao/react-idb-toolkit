import React from "react";
export interface IndexedDBStateProviderProps {
    storeName: string;
    children: React.ReactNode;
}
export declare function IndexedDBStateProvider({ storeName, children, }: IndexedDBStateProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useIndexedDBStateContext<T>(key: IDBValidKey, defaultValue?: T): readonly [any, (newValue: T) => void, boolean];
