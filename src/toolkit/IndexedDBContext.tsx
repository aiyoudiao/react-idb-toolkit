/**
 * @description IndexedDBContext is a React context provider for managing IndexedDB operations.
 */

import React, { createContext, useContext, ReactNode } from "react";
import { useIndexedDB, UseIndexedDBReturn } from "./useIndexedDB";
import { IndexedDBOptions } from "./IndexedDBHelper";

const IndexedDBContext = createContext<UseIndexedDBReturn | null>(null);

export interface IndexedDBProviderProps {
  children: ReactNode;
  options: IndexedDBOptions;
}

export const IndexedDBProvider: React.FC<IndexedDBProviderProps> = ({
  options,
  children,
}) => {
  const db = useIndexedDB(options);

  return (
    <IndexedDBContext.Provider value={db}>{children}</IndexedDBContext.Provider>
  );
};

export const useIndexedDBContext = (): UseIndexedDBReturn => {
  const context = useContext(IndexedDBContext);
  if (!context) {
    throw new Error(
      "useIndexedDBContext must be used within an IndexedDBProvider"
    );
  }
  return context;
};
