import{j as e}from"./jsx-runtime-ClZEHPQQ.js";import{r as a}from"./index-Cqyox1Tj.js";import{t as V,u as G,T as $}from"./toaster-C0pIZr3P.js";import{C as F,I as d,B as s}from"./input-q-Q2josW.js";import"./IndexedDBContext-DjiG6O41.js";import"./IndexedDBStateContext-3CmpSJpb.js";import"./index-C2TgfdXk.js";import"./index-D-LGQApf.js";const T={title:"Hooks/useIndexedDB",component:()=>null,parameters:{docs:{}}},l=()=>{window.alert=t=>{V({title:"Alert",description:t,duration:3e3})};const[n,u]=a.useState("myKey"),[r,x]=a.useState("Hello IndexedDB"),[h,y]=a.useState(),[g,p]=a.useState([]),[v,S]=a.useState([]),{loading:o,setItem:N,getItem:j,deleteItem:k,getAll:I,keys:f,clear:C}=G({dbName:"storybook-db",storeNames:["demoStore"]}),B=async()=>{await N("demoStore",n,r),alert(`✅ Set "${n}" = "${r}"`)},w=async()=>{const t=await j("demoStore",n);y(t)},A=async()=>{await k("demoStore",n),alert(`🗑️ Deleted "${n}"`)},K=async()=>{const t=await I("demoStore");S(t)},D=async()=>{const t=await f("demoStore");p(t)},b=async()=>{await C("demoStore"),alert("🧹 Cleared all entries")};return o?e.jsx("p",{className:"text-center",children:"Loading IndexedDB..."}):e.jsxs("div",{className:"flex items-center justify-center h-screen bg-gray-100",style:{height:"100vh"},children:[e.jsx($,{}),e.jsxs(F,{className:"p-6 space-y-6 max-w-xl mx-auto bg-white rounded-xl shadow-md",children:[e.jsx("h2",{className:"text-xl font-semibold text-center",children:"🧪 useIndexedDB Playground"}),e.jsxs("p",{className:"text-center",children:["Status: ",e.jsx("strong",{children:o?"Loading...":"Ready ✅"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(d,{placeholder:"Key",value:n,onChange:t=>u(t.target.value)}),e.jsx(d,{placeholder:"Value",value:r,onChange:t=>x(t.target.value)}),e.jsxs("div",{className:"flex gap-2 flex-wrap",children:[e.jsx(s,{onClick:B,children:"💾 Set Item"}),e.jsx(s,{onClick:w,children:"🔍 Get Item"}),e.jsx(s,{onClick:A,children:"❌ Delete Item"}),e.jsx(s,{variant:"destructive",onClick:b,children:"🧹 Clear Store"})]})]}),e.jsxs("div",{className:"space-x-2 flex",children:[e.jsx(s,{onClick:K,children:"📦 Get All Values"}),e.jsx(s,{onClick:D,children:"🗂️ Get All Keys"})]}),e.jsxs("div",{className:"space-y-2 mt-6",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Fetched value:"})," ",e.jsx("span",{className:"text-blue-700",children:h??"(not found)"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"All keys:"})," ",e.jsx("code",{className:"text-sm",children:JSON.stringify(g)})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"All values:"})," ",e.jsx("code",{className:"text-sm",children:JSON.stringify(v)})]})]})]})]})};l.__docgenInfo={description:"",methods:[],displayName:"Playground"};var c,i,m;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  window.alert = (message: string) => {
    toast({
      title: "Alert",
      description: message,
      duration: 3000
    });
  };
  const [key, setKey] = useState("myKey");
  const [value, setValue] = useState("Hello IndexedDB");
  const [fetched, setFetched] = useState<string | undefined>();
  const [allKeys, setAllKeys] = useState<IDBValidKey[]>([]);
  const [allValues, setAllValues] = useState<string[]>([]);
  const {
    loading,
    setItem,
    getItem,
    deleteItem,
    getAll,
    keys,
    clear
  } = useIndexedDB({
    dbName: "storybook-db",
    storeNames: ["demoStore"]
  });
  const handleSet = async () => {
    await setItem("demoStore", key, value);
    alert(\`✅ Set "\${key}" = "\${value}"\`);
  };
  const handleGet = async () => {
    const result = await getItem<string>("demoStore", key);
    setFetched(result);
  };
  const handleDelete = async () => {
    await deleteItem("demoStore", key);
    alert(\`🗑️ Deleted "\${key}"\`);
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
  return <div className="flex items-center justify-center h-screen bg-gray-100" style={{
    height: "100vh"
  }}>\r
      <Toaster />\r
      <Card className="p-6 space-y-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">\r
        <h2 className="text-xl font-semibold text-center">\r
          🧪 useIndexedDB Playground\r
        </h2>\r
        <p className="text-center">\r
          Status: <strong>{loading ? "Loading..." : "Ready ✅"}</strong>\r
        </p>\r
\r
        <div className="space-y-4">\r
          <Input placeholder="Key" value={key} onChange={e => setKey(e.target.value)} />\r
          <Input placeholder="Value" value={value} onChange={e => setValue(e.target.value)} />\r
          <div className="flex gap-2 flex-wrap">\r
            <Button onClick={handleSet}>💾 Set Item</Button>\r
            <Button onClick={handleGet}>🔍 Get Item</Button>\r
            <Button onClick={handleDelete}>❌ Delete Item</Button>\r
            <Button variant="destructive" onClick={handleClear}>\r
              🧹 Clear Store\r
            </Button>\r
          </div>\r
        </div>\r
\r
        <div className="space-x-2 flex">\r
          <Button onClick={handleGetAll}>📦 Get All Values</Button>\r
          <Button onClick={handleKeys}>🗂️ Get All Keys</Button>\r
        </div>\r
\r
        <div className="space-y-2 mt-6">\r
          <p>\r
            <strong>Fetched value:</strong>{" "}\r
            <span className="text-blue-700">{fetched ?? "(not found)"}</span>\r
          </p>\r
          <p>\r
            <strong>All keys:</strong>{" "}\r
            <code className="text-sm">{JSON.stringify(allKeys)}</code>\r
          </p>\r
          <p>\r
            <strong>All values:</strong>{" "}\r
            <code className="text-sm">{JSON.stringify(allValues)}</code>\r
          </p>\r
        </div>\r
      </Card>\r
    </div>;
}`,...(m=(i=l.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const U=["Playground"];export{l as Playground,U as __namedExportsOrder,T as default};
