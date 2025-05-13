/**
 * @description IndexedDBContext is a React context provider for managing IndexedDB operations.
 */
import React, { ReactNode } from "react";
import { UseIndexedDBReturn } from "./useIndexedDB";
import { IndexedDBOptions } from "./IndexedDBHelper";
export interface IndexedDBProviderProps {
    children: ReactNode;
    options: IndexedDBOptions;
}
export declare const IndexedDBProvider: React.FC<IndexedDBProviderProps>;
export declare const useIndexedDBContext: () => UseIndexedDBReturn;
