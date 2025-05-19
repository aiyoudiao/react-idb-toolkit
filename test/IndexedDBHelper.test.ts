// 模拟 IndexedDB
import "fake-indexeddb/auto";

import { describe, it, beforeEach, expect, beforeAll } from "vitest";
import { IndexedDBHelper, IndexedDBOptions } from "../src/toolkit";

const DB_NAME = "TestDB";
const STORE = "TestStore";

const dbOptions: IndexedDBOptions = {
  dbName: DB_NAME,
  version: 1,
  storeNames: [STORE],
};

let dbHelper: IndexedDBHelper;

beforeEach(async () => {
  dbHelper = new IndexedDBHelper(dbOptions);
  await dbHelper.init();

  await dbHelper.clear(STORE);
});

describe("IndexedDBHelper", () => {
  it("should set and get an item", async () => {
    await dbHelper.setItem(STORE, "1", { name: "Alice" });
    const result = await dbHelper.getItem<{ name: string }>(STORE, "1");
    expect(result).toEqual({ name: "Alice" });
  });

  it("should return undefined for non-existing key", async () => {
    const result = await dbHelper.getItem(STORE, "not-exist");
    expect(result).toBeUndefined();
  });

  it("should delete an item", async () => {
    await dbHelper.setItem(STORE, "2", { name: "Bob" });
    await dbHelper.deleteItem(STORE, "2");
    const result = await dbHelper.getItem(STORE, "2");
    expect(result).toBeUndefined();
  });

  it("should clear all items in the store", async () => {
    await dbHelper.setItem(STORE, "1", { name: "User1" });
    await dbHelper.setItem(STORE, "2", { name: "User2" });
    await dbHelper.clear(STORE);
    const allItems = await dbHelper.getAll(STORE);
    expect(allItems).toEqual([]);
  });

  it("should get all items", async () => {
    await dbHelper.setItem(STORE, "1", { name: "A" });
    await dbHelper.setItem(STORE, "2", { name: "B" });
    const result = await dbHelper.getAll<{ name: string }>(STORE);
    expect(result).toEqual([{ name: "A" }, { name: "B" }]);
  });

  it("should get all keys", async () => {
    await dbHelper.setItem(STORE, "key1", { data: 123 });
    await dbHelper.setItem(STORE, "key2", { data: 456 });
    const keys = await dbHelper.keys(STORE);
    expect(keys).toContain("key1");
    expect(keys).toContain("key2");
    expect(keys.length).toBe(2);
  });

  it("should throw error if init is not called before operation", async () => {
    const newHelper = new IndexedDBHelper(dbOptions);
    await expect(newHelper.getItem(STORE, "1")).rejects.toThrowError(
      /init\(\) first/
    );
  });
});
