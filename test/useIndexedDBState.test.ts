import "fake-indexeddb/auto";
import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { IndexedDBHelper, useIndexedDBState } from "../src/toolkit";

describe("useIndexedDBState", () => {
  const storeName = "testStore";

  it("should initialize with default value", async () => {
    const key = "testKey1";
    const { result } = renderHook(() =>
      useIndexedDBState({
        storeName,
        key,
        defaultValue: "default",
      })
    );

    await waitFor(() => expect(result.current[2].loading).toBe(false));
    expect(result.current[0]).toBe("default");
  });

  it("should sync with database", async () => {
    const key = "testKey2";
    const { result } = renderHook(() =>
      useIndexedDBState<string>({
        storeName,
        key,
        defaultValue: "default",
      })
    );

    // 初始状态
    await waitFor(() => expect(result.current[2].loading).toBe(false));

    // 更新状态
    result.current[1]("new-value");
    await waitFor(() => expect(result.current[0]).toBe("new-value"));

    // 重新挂载hook验证持久化
    const { result: newResult } = renderHook(() =>
      useIndexedDBState<string>({
        storeName,
        key,
      })
    );
    await waitFor(() => expect(newResult.current[0]).toBe("new-value"));
  });

  it("should handle error recovery", async () => {
    const key = "testKey3";
    // 模拟数据库错误（关闭数据库导致操作失败）
    const { result } = renderHook(() =>
      useIndexedDBState<string>({
        storeName,
        key,
        defaultValue: "default",
        onError: vi.fn(),
      })
    );

    await waitFor(() => expect(result.current[2].loading).toBe(false));

    // 清除正在使用的数据库表，从而模拟后面的报错回滚
    new IndexedDBHelper({
      dbName: storeName,
      storeNames: [storeName],
    }).__mandatoryClose([storeName]);

    result.current[1]("new-value");

    // 验证错误处理和状态回滚
    await waitFor(() => {
      expect(result.current[0]).toBe("default");
      expect(result.current[2].loading).toBe(false);
    });
  });
});
