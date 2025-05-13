// 模拟 IndexedDB
import "fake-indexeddb/auto";

import { describe, it, beforeEach, expect } from "vitest";
import {
  initIndexedDB,
  getIndexedDBHelper,
  IndexedDBOptions,
} from "../src/toolkit";
import { __setDBNull } from "../src/toolkit/indexedDBUtils";

const options: IndexedDBOptions = {
  dbName: "TestUtilsDB",
  version: 1,
  storeNames: ["products"],
};

describe("IndexedDBUtils", () => {
  beforeEach(() => {
    // 每次都重新加载模块（重置单例）
    __setDBNull();
  });

  it("should initialize IndexedDB and return helper instance", async () => {
    const helper = await initIndexedDB(options);
    expect(helper).toBeDefined();
    expect(typeof helper.getItem).toBe("function");
  });

  it("should throw error if getIndexedDBHelper is called before init", () => {
    expect(() => getIndexedDBHelper()).toThrowError(
      "IndexedDB is not ready yet. Please call initIndexedDB() first."
    );
  });

  it("should return the same instance on multiple init calls", async () => {
    const first = await initIndexedDB(options);
    const second = await initIndexedDB(options);
    expect(first).toBe(second);
  });

  it("should return the same instance from getIndexedDBHelper after init", async () => {
    const initialized = await initIndexedDB(options);
    const helper = getIndexedDBHelper();
    expect(helper).toBe(initialized);
  });
});
