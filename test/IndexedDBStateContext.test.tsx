import 'fake-indexeddb/auto';
import { renderHook, waitFor } from '@testing-library/react';
import { IndexedDBStateProvider, useIndexedDBStateContext } from '../src/toolkit/IndexedDBStateContext';
import { describe, test, expect } from 'vitest';

describe('IndexedDBStateContext', () => {

  const storeName = 'testStore';

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <IndexedDBStateProvider storeName={storeName}>
      {children}
    </IndexedDBStateProvider>
  );

  test('should share state between hooks', async () => {

    // 两个 hook 的使用放在同一个 provider 中，可共享状态
    const { result } = renderHook(
      () => [
        useIndexedDBStateContext<string>('key1', 'default'),
        useIndexedDBStateContext<string>('key1'),
      ],
      { wrapper }
    );

    // 等待初始化完成
    await waitFor(() => expect(result.current[0][2]).toBe(false));
    await waitFor(() => expect(result.current[1][2]).toBe(false));

    // 通过第一个hook更新值
    result.current[0][1]('updated');

    // 验证第二个hook同步更新
    await waitFor(() => {
      expect(result.current[0][0]).toBe('updated');
      expect(result.current[1][0]).toBe('updated');
    });
  });

  test('should handle multiple keys', async () => {
    const { result: result1 } = renderHook(
      () => useIndexedDBStateContext<string>('test-key1', 'default'),
      { wrapper }
    );

    const { result: result2 } = renderHook(
      () => useIndexedDBStateContext<number>('test-key2', 0),
      { wrapper }
    );
    // 等待初始化完成
    await waitFor(() => expect(result1.current[2]).toBe(false));
    await waitFor(() => expect(result2.current[2]).toBe(false));


    await waitFor(() => {
      expect(result1.current[0]).toBe('default');
      expect(result2.current[0]).toBe(0);
    });

    // 更新不同键值
    result1.current[1]('new-value');
    result2.current[1](42);

    await waitFor(() => {
      expect(result1.current[0]).toBe('new-value');
      expect(result2.current[0]).toBe(42);
    });
  });
});
