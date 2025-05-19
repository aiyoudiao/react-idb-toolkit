import React from "react";
import {
  HashRouter  as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  LoaderCircle,
  Tally1Icon,
  Tally2,
  Tally3,
  Tally4,
  Tally5,
} from "lucide-react";

import { Toaster } from "@/components/ui/toaster"

import "@/index.css";
import { useToast } from "@/hooks/use-toast";


const items = [
  {
    title: "IndexedDBContext",
    url: "/IndexedDBContext",
    icon: <Tally1Icon className="h-4 w-4" />,
  },
  {
    title: "IndexedDBUtils",
    url: "/IndexedDBUtils",
    icon: <Tally2 className="h-4 w-4" />,
  },
  {
    title: "UseIndexedDB",
    url: "/UseIndexedDB",
    icon: <Tally3 className="h-4 w-4" />,
  },
  {
    title: "IndexedDBStateContext",
    url: "/IndexedDBStateContext",
    icon: <Tally4 className="h-4 w-4" />,
  },
  {
    title: "UseIndexedDBState",
    url: "/UseIndexedDBState",
    icon: <Tally5 className="h-4 w-4" />,
  },
];

// 使用 React.lazy 来懒加载 Home 和 Chat 组件
const IndexedDBContext = lazy(() => import("./features/IndexedDBContext"));
const IndexedDBUtils = lazy(() => import("./features/IndexedDBUtils"));
const UseIndexedDB = lazy(() => import("./features/UseIndexedDB"));
const IndexedDBStateContext = lazy(() => import("./features/IndexedDBStateContext"));
const UseIndexedDBState = lazy(() => import("./features/UseIndexedDBState"));

const LoadingScreen = () => (
  <div
    className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
    style={{
      width: "calc(100vw - 256px)",
      height: "100vh",
    }}
  >
    <LoaderCircle className="h-16 w-16 animate-spin text-gray-800 dark:text-gray-200" />
    <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Loading...</p>
  </div>
);

const App = () => {
  const location = useLocation();
  const isActive = (to: string) => location.pathname === to;
  const { toast } = useToast();
  window.alert = (message: string) => {
    toast({
      title: "Alert",
      description: message,
      duration: 3000,
    });
  }


  return (
    <SidebarProvider>
      <main className="flex h-screen w-screen">
        <Collapsible
          defaultOpen
          className="group/collapsible"
          style={{ width: 200 }}
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <h2 className="text-base font-semibold">Demo</h2>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.url}
                          className={`flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100`}
                          style={{
                            backgroundColor: isActive(item.url) ? "#e2e8f0" : "transparent",
                            fontWeight: isActive(item.url) ? "600" : "normal",
                          }}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Suspense fallback={<LoadingScreen />}>
          <section
            style={{
              width: "calc(100vw - 256px)",
              height: "100vh",
            }}
          >
            <Routes>
              <Route index element={<Navigate to="IndexedDBContext" />} />
              <Route path={`IndexedDBContext`} element={<IndexedDBContext />} />
              <Route path={`IndexedDBUtils`} element={<IndexedDBUtils />} />
              <Route path={`UseIndexedDB`} element={<UseIndexedDB />} />
              <Route path={`IndexedDBStateContext`} element={<IndexedDBStateContext />} />
              <Route path={`UseIndexedDBState`} element={<UseIndexedDBState />} />
            </Routes>
          </section>
        </Suspense>
      </main>
    </SidebarProvider>
  );
};

const container = document.getElementById("root")!;
const root = ReactDOM.createRoot(container);
root.render(
  // <React.StrictMode>
    <Router>
      <App />
      <Toaster />
    </Router>
  // </React.StrictMode>
);
