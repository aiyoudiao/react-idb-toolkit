// 模拟 IndexedDB
import "fake-indexeddb/auto";

import { describe, it, beforeEach, expect, beforeAll } from "vitest";
import { IndexedDBHelper, IndexedDBOptions } from "../src/toolkit";

const dbOptions: IndexedDBOptions = {
  dbName: "TestDB",
  version: 1,
  storeNames: ["users"],
};

let dbHelper: IndexedDBHelper;

beforeEach(async () => {
  dbHelper = new IndexedDBHelper(dbOptions);
  await dbHelper.init();

  await dbHelper.clear("users");
});

describe("IndexedDBHelper", () => {
  it("should set and get an item", async () => {
    await dbHelper.setItem("users", "1", { name: "Alice" });
    const result = await dbHelper.getItem<{ name: string }>("users", "1");
    expect(result).toEqual({ name: "Alice" });
  });

  it("should return undefined for non-existing key", async () => {
    const result = await dbHelper.getItem("users", "not-exist");
    expect(result).toBeUndefined();
  });

  it("should delete an item", async () => {
    await dbHelper.setItem("users", "2", { name: "Bob" });
    await dbHelper.deleteItem("users", "2");
    const result = await dbHelper.getItem("users", "2");
    expect(result).toBeUndefined();
  });

  it("should clear all items in the store", async () => {
    await dbHelper.setItem("users", "1", { name: "User1" });
    await dbHelper.setItem("users", "2", { name: "User2" });
    await dbHelper.clear("users");
    const allItems = await dbHelper.getAll("users");
    expect(allItems).toEqual([]);
  });

  it("should get all items", async () => {
    await dbHelper.setItem("users", "1", { name: "A" });
    await dbHelper.setItem("users", "2", { name: "B" });
    const result = await dbHelper.getAll<{ name: string }>("users");
    expect(result).toEqual([{ name: "A" }, { name: "B" }]);
  });

  it("should get all keys", async () => {
    await dbHelper.setItem("users", "key1", { data: 123 });
    await dbHelper.setItem("users", "key2", { data: 456 });
    const keys = await dbHelper.keys("users");
    expect(keys).toContain("key1");
    expect(keys).toContain("key2");
    expect(keys.length).toBe(2);
  });

  it("should throw error if init is not called before operation", async () => {
    const newHelper = new IndexedDBHelper(dbOptions);
    await expect(newHelper.getItem("users", "1")).rejects.toThrowError(
      /init\(\) first/
    );
  });
});
