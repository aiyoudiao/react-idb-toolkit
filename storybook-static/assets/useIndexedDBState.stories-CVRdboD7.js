import{j as e}from"./jsx-runtime-ClZEHPQQ.js";import{r as m}from"./index-Cqyox1Tj.js";import{u as V,T as w,t as D}from"./toaster-C0pIZr3P.js";import{C as g,I as E,B as x}from"./input-q-Q2josW.js";import"./index-C2TgfdXk.js";import"./index-D-LGQApf.js";function I(o){const{storeName:t,key:s,defaultValue:r,onError:l=n=>console.error("IndexedDB Error:",n)}=o,{loading:p,getItem:h,setItem:f}=V({dbName:t,storeNames:[t]}),[i,u]=m.useState(()=>typeof r=="function"?r():r),[k,b]=m.useState(!0);m.useEffect(()=>{if(p)return;(async()=>{try{const a=await h(t,s);a!==void 0?u(a):r!==void 0&&await f(t,s,i)}catch(a){l(a)}finally{b(!1)}})()},[p]);const S=m.useCallback(async n=>{try{const a=n instanceof Function?n(i):n;u(a),await f(t,s,a)}catch(a){l(a),u(i)}},[t,s,f,i]);return[i,S,{loading:p||k,sync:async()=>{try{const n=await h(t,s);n!==void 0&&u(n)}catch(n){l(n)}}}]}const T={title:"Hooks/useIndexedDBState",component:()=>null,parameters:{docs:{}}},c=()=>{const[o,t,{loading:s}]=I({storeName:"demoStore",key:"storybook-key",defaultValue:"Hello IndexedDB"}),r=()=>{D({title:"Current Value",description:o,duration:3e3})};return e.jsxs("div",{className:"flex items-center justify-center h-screen bg-gray-100",children:[e.jsx(w,{}),e.jsxs(g,{className:"p-6 space-y-4 max-w-md w-full",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Basic Usage"}),e.jsxs("p",{children:["Status: ",s?"Loading...":"Ready"]}),e.jsx(E,{value:o||"",onChange:l=>t(l.target.value),disabled:s}),e.jsx(g,{className:"p-4 overflow-auto break-words",children:o}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(x,{onClick:r,children:"Show Current Value"}),e.jsx(x,{variant:"destructive",onClick:()=>t("Hello IndexedDB"),children:"Reset"})]})]})]})},d=()=>{const[o,t,{loading:s}]=I({storeName:"demoStore",key:"counter",defaultValue:0});return e.jsx("div",{className:"flex items-center justify-center h-screen bg-gray-100",children:e.jsxs(g,{className:"p-6 text-center space-y-4",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Persistent Counter"}),e.jsx("p",{className:"text-4xl font-bold",children:s?"...":o}),e.jsxs("div",{className:"flex gap-2 justify-center",children:[e.jsx(x,{onClick:()=>t(r=>r+1),children:"Increment"}),e.jsx(x,{variant:"outline",onClick:()=>t(0),children:"Reset"})]})]})})};c.__docgenInfo={description:"",methods:[],displayName:"BasicUsage"};d.__docgenInfo={description:"",methods:[],displayName:"CounterExample"};var y,v,C;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
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
        <Card className="p-4 overflow-auto break-words">{value}</Card>\r
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
}`,...(C=(v=c.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var N,B,j;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
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
}`,...(j=(B=d.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};const L=["BasicUsage","CounterExample"];export{c as BasicUsage,d as CounterExample,L as __namedExportsOrder,T as default};
