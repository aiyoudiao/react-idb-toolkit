import{j as e}from"./jsx-runtime-ClZEHPQQ.js";import{r as m}from"./index-Cqyox1Tj.js";import{u as b,T as D,t as w}from"./toaster-C0pIZr3P.js";import{C as j,I as E,B as x}from"./input-q-Q2josW.js";import"./index-C2TgfdXk.js";import"./index-D-LGQApf.js";function I(o){const{storeName:t,key:s,defaultValue:r,onError:l=n=>console.error("IndexedDB Error:",n)}=o,{loading:p,getItem:g,setItem:f}=b({dbName:t,storeNames:[t]}),[i,u]=m.useState(()=>typeof r=="function"?r():r),[k,S]=m.useState(!0);m.useEffect(()=>{if(p)return;(async()=>{try{const a=await g(t,s);a!==void 0?u(a):r!==void 0&&await f(t,s,i)}catch(a){l(a)}finally{S(!1)}})()},[p]);const V=m.useCallback(async n=>{try{const a=n instanceof Function?n(i):n;u(a),await f(t,s,a)}catch(a){l(a),u(i)}},[t,s,f,i]);return[i,V,{loading:p||k,sync:async()=>{try{const n=await g(t,s);n!==void 0&&u(n)}catch(n){l(n)}}}]}const T={title:"Hooks/useIndexedDBState",component:()=>null,parameters:{docs:{}}},c=()=>{const[o,t,{loading:s}]=I({storeName:"demoStore",key:"storybook-key",defaultValue:"Hello IndexedDB"}),r=()=>{w({title:"Current Value",description:o,duration:3e3})};return e.jsxs("div",{className:"flex items-center justify-center h-screen bg-gray-100",children:[e.jsx(D,{}),e.jsxs(j,{className:"p-6 space-y-4 max-w-md w-full",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Basic Usage"}),e.jsxs("p",{children:["Status: ",s?"Loading...":"Ready"]}),e.jsx(E,{value:o||"",onChange:l=>t(l.target.value),disabled:s}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(x,{onClick:r,children:"Show Current Value"}),e.jsx(x,{variant:"destructive",onClick:()=>t("Hello IndexedDB"),children:"Reset"})]})]})]})},d=()=>{const[o,t,{loading:s}]=I({storeName:"demoStore",key:"counter",defaultValue:0});return e.jsx("div",{className:"flex items-center justify-center h-screen bg-gray-100",children:e.jsxs(j,{className:"p-6 text-center space-y-4",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Persistent Counter"}),e.jsx("p",{className:"text-4xl font-bold",children:s?"...":o}),e.jsxs("div",{className:"flex gap-2 justify-center",children:[e.jsx(x,{onClick:()=>t(r=>r+1),children:"Increment"}),e.jsx(x,{variant:"outline",onClick:()=>t(0),children:"Reset"})]})]})})};c.__docgenInfo={description:"",methods:[],displayName:"BasicUsage"};d.__docgenInfo={description:"",methods:[],displayName:"CounterExample"};var h,y,C;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const [value, setValue, {
    loading
  }] = useIndexedDBState<string>({
    storeName: "demoStore",
    key: "storybook-key",
    defaultValue: "Hello IndexedDB"
  });
  const handleAlert = () => {
    toast({
      title: "Current Value",
      description: value,
      duration: 3000
    });
  };
  return <div className="flex items-center justify-center h-screen bg-gray-100">\r
      <Toaster />\r
      <Card className="p-6 space-y-4 max-w-md w-full">\r
        <h2 className="text-xl font-semibold">Basic Usage</h2>\r
        <p>Status: {loading ? "Loading..." : "Ready"}</p>\r
        <Input value={value || ""} onChange={e => setValue(e.target.value)} disabled={loading} />\r
        <div className="flex gap-2">\r
          <Button onClick={handleAlert}>\r
            Show Current Value\r
          </Button>\r
          <Button variant="destructive" onClick={() => setValue("Hello IndexedDB")}>\r
            Reset\r
          </Button>\r
        </div>\r
      </Card>\r
    </div>;
}`,...(C=(y=c.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var v,B,N;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const [count, setCount, {
    loading
  }] = useIndexedDBState<number>({
    storeName: "demoStore",
    key: "counter",
    defaultValue: 0
  });
  return <div className="flex items-center justify-center h-screen bg-gray-100">\r
      <Card className="p-6 text-center space-y-4">\r
        <h2 className="text-xl font-semibold">Persistent Counter</h2>\r
        <p className="text-4xl font-bold">{loading ? "..." : count}</p>\r
        <div className="flex gap-2 justify-center">\r
          <Button onClick={() => setCount(c => c + 1)}>\r
            Increment\r
          </Button>\r
          <Button variant="outline" onClick={() => setCount(0)}>\r
            Reset\r
          </Button>\r
        </div>\r
      </Card>\r
    </div>;
}`,...(N=(B=d.parameters)==null?void 0:B.docs)==null?void 0:N.source}}};const L=["BasicUsage","CounterExample"];export{c as BasicUsage,d as CounterExample,L as __namedExportsOrder,T as default};
