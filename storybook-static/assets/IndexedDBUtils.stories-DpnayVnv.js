import{j as e}from"./jsx-runtime-ClZEHPQQ.js";import{r as a}from"./index-Cqyox1Tj.js";import{a as A,C as K,I as i,B as l}from"./input-q-Q2josW.js";import"./IndexedDBContext-DjiG6O41.js";import"./IndexedDBStateContext-3CmpSJpb.js";import{t as V,T as G}from"./toaster-C0pIZr3P.js";import"./index-C2TgfdXk.js";import"./index-D-LGQApf.js";let r=null;async function b(s){return r||(r=new A(s),await r.init()),r}function L(){if(!r)throw new Error("IndexedDB is not ready yet. Please call initIndexedDB() first.");return r}const J={title:"Utils/indexedDBUtils",component:()=>null,parameters:{docs:{}}};let t=null;const o=()=>{window.alert=n=>{V({title:"Alert",description:n,duration:3e3})};const[s,y]=a.useState("myKey"),[d,h]=a.useState("Hello IndexedDB"),[p,g]=a.useState(),[S,f]=a.useState([]),[v,N]=a.useState([]),[c,j]=a.useState(!0);a.useEffect(()=>{b({dbName:"storybook-db",storeNames:["demoStore"]}).then(()=>{t=L(),j(!1)})},[]);const B=async()=>{await(t==null?void 0:t.setItem("demoStore",s,d)),alert(`✅ Set "${s}" = "${d}"`)},I=async()=>{const n=await(t==null?void 0:t.getItem("demoStore",s));g(n)},w=async()=>{await(t==null?void 0:t.deleteItem("demoStore",s)),alert(`🗑️ Deleted "${s}"`)},C=async()=>{await(t==null?void 0:t.clear("demoStore")),alert("🧹 Cleared all entries")},k=async()=>{const n=await(t==null?void 0:t.keys("demoStore"));f(n)},D=async()=>{const n=await(t==null?void 0:t.getAll("demoStore"));N(n)};return c?e.jsx("p",{className:"text-center",children:"Loading IndexedDB..."}):e.jsxs("div",{className:"flex items-center justify-center h-screen bg-gray-100",children:[e.jsx(G,{}),e.jsxs(K,{className:"p-6 space-y-6 max-w-xl mx-auto bg-white rounded-xl shadow-md",children:[e.jsx("h2",{className:"text-xl font-semibold text-center",children:"🧪 indexedDBUtils Playground"}),e.jsxs("p",{className:"text-center",children:["Status: ",e.jsx("strong",{children:c?"Loading...":"Ready ✅"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{placeholder:"Key",value:s,onChange:n=>y(n.target.value)}),e.jsx(i,{placeholder:"Value",value:d,onChange:n=>h(n.target.value)}),e.jsxs("div",{className:"flex gap-2 flex-wrap",children:[e.jsx(l,{onClick:B,children:"💾 Set Item"}),e.jsx(l,{onClick:I,children:"🔍 Get Item"}),e.jsx(l,{onClick:w,children:"❌ Delete Item"}),e.jsx(l,{variant:"destructive",onClick:C,children:"🧹 Clear Store"})]})]}),e.jsxs("div",{className:"space-x-2 flex",children:[e.jsx(l,{onClick:D,children:"📦 Get All Values"}),e.jsx(l,{onClick:k,children:"🗂️ Get All Keys"})]}),e.jsxs("div",{className:"space-y-2 mt-6",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Fetched value:"})," ",e.jsx("span",{className:"text-blue-700",children:p??"(not found)"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"All keys:"})," ",e.jsx("code",{className:"text-sm",children:JSON.stringify(S)})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"All values:"})," ",e.jsx("code",{className:"text-sm",children:JSON.stringify(v)})]})]})]})]})};o.__docgenInfo={description:"",methods:[],displayName:"Playground"};var u,m,x;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initIndexedDB({
      dbName: "storybook-db",
      storeNames: ["demoStore"]
    }).then(() => {
      db = getIndexedDBHelper();
      setLoading(false);
    });
  }, []);
  const handleSet = async () => {
    await db?.setItem("demoStore", key, value);
    alert(\`✅ Set "\${key}" = "\${value}"\`);
  };
  const handleGet = async () => {
    const result = await db?.getItem<string>("demoStore", key);
    setFetched(result);
  };
  const handleDelete = async () => {
    await db?.deleteItem("demoStore", key);
    alert(\`🗑️ Deleted "\${key}"\`);
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
  return <div className="flex items-center justify-center h-screen bg-gray-100">\r
      <Toaster />\r
      <Card className="p-6 space-y-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">\r
        <h2 className="text-xl font-semibold text-center">\r
          🧪 indexedDBUtils Playground\r
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
}`,...(x=(m=o.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};const R=["Playground"];export{o as Playground,R as __namedExportsOrder,J as default};
