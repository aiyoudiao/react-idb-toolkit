// 模拟 IndexedDB
import "fake-indexeddb/auto";

import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useIndexedDB } from "../src/useIndexedDB";

const DB_NAME = "TestDB";
const STORE_NAME = "testStore";

describe("useIndexedDB hook", () => {
  beforeEach(() => {
    // 每次测试前清除数据库
    indexedDB.deleteDatabase(DB_NAME);
  });

  test("should initialize and set/get/delete/clear data correctly", async () => {
    const { result } = renderHook(() =>
      useIndexedDB({
        dbName: DB_NAME,
        storeNames: [STORE_NAME],
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // 设置一个 key
    await result.current.setItem(STORE_NAME, "foo", "bar");

    // 获取 key
    let value: string | undefined;
    value = await result.current.getItem(STORE_NAME, "foo");
    expect(value).toBe("bar");

    // 获取所有 key
    let all: string[] = [];
    all = await result.current.getAll(STORE_NAME);
    expect(all).toEqual(["bar"]);

    // 获取 keys
    let keys: IDBValidKey[] = [];
    keys = await result.current.keys(STORE_NAME);
    expect(keys).toContain("foo");

    // 删除 key
    await result.current.deleteItem(STORE_NAME, "foo");

    // 确保已删除
    let deletedValue: string | undefined;
    deletedValue = await result.current.getItem(STORE_NAME, "foo");
    expect(deletedValue).toBeUndefined();

    // 清空测试
    await result.current.setItem(STORE_NAME, "a", 1);
    await result.current.setItem(STORE_NAME, "b", 2);
    await result.current.clear(STORE_NAME);

    let cleared: number[] = [];
    cleared = await result.current.getAll(STORE_NAME);
    expect(cleared).toHaveLength(0);
  });

  test("should throw error if used before DB is ready", async () => {
    const { result } = renderHook(() =>
      useIndexedDB({
        dbName: DB_NAME,
        storeNames: [STORE_NAME],
      })
    );

    // 在初始化完成前调用方法会抛错
    await expect(result.current.getItem(STORE_NAME, "any")).rejects.toThrow(
      "IndexedDB is not ready yet."
    );
  });
});
