import {
  IndexedDBStateProvider,
  useIndexedDBStateContext,
} from "@/toolkit/IndexedDBStateContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DemoComponent = () => {
  const [value, setValue] = useIndexedDBStateContext<string>(
    "demoKey",
    "default"
  );

  return (
    <Card className="p-4 space-y-4">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>Current value: {value}</p>
    </Card>
  );
};

export const SingleContextUsage = () => (
  <IndexedDBStateProvider storeName="context-store">
    <Card className="p-6 space-y-6 max-w-md w-full">
      <h2 className="text-xl font-semibold">Context Demo</h2>
      <DemoComponent />
    </Card>
  </IndexedDBStateProvider>
);

const Editor = () => {
  const [text, setText] = useIndexedDBStateContext<string>("sharedText", "123");
  return <Input value={text} onChange={(e) => setText(e.target.value)} />;
};

const Preview = () => {
  const [text] = useIndexedDBStateContext<string>("sharedText");
  return <Card className="p-4 min-h-[100px]">{text || "Start typing..."}</Card>;
};

const MultiComponentSyncComponent: React.FC = () => {
  const [text, setText] = useIndexedDBStateContext<string>("sharedText");

  return (
    <Button variant="outline" onClick={() => setText("")}>
      Clear Content
    </Button>
  );
};

export const MultiComponentSync = () => {
  return (
    <IndexedDBStateProvider storeName="shared-store">
      <Card className="p-6 space-y-4 max-w-xl w-full">
        <h2 className="text-xl font-semibold">Real-time Sync Demo</h2>
        <Editor />
        <Preview />
        <MultiComponentSyncComponent />
      </Card>
    </IndexedDBStateProvider>
  );
};

export default () => {
  return (
    <div className="h-screen flex flex-row justify-center items-center gap-4 text-gray-100">
      <SingleContextUsage />
      <MultiComponentSync />
    </div>
  );
};
