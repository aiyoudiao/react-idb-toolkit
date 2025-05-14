import React, { useState, useEffect } from "react";
import { initIndexedDB, getIndexedDBHelper } from "@/toolkit/indexedDBUtils";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IndexedDBHelper } from "@/toolkit";


let db: IndexedDBHelper | null = null;

export default () => {
  const [key, setKey] = useState("myKey");
  const [value, setValue] = useState("Hello IndexedDB");
  const [fetched, setFetched] = useState<string | undefined>();
  const [allKeys, setAllKeys] = useState<IDBValidKey[]>([]);
  const [allValues, setAllValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initIndexedDB({
      dbName: "storybook-db",
      storeNames: ["demoStore"],
    }).then(() => {
      db = getIndexedDBHelper();
      setLoading(false);
    });
  }, []);

  const handleSet = async () => {
    await db?.setItem("demoStore", key, value);
    alert(`✅ Set "${key}" = "${value}"`);
  };

  const handleGet = async () => {
    const result = await db?.getItem<string>("demoStore", key);
    setFetched(result);
  };

  const handleDelete = async () => {
    await db?.deleteItem("demoStore", key);
    alert(`🗑️ Deleted "${key}"`);
  };

  const handleClear = async () => {
    await db?.clear("demoStore");
    alert("🧹 Cleared all entries");
  };

  const handleKeys = async () => {
    const result = await db?.keys("demoStore");
    setAllKeys(result as IDBValidKey[]);
  };

  const handleGetAll = async () => {
    const result = await db?.getAll<string>("demoStore");
    setAllValues(result as string[]);
  };

  if (loading) return <p className="text-center">Loading IndexedDB...</p>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 space-y-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-center">
          🧪 indexedDBUtils Playground
        </h2>
        <p className="text-center">
          Status: <strong>{loading ? "Loading..." : "Ready ✅"}</strong>
        </p>

        <div className="space-y-4">
          <Input
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <Input
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleSet}>💾 Set Item</Button>
            <Button onClick={handleGet}>🔍 Get Item</Button>
            <Button onClick={handleDelete}>❌ Delete Item</Button>
            <Button variant="destructive" onClick={handleClear}>
              🧹 Clear Store
            </Button>
          </div>
        </div>

        <div className="space-x-2 flex">
          <Button onClick={handleGetAll}>📦 Get All Values</Button>
          <Button onClick={handleKeys}>🗂️ Get All Keys</Button>
        </div>

        <div className="space-y-2 mt-6">
          <p>
            <strong>Fetched value:</strong>{" "}
            <span className="text-blue-700">{fetched ?? "(not found)"}</span>
          </p>
          <p>
            <strong>All keys:</strong>{" "}
            <code className="text-sm">{JSON.stringify(allKeys)}</code>
          </p>
          <p>
            <strong>All values:</strong>{" "}
            <code className="text-sm">{JSON.stringify(allValues)}</code>
          </p>
        </div>
      </Card>
    </div>
  );
};
