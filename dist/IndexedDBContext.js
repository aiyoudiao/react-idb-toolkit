/**
 * @description IndexedDBContext is a React context provider for managing IndexedDB operations.
 */

import React, { createContext, useContext } from "react";
import { useIndexedDB } from "./useIndexedDB";
import { jsx as _jsx } from "react/jsx-runtime";
var IndexedDBContext = /*#__PURE__*/createContext(null);
export var IndexedDBProvider = function IndexedDBProvider(_ref) {
  var options = _ref.options,
    children = _ref.children;
  var db = useIndexedDB(options);
  return /*#__PURE__*/_jsx(IndexedDBContext.Provider, {
    value: db,
    children: children
  });
};
export var useIndexedDBContext = function useIndexedDBContext() {
  var context = useContext(IndexedDBContext);
  if (!context) {
    throw new Error("useIndexedDBContext must be used within an IndexedDBProvider");
  }
  return context;
};