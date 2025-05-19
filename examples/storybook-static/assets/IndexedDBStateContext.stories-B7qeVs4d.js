import{j as e}from"./jsx-runtime-ClZEHPQQ.js";import{I as u,u as r}from"./IndexedDBStateContext-3CmpSJpb.js";import{C as a,I as h,B as C}from"./input-q-Q2josW.js";import"./index-Cqyox1Tj.js";const I={title:"Context/IndexedDBStateContext",component:()=>null,parameters:{docs:{}}},j=()=>{const[t,o]=r("demoKey","default");return e.jsxs(a,{className:"p-4 space-y-4",children:[e.jsx(h,{value:t,onChange:c=>o(c.target.value)}),e.jsxs("p",{children:["Current value: ",t]})]})},s=()=>e.jsx(u,{storeName:"context-store",children:e.jsx("div",{className:"flex items-center justify-center h-screen bg-gray-100",children:e.jsxs(a,{className:"p-6 space-y-6 max-w-md w-full",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Context Demo"}),e.jsx(j,{})]})})}),y=()=>{const[t,o]=r("sharedText","123");return e.jsx(h,{value:t,onChange:c=>o(c.target.value)})},f=()=>{const[t]=r("sharedText","");return e.jsx(a,{className:"p-4 min-h-[100px]",children:t||"Start typing..."})},g=()=>{const[,t]=r("sharedText");return e.jsx(C,{variant:"outline",onClick:()=>t(""),children:"Clear Content"})},n=()=>e.jsx(u,{storeName:"shared-store",children:e.jsx("div",{className:"flex items-center justify-center h-screen bg-gray-100",children:e.jsxs(a,{className:"p-6 space-y-4 max-w-xl w-full",children:[e.jsx("h2",{className:"text-xl font-semibold",children:"Real-time Sync Demo"}),e.jsx(y,{}),e.jsx(f,{}),e.jsx(g,{})]})})});s.__docgenInfo={description:"",methods:[],displayName:"SingleContextUsage"};n.__docgenInfo={description:"",methods:[],displayName:"MultiComponentSync"};var d,l,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`() => <IndexedDBStateProvider storeName="context-store">\r
    <div className="flex items-center justify-center h-screen bg-gray-100">\r
      <Card className="p-6 space-y-6 max-w-md w-full">\r
        <h2 className="text-xl font-semibold">Context Demo</h2>\r
        <DemoComponent />\r
      </Card>\r
    </div>\r
  </IndexedDBStateProvider>`,...(m=(l=s.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var i,x,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  return <IndexedDBStateProvider storeName="shared-store">\r
      <div className="flex items-center justify-center h-screen bg-gray-100">\r
        <Card className="p-6 space-y-4 max-w-xl w-full">\r
          <h2 className="text-xl font-semibold">Real-time Sync Demo</h2>\r
          <Editor />\r
          <Preview />\r
          <MultiComponentSyncComponent />\r
        </Card>\r
      </div>\r
    </IndexedDBStateProvider>;
}`,...(p=(x=n.parameters)==null?void 0:x.docs)==null?void 0:p.source}}};const w=["SingleContextUsage","MultiComponentSync"];export{n as MultiComponentSync,s as SingleContextUsage,w as __namedExportsOrder,I as default};
