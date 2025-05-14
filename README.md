# 🚀 react-idb-toolkit

[简体中文](./README.CN.md) | [English](./README.md)

> ⚛️ Elegant and easy-to-use React toolkit for managing local data with IndexedDB, powered by [idb](https://github.com/jakearchibald/idb).  
> A lightweight, simple React hook for storing structured data in the browser via IndexedDB. Supports multiple store initialization, common CRUD operations (`get/set/delete/clear`), with full TypeScript support and test cases.

![npm](https://img.shields.io/npm/v/react-idb-toolkit?color=blue)
![license](https://img.shields.io/github/license/aiyoudiao/react-idb-toolkit)
![issues](https://img.shields.io/github/issues/aiyoudiao/react-idb-toolkit)
![stars](https://img.shields.io/github/stars/aiyoudiao/react-idb-toolkit)


[Visit Example](https://aiyoudiao.github.io/react-idb-toolkit/demo-dist/index.html) |
[Visit Storybook Example](https://aiyoudiao.github.io/react-idb-toolkit/storybook-static/index.html)

<p align="center">
    <img src="./source/20250512-192509.gif" alt="Logo" height="400px" >
    <img src="./source/20250513-180221.jpg" alt="Logo" height="500px" >
</p>

---

## 📦 Installation

```bash
npm install react-idb-toolkit
# or
yarn add react-idb-toolkit
```

---

## ✨ Features

* ✅ Simple API powered by [`idb`](https://www.npmjs.com/package/idb)
* 🔁 Automatically creates multiple object stores
* 🧪 Built-in unit tests with Vitest
* 📖 Interactive Storybook Playground
* 🧠 Fully based on React Hooks with type inference and generics
* 📦 Zero external dependencies (except for `idb`)

---

## 🛠️ Hook Usage

```tsx
import { useIndexedDB } from 'react-idb-toolkit';

const { loading, setItem, getItem, deleteItem, clear, getAll, keys } = useIndexedDB({
  dbName: 'myDatabase',
  storeNames: ['myStore'],
});

useEffect(() => {
  if (!loading) {
    setItem('myStore', 'userName', 'demo');
  }
}, [loading]);
```

### ⚙️ Hook Options

```ts
interface UseIndexedDBOptions {
  dbName: string;       // Database name
  version?: number;     // Database version, default is 1
  storeNames: string[]; // List of object store names
}
```

### 📦 Hook Return Values

```ts
interface UseIndexedDBReturn {
  loading: boolean; // Indicates if DB is still initializing
  getItem<T>(store, key): Promise<T | undefined>;
  setItem<T>(store, key, value): Promise<void>;
  deleteItem(store, key): Promise<void>;
  clear(store): Promise<void>;
  getAll<T>(store): Promise<T[]>;
  keys(store): Promise<IDBValidKey[]>;
}
```



## 🛠️ Context Usage

```tsx
import { IndexedDBProvider } from 'react-idb-toolkit';

<IndexedDBProvider
  options={{
    dbName: "storybook-db",
    storeNames: ["demoStore"],
  }}
>
  <PlaygroundContent />
</IndexedDBProvider>
```


```tsx
import { useIndexedDBContext } from 'react-idb-toolkit';

const { loading, setItem, getItem, deleteItem, getAll, keys, clear } =
  useIndexedDBContext();

useEffect(() => {
  if (!loading) {
    setItem('demoStore', 'userName', 'demo');
  }
}, [loading]);
```

### ⚙️ Provider Options

```ts
interface IndexedDBOptions {
  dbName: string;       // Database name
  version?: number;     // Database version, default is 1
  storeNames: string[]; // List of object store names
}

interface IndexedDBProviderProps {
  children: ReactNode;
  options: IndexedDBOptions;
}
```

### 📦 Context Return Values

```ts
interface UseIndexedDBReturn {
  loading: boolean; //  Indicates if DB is still initializing
  getItem<T>(store, key): Promise<T | undefined>;
  setItem<T>(store, key, value): Promise<void>;
  deleteItem(store, key): Promise<void>;
  clear(store): Promise<void>;
  getAll<T>(store): Promise<T[]>;
  keys(store): Promise<IDBValidKey[]>;
}
```


## 🛠️ Utils Usage


```tsx
import { initIndexedDB, getIndexedDBHelper } from "./toolkit";

let db: IndexedDBHelper | null = null;


useEffect(() => {
  initIndexedDB({
    dbName: "storybook-db",
    storeNames: ["demoStore"],
  }).then(() => {
    db = getIndexedDBHelper();
    const { setItem, getItem, deleteItem, clear, getAll, keys } = db;
    setItem("demoStore", "userName", "demo");
  });
}, []);

```

### ⚙️ initIndexedDB Options

```ts
interface IndexedDBOptions {
  dbName: string;       // Database name
  version?: number;     // Database version, default is 1
  storeNames: string[]; // List of object store names
}

```

### 📦 getIndexedDBHelper Return Values

```ts
interface UseIndexedDBReturn {
  loading: boolean; //  Indicates if DB is still initializing
  getItem<T>(store, key): Promise<T | undefined>;
  setItem<T>(store, key, value): Promise<void>;
  deleteItem(store, key): Promise<void>;
  clear(store): Promise<void>;
  getAll<T>(store): Promise<T[]>;
  keys(store): Promise<IDBValidKey[]>;
}
```



---

## 🧪 Testing

Tests are written using [Vitest](https://vitest.dev), with `fake-indexeddb` to simulate browser environment:

```bash
npm test
```

Covered test cases include:

* Data insertion, retrieval, deletion, and clearing
* Fetching all keys and values
* Error handling when DB is not initialized

---

## 📖 Storybook Playground

Start an interactive Storybook playground with:

```bash
npm run storybook
```

You can:

* Add key/value data manually
* View all keys and values
* Delete or clear data
* Observe dynamic hints and state updates

Perfect for debugging and demos.

---

## 🔧 Local Development

```bash
git clone https://github.com/aiyoudiao/react-idb-toolkit.git
cd react-idb-toolkit
npm install

# Run tests
npm test

# Start Storybook
npm run storybook
```

<p align="center">
    <img src="./source/20250513-115715.jpg" alt="Logo" height="350px" >
    <img src="./source/20250513-124855.jpg" alt="Logo" height="500px" >
</p>


---

## 📄 License

MIT License © [aiyoudiao](https://github.com/aiyoudiao)

---

## 💬 Acknowledgements

* [idb](https://github.com/jakearchibald/idb): A modern IndexedDB wrapper
* [fake-indexeddb](https://github.com/dumbmatter/fakeIndexedDB): Mock IndexedDB implementation for Node.js
* [Vitest](https://vitest.dev/): A fast and modern unit testing framework
* [Storybook](https://storybook.js.org/): Tool for building UI component demos interactively

---

Made with ❤️ using [idb](https://github.com/jakearchibald/idb) and [React](https://reactjs.org/)
