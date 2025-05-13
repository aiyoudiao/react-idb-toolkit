import 'fake-indexeddb/auto';
import '@testing-library/jest-dom';

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import {
  IndexedDBProvider,
  useIndexedDBContext,
} from '../src/toolkit';
import type { IndexedDBOptions } from '../src/toolkit';

const options: IndexedDBOptions = {
  dbName: 'TestDBContext',
  version: 1,
  storeNames: ['users'],
};

const TestComponent = () => {
  const { loading, setItem, getItem } = useIndexedDBContext();

  const [value, setValue] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!loading) {
      setItem('users', 'user1', 'Tom').then(() => {
        getItem<string>('users', 'user1').then((result) => {
          setValue(result ?? 'No Value');
        });
      });
    }
  }, [loading]);

  if (loading) return <div>Loading...</div>;

  return <div data-testid="user-value">User: {value}</div>;
};

describe('IndexedDBContext integration', () => {
  beforeEach(() => {
    indexedDB.deleteDatabase('TestDBContext'); // 保证每次测试干净
  });

  it('should render child and use context to write/read indexedDB', async () => {
    render(
      <IndexedDBProvider options={options}>
        <TestComponent />
      </IndexedDBProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId('user-value')).toHaveTextContent('User: Tom')
    );
  });

  it('should throw error when useIndexedDBContext is called outside provider', () => {
    // 屏蔽 React 报错日志
    const original = console.error;
    console.error = vi.fn();

    const BadComponent = () => {
      useIndexedDBContext();
      return <div />;
    };

    expect(() => render(<BadComponent />)).toThrowError(
      /useIndexedDBContext must be used within an IndexedDBProvider/
    );

    console.error = original;
  });
});
