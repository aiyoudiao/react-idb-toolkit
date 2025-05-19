// 模拟 IndexedDB
import "fake-indexeddb/auto";

import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useIndexedDB } from "../src/toolkit";

const DB_NAME = "HookDB";
const STORE_NAME = "HookStore";

describe("useIndexedDB hook", () => {
  test("should initialize and perform basic CRUD", async () => {
    const { result } = renderHook(() =>
      useIndexedDB({ dbName: DB_NAME, storeNames: [STORE_NAME] })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await result.current.setItem(STORE_NAME, "user1", { name: "Bob" });

    const user = await result.current.getItem<{ name: string }>(
      STORE_NAME,
      "user1"
    );
    expect(user).toEqual({ name: "Bob" });

    await result.current.deleteItem(STORE_NAME, "user1");
    const deleted = await result.current.getItem(STORE_NAME, "user1");
    expect(deleted).toBeUndefined();
  });

  test("should clear the store", async () => {
    const { result } = renderHook(() =>
      useIndexedDB({ dbName: DB_NAME, storeNames: [STORE_NAME] })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await result.current.setItem(STORE_NAME, "a", 1);
    await result.current.setItem(STORE_NAME, "b", 2);

    await result.current.clear(STORE_NAME);

    const all = await result.current.getAll(STORE_NAME);
    expect(all).toEqual([]);
  });

  test("should return all keys", async () => {
    const { result } = renderHook(() =>
      useIndexedDB({ dbName: DB_NAME, storeNames: [STORE_NAME] })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await result.current.setItem(STORE_NAME, "x1", "hello");
    await result.current.setItem(STORE_NAME, "x2", "world");

    const keys = await result.current.keys(STORE_NAME);
    expect(keys?.sort()).toEqual(["x1", "x2"]);
  });

  test("should handle options change", async () => {
    const { result, rerender } = renderHook((props) => useIndexedDB(props), {
      initialProps: { dbName: DB_NAME, storeNames: [STORE_NAME] },
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    // 更改配置
    const newOptions = {
      ...{ dbName: DB_NAME, storeNames: [STORE_NAME] },
      dbName: "NewHookDB",
    };
    rerender(newOptions);

    // 验证新数据库初始化
    await waitFor(() => expect(result.current.loading).toBe(false));
    await result.current.setItem(STORE_NAME, "key1", "value1");
    const value = await result.current.getItem<string>(STORE_NAME, "key1");
    expect(value).toBe("value1");
  });
});
