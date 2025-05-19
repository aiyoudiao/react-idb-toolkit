import { useState } from "react";
import type { Meta } from "@storybook/react";
import { IndexedDBProvider, useIndexedDBContext } from "./toolkit";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "./hooks/use-toast";
import { Toaster } from "./components/ui/toaster";

export default {
  title: "Context/IndexedDBContext",
  component: () => null,
  parameters: {
    docs: {}
  }
} satisfies Meta;

const PlaygroundContent = () => {
  window.alert = (message: string) => {
    toast({
      title: "Alert",
      description: message,
      duration: 3000,
    });
  }
  const [key, setKey] = useState("myKey");
  const [value, setValue] = useState("Hello Context");
  const [fetched, setFetched] = useState<string | undefined>();
  const [allKeys, setAllKeys] = useState<IDBValidKey[]>([]);
  const [allValues, setAllValues] = useState<string[]>([]);

  const { loading, setItem, getItem, deleteItem, getAll, keys, clear } =
    useIndexedDBContext();

  const handleSet = async () => {
    await setItem("demoStore", key, value);
    alert(`✅ Set "${key}" = "${value}"`);
  };

  const handleGet = async () => {
    const result = await getItem<string>("demoStore", key);
    setFetched(result);
  };

  const handleDelete = async () => {
    await deleteItem("demoStore", key);
    alert(`🗑️ Deleted "${key}"`);
  };

  const handleClear = async () => {
    await clear("demoStore");
    alert("🧹 Cleared all entries");
  };

  const handleKeys = async () => {
    const result = await keys("demoStore");
    setAllKeys(result);
  };

  const handleGetAll = async () => {
    const result = await getAll<string>("demoStore");
    setAllValues(result);
  };

  if (loading) return <p className="text-center">Loading IndexedDB...</p>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Toaster />
      <Card className="p-6 space-y-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-center">🔌 Context Playground</h2>
        <p className="text-center">
          Status: <strong>{loading ? "Loading..." : "Ready ✅"}</strong>
        </p>

        <div className="space-y-4">
          <Input placeholder="Key" value={key} onChange={(e) => setKey(e.target.value)} />
          <Input placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} />
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

export const Playground = () => (
  <IndexedDBProvider
    options={{
      dbName: "storybook-db",
      storeNames: ["demoStore"],
    }}
  >
    <PlaygroundContent />
  </IndexedDBProvider>
);
