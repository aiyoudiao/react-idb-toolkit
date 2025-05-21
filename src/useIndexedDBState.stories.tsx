import type { Meta } from "@storybook/react";
import { useIndexedDBState } from "@/toolkit/useIndexedDBState";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

export default {
  title: "Hooks/useIndexedDBState",
  component: () => null,
  parameters: {
    docs: {}
  }
} satisfies Meta;

export const BasicUsage = () => {
  const [value, setValue, { loading }] = useIndexedDBState<string>({
    storeName: "demoStore",
    key: "storybook-key",
    defaultValue: "Hello IndexedDB"
  });

  const handleAlert = () => {
    toast({
      title: "Current Value",
      description: value,
      duration: 3000,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Toaster />
      <Card className="p-6 space-y-4 max-w-md w-full">
        <h2 className="text-xl font-semibold">Basic Usage</h2>
        <p>Status: {loading ? "Loading..." : "Ready"}</p>
        <Input
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
        />
        <Card className="p-4 overflow-auto break-words">{value}</Card>
        <div className="flex gap-2">
          <Button onClick={handleAlert}>
            Show Current Value
          </Button>
          <Button
            variant="destructive"
            onClick={() => setValue("Hello IndexedDB")}
          >
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
};

export const CounterExample = () => {
  const [count, setCount, { loading }] = useIndexedDBState<number>({
    storeName: "demoStore",
    key: "counter",
    defaultValue: 0
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 text-center space-y-4">
        <h2 className="text-xl font-semibold">Persistent Counter</h2>
        <p className="text-4xl font-bold">{loading ? "..." : count}</p>
        <div className="flex gap-2 justify-center">
          <Button onClick={() => setCount(c => c + 1)}>
            Increment
          </Button>
          <Button
            variant="outline"
            onClick={() => setCount(0)}
          >
            Reset
          </Button>
        </div>
      </Card>
    </div>
  );
};
