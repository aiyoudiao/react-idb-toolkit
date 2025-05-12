import React, { useState } from "react";
import type { Meta } from "@storybook/react";
import { useIndexedDB } from "./useIndexedDB";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default {
  title: "Hooks/useIndexedDB",
  component: () => null,
} satisfies Meta;

export const Playground = () => {
  const [key, setKey] = useState("myKey");
  const [value, setValue] = useState("Hello IndexedDB");
  const [fetched, setFetched] = useState<string | undefined>();
  const [allKeys, setAllKeys] = useState<IDBValidKey[]>([]);
  const [allValues, setAllValues] = useState<string[]>([]);

  const { loading, setItem, getItem, deleteItem, getAll, keys, clear } =
    useIndexedDB({
      dbName: "storybook-db",
      storeNames: ["demoStore"],
    });

  const handleSet = async () => {
    await setItem("demoStore", key, value);
    alert(`✅ Set "${key}" = "${value}"`);
  };

  const handleGet = async () => {
    const result = await getItem("demoStore", key);
    setFetched(result);
  };

  const handleDelete = async () => {
    await deleteItem("demoStore", key);
    alert(`🗑️ Deleted "${key}"`);
  };

  const handleGetAll = async () => {
    const values = await getAll<string>("demoStore");
    setAllValues(values);
  };

  const handleKeys = async () => {
    const k = await keys("demoStore");
    setAllKeys(k);
  };

  const handleClear = async () => {
    await clear("demoStore");
    alert("🧹 Cleared all entries");
  };

  if (loading) return <p className="text-center">Loading IndexedDB...</p>;

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100"
      style={{ height: "100vh" }}
    >
      <Card className="p-6 space-y-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-center">
          🧪 useIndexedDB Playground
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
