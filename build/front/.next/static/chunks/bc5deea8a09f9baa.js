(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,63982,e=>{"use strict";let t=(0,e.i(75254).default)("file-check-corner",[["path",{d:"M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6",key:"g5mvt7"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"m14 20 2 2 4-4",key:"15kota"}]]);e.s(["FileCheck2",()=>t],63982)},31278,e=>{"use strict";let t=(0,e.i(75254).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["Loader2",()=>t],31278)},30374,e=>{"use strict";let t,r,o;var a=e.i(43476),i=e.i(71645),n=e.i(81140),s=e.i(20783),l=e.i(30030),d=e.i(10772),c=e.i(69340),p=e.i(26330),u=e.i(65491),f=e.i(74606),m=e.i(96626),g=e.i(48425),x=e.i(3536),h=e.i(85369),w=e.i(86312),b=Symbol("radix.slottable");function v(e){return i.isValidElement(e)&&"function"==typeof e.type&&"__radixId"in e.type&&e.type.__radixId===b}var y="Dialog",[j,k]=(0,l.createContextScope)(y),[$,C]=j(y),D=e=>{let{__scopeDialog:t,children:r,open:o,defaultOpen:n,onOpenChange:s,modal:l=!0}=e,p=i.useRef(null),u=i.useRef(null),[f,m]=(0,c.useControllableState)({prop:o,defaultProp:n??!1,onChange:s,caller:y});return(0,a.jsx)($,{scope:t,triggerRef:p,contentRef:u,contentId:(0,d.useId)(),titleId:(0,d.useId)(),descriptionId:(0,d.useId)(),open:f,onOpenChange:m,onOpenToggle:i.useCallback(()=>m(e=>!e),[m]),modal:l,children:r})};D.displayName=y;var N="DialogTrigger";i.forwardRef((e,t)=>{let{__scopeDialog:r,...o}=e,i=C(N,r),l=(0,s.useComposedRefs)(t,i.triggerRef);return(0,a.jsx)(g.Primitive.button,{type:"button","aria-haspopup":"dialog","aria-expanded":i.open,"aria-controls":i.contentId,"data-state":V(i.open),...o,ref:l,onClick:(0,n.composeEventHandlers)(e.onClick,i.onOpenToggle)})}).displayName=N;var z="DialogPortal",[P,R]=j(z,{forceMount:void 0}),F=e=>{let{__scopeDialog:t,forceMount:r,children:o,container:n}=e,s=C(z,t);return(0,a.jsx)(P,{scope:t,forceMount:r,children:i.Children.map(o,e=>(0,a.jsx)(m.Presence,{present:r||s.open,children:(0,a.jsx)(f.Portal,{asChild:!0,container:n,children:e})}))})};F.displayName=z;var E="DialogOverlay",T=i.forwardRef((e,t)=>{let r=R(E,e.__scopeDialog),{forceMount:o=r.forceMount,...i}=e,n=C(E,e.__scopeDialog);return n.modal?(0,a.jsx)(m.Presence,{present:o||n.open,children:(0,a.jsx)(A,{...i,ref:t})}):null});T.displayName=E;var S=((o=i.forwardRef((e,t)=>{let{children:r,...o}=e;if(i.isValidElement(r)){var a;let e,n,l=(a=r,(n=(e=Object.getOwnPropertyDescriptor(a.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning)?a.ref:(n=(e=Object.getOwnPropertyDescriptor(a,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning)?a.props.ref:a.props.ref||a.ref),d=function(e,t){let r={...t};for(let o in t){let a=e[o],i=t[o];/^on[A-Z]/.test(o)?a&&i?r[o]=(...e)=>{let t=i(...e);return a(...e),t}:a&&(r[o]=a):"style"===o?r[o]={...a,...i}:"className"===o&&(r[o]=[a,i].filter(Boolean).join(" "))}return{...e,...r}}(o,r.props);return r.type!==i.Fragment&&(d.ref=t?(0,s.composeRefs)(t,l):l),i.cloneElement(r,d)}return i.Children.count(r)>1?i.Children.only(null):null})).displayName="DialogOverlay.RemoveScroll.SlotClone",t=o,(r=i.forwardRef((e,r)=>{let{children:o,...n}=e,s=i.Children.toArray(o),l=s.find(v);if(l){let e=l.props.children,o=s.map(t=>t!==l?t:i.Children.count(e)>1?i.Children.only(null):i.isValidElement(e)?e.props.children:null);return(0,a.jsx)(t,{...n,ref:r,children:i.isValidElement(e)?i.cloneElement(e,void 0,o):null})}return(0,a.jsx)(t,{...n,ref:r,children:o})})).displayName="DialogOverlay.RemoveScroll.Slot",r),A=i.forwardRef((e,t)=>{let{__scopeDialog:r,...o}=e,i=C(E,r);return(0,a.jsx)(h.RemoveScroll,{as:S,allowPinchZoom:!0,shards:[i.contentRef],children:(0,a.jsx)(g.Primitive.div,{"data-state":V(i.open),...o,ref:t,style:{pointerEvents:"auto",...o.style}})})}),O="DialogContent",I=i.forwardRef((e,t)=>{let r=R(O,e.__scopeDialog),{forceMount:o=r.forceMount,...i}=e,n=C(O,e.__scopeDialog);return(0,a.jsx)(m.Presence,{present:o||n.open,children:n.modal?(0,a.jsx)(L,{...i,ref:t}):(0,a.jsx)(_,{...i,ref:t})})});I.displayName=O;var L=i.forwardRef((e,t)=>{let r=C(O,e.__scopeDialog),o=i.useRef(null),l=(0,s.useComposedRefs)(t,r.contentRef,o);return i.useEffect(()=>{let e=o.current;if(e)return(0,w.hideOthers)(e)},[]),(0,a.jsx)(M,{...e,ref:l,trapFocus:r.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,n.composeEventHandlers)(e.onCloseAutoFocus,e=>{e.preventDefault(),r.triggerRef.current?.focus()}),onPointerDownOutside:(0,n.composeEventHandlers)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,r=0===t.button&&!0===t.ctrlKey;(2===t.button||r)&&e.preventDefault()}),onFocusOutside:(0,n.composeEventHandlers)(e.onFocusOutside,e=>e.preventDefault())})}),_=i.forwardRef((e,t)=>{let r=C(O,e.__scopeDialog),o=i.useRef(!1),n=i.useRef(!1);return(0,a.jsx)(M,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{e.onCloseAutoFocus?.(t),t.defaultPrevented||(o.current||r.triggerRef.current?.focus(),t.preventDefault()),o.current=!1,n.current=!1},onInteractOutside:t=>{e.onInteractOutside?.(t),t.defaultPrevented||(o.current=!0,"pointerdown"===t.detail.originalEvent.type&&(n.current=!0));let a=t.target;r.triggerRef.current?.contains(a)&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&n.current&&t.preventDefault()}})}),M=i.forwardRef((e,t)=>{let{__scopeDialog:r,trapFocus:o,onOpenAutoFocus:n,onCloseAutoFocus:l,...d}=e,c=C(O,r),f=i.useRef(null),m=(0,s.useComposedRefs)(t,f);return(0,x.useFocusGuards)(),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(u.FocusScope,{asChild:!0,loop:!0,trapped:o,onMountAutoFocus:n,onUnmountAutoFocus:l,children:(0,a.jsx)(p.DismissableLayer,{role:"dialog",id:c.contentId,"aria-describedby":c.descriptionId,"aria-labelledby":c.titleId,"data-state":V(c.open),...d,ref:m,onDismiss:()=>c.onOpenChange(!1)})}),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(G,{titleId:c.titleId}),(0,a.jsx)(X,{contentRef:f,descriptionId:c.descriptionId})]})]})}),H="DialogTitle",U=i.forwardRef((e,t)=>{let{__scopeDialog:r,...o}=e,i=C(H,r);return(0,a.jsx)(g.Primitive.h2,{id:i.titleId,...o,ref:t})});U.displayName=H;var B="DialogDescription",q=i.forwardRef((e,t)=>{let{__scopeDialog:r,...o}=e,i=C(B,r);return(0,a.jsx)(g.Primitive.p,{id:i.descriptionId,...o,ref:t})});q.displayName=B;var W="DialogClose",Q=i.forwardRef((e,t)=>{let{__scopeDialog:r,...o}=e,i=C(W,r);return(0,a.jsx)(g.Primitive.button,{type:"button",...o,ref:t,onClick:(0,n.composeEventHandlers)(e.onClick,()=>i.onOpenChange(!1))})});function V(e){return e?"open":"closed"}Q.displayName=W;var K="DialogTitleWarning",[J,Z]=(0,l.createContext)(K,{contentName:O,titleName:H,docsSlug:"dialog"}),G=({titleId:e})=>{let t=Z(K),r=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return i.useEffect(()=>{e&&(document.getElementById(e)||console.error(r))},[r,e]),null},X=({contentRef:e,descriptionId:t})=>{let r=Z("DialogDescriptionWarning"),o=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${r.contentName}}.`;return i.useEffect(()=>{let r=e.current?.getAttribute("aria-describedby");t&&r&&(document.getElementById(t)||console.warn(o))},[o,e,t]),null},Y=e.i(41947),Y=Y,ee=e.i(47163);function et({...e}){return(0,a.jsx)(D,{"data-slot":"dialog",...e})}function er({...e}){return(0,a.jsx)(F,{"data-slot":"dialog-portal",...e})}function eo({className:e,...t}){return(0,a.jsx)(T,{"data-slot":"dialog-overlay",className:(0,ee.cn)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",e),...t})}function ea({className:e,children:t,showCloseButton:r=!0,...o}){return(0,a.jsxs)(er,{"data-slot":"dialog-portal",children:[(0,a.jsx)(eo,{}),(0,a.jsxs)(I,{"data-slot":"dialog-content",onInteractOutside:e=>e.preventDefault(),onEscapeKeyDown:e=>e.preventDefault(),className:(0,ee.cn)("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",e),...o,children:[t,r&&(0,a.jsxs)(Q,{"data-slot":"dialog-close",className:"ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",children:[(0,a.jsx)(Y.default,{}),(0,a.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})}function ei({className:e,...t}){return(0,a.jsx)("div",{"data-slot":"dialog-header",className:(0,ee.cn)("flex flex-col gap-2 text-center sm:text-left",e),...t})}function en({className:e,...t}){return(0,a.jsx)("div",{"data-slot":"dialog-footer",className:(0,ee.cn)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",e),...t})}function es({className:e,...t}){return(0,a.jsx)(U,{"data-slot":"dialog-title",className:(0,ee.cn)("text-lg leading-none font-semibold",e),...t})}function el({className:e,...t}){return(0,a.jsx)(q,{"data-slot":"dialog-description",className:(0,ee.cn)("text-muted-foreground text-sm",e),...t})}e.s(["Dialog",()=>et,"DialogContent",()=>ea,"DialogDescription",()=>el,"DialogFooter",()=>en,"DialogHeader",()=>ei,"DialogTitle",()=>es],30374)},40160,e=>{"use strict";let t=(0,e.i(75254).default)("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);e.s(["Download",()=>t],40160)},53489,e=>{"use strict";var t=e.i(43597),r=e.i(87098);function o(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function a(e,t="PEN"){return new Intl.NumberFormat("es-PE",{style:"currency",currency:t,maximumFractionDigits:2}).format(e??0)}function i(e){return e?new Date(e).toLocaleDateString("es-PE"):"-"}async function n(e){return new Promise((t,r)=>{let o=new FileReader;o.onload=()=>t(String(o.result||"")),o.onerror=()=>r(Error("No se pudo convertir el logo a base64.")),o.readAsDataURL(e)})}async function s(e){let r=(0,t.normalizeAssetPath)(e);if(!r)return"";try{let e=await fetch(r.startsWith("http")?r:`${window.location.origin}${r}`);if(!e.ok)return"";return await n(await e.blob())}catch{return""}}function l(e,t,r){return`<div class='summary-row'><span>${o(e)}</span><strong>${o(a(t,r))}</strong></div>`}async function d(e,t){let n=await s(t?.logoAsset),d=o(t?.businessName||t?.name||"MT-Cotiza"),c=o(t?.ruc||"-"),p=o(t?.address||"-"),u=o(t?.phone||"-"),f=o(t?.email||"-"),m=o(t?.footerMessage||"Documento emitido para control comercial interno."),g=o(e.reportsEmail||t?.reportsEmail||t?.email||"informes@mt-cotiza.com"),x=o(e.reportLink||t?.reportLink||"https://mt-cotiza.com"),h=o(e.logoText||t?.logoText||t?.name||"MT-Cotiza"),w=!1!==e.includeDiscount,b=!1!==e.includeTax,v=e.items?.some(e=>!(e.noDiscount??e.discount<=0)),y=!0!==e.hideObservations,j=!0!==e.hideCommercialTerms,k=(0,r.buildQuotationPageChunks)(e),$=n?`<img src="${n}" alt="${d}" style="height:96px;max-width:360px;object-fit:contain;display:block;" />`:`<div style="display:inline-flex;align-items:center;justify-content:center;width:120px;height:96px;border-radius:18px;background:#e0f2fe;color:#0f172a;font-weight:700;font-size:28px;">${o(t?.logoText||t?.name||"MT")}</div>`;return`
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    @page { size: A4; margin: 0; }
    html, body { margin: 0; padding: 0; background: #ffffff; color: #0f172a; }
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { width: 210mm; min-height: 297mm; padding: 18mm 16mm 16mm; break-after: page; page-break-after: always; }
    .page:last-child { break-after: auto; page-break-after: auto; }
    .document-header { min-height: 20mm; margin-top: 14px; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px 14px; color: #334155; font-size: 13px; line-height: 1.7; text-align: center; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; overflow: hidden; }
    .company-meta { margin-top: 12px; display: flex; flex-wrap: wrap; justify-content: center; gap: 6mm; color: #475569; font-size: 11px; line-height: 1.5; }
    .header { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; border-bottom: 1px solid #e2e8f0; padding-bottom: 18px; }
    .company { flex: 1; }
    .badge { width: 58mm; border: 2px solid #0f172a; border-radius: 18px; padding: 10px 12px; }
    .info-strip { margin-top: 14px; display: flex; gap: 16px; align-items: stretch; }
    .info-main { flex: 1; border: 1px solid #e2e8f0; border-radius: 18px; padding: 12px 14px; background: #f8fafc; }
    .info-box { width: 320px; border: 1px solid #e2e8f0; border-radius: 18px; padding: 12px 14px; background: #fff; }
    .badge-title { color: #64748b; font-size: 9px; letter-spacing: .18em; font-weight: 700; }
    .badge-code { margin-top: 6px; font-size: 19px; font-weight: 700; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    .badge-meta { margin-top: 4px; color: #475569; font-size: 10px; line-height: 1.25; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    .title-strip { margin-top: 12px; padding: 10px 14px; background: #eff6ff; border: 1px solid #dbeafe; font-size: 14px; font-weight: 700; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    .grid { margin-top: 18px; display: grid; grid-template-columns: 1.05fr .95fr; gap: 16px; }
    .card { border: 1px solid #e2e8f0; border-radius: 20px; padding: 16px; }
    .mini-card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; background: #fff; }
    .mini-card .label { font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #64748b; }
    .mini-card .value { margin-top: 4px; font-size: 13px; font-weight: 600; color: #0f172a; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    .label { color: #64748b; font-size: 10px; letter-spacing: .18em; text-transform: uppercase; font-weight: 700; }
    .customer-name { margin-top: 6px; font-size: 18px; font-weight: 700; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    .description { margin-top: 8px; color: #475569; line-height: 1.6; font-size: 13px; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    .summary-row { display: flex; justify-content: space-between; gap: 16px; margin-top: 10px; font-size: 13px; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    .summary-row strong { color: #0f172a; white-space: nowrap; }
    .table-wrap { margin-top: 18px; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; table-layout: fixed; }
    thead { background: #f8fafc; color: #475569; }
    th { padding: 12px 10px; text-align: left; font-weight: 700; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    tbody td { padding: 12px 10px; border-top: 1px solid #e2e8f0; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    .sections { margin-top: 16px; display: grid; grid-template-columns: 1fr 0.9fr; gap: 16px; }
    .box-title { color: #64748b; font-size: 10px; letter-spacing: .18em; text-transform: uppercase; font-weight: 700; }
    .box-value { margin-top: 8px; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px 14px; color: #334155; line-height: 1.7; font-size: 13px; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; overflow: hidden; }
    .totals { border: 1px solid #e2e8f0; border-radius: 20px; padding: 16px; }
    .totals-row { display: flex; justify-content: space-between; gap: 16px; margin-top: 8px; font-size: 13px; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    .totals-row.total { margin-top: 12px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 15px; font-weight: 700; }
    .footer { margin-top: 18px; color: #475569; font-size: 12px; line-height: 1.7; white-space: pre-wrap; overflow-wrap:anywhere; word-break: break-word; }
    .footer-note { margin-top: 6px; padding-top: 12px; border-top: 1px dashed #cbd5e1; }
  </style>
</head>
<body>
  ${k.map(t=>{var r;let n,s=t.isFirst?"COTIZACIÓN":`CONTINUACI\xd3N ${t.pageNumber}/${t.totalPages}`,k=t.isFirst?o(e.title||"Cotización comercial"):`Continuaci\xf3n de ${o(e.title||"Cotización comercial")}`,C=t.isFirst?`
        <div class='grid'>
          <div class='card'>
            <div class='label'>Cliente</div>
            <div class='customer-name'>${o(e.customerName)}</div>
            <div class='description'>${o(e.description||"-")}</div>
            <div style='margin-top:10px;color:#475569;font-size:13px;line-height:1.7;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;'>
              ${e.customerDocumentNumber?`<div>${o(e.customerDocumentType||"RUC")}: ${o(e.customerDocumentNumber)}</div>`:""}
            </div>
          </div>
          <div class='card'>
            <div class='label'>Resumen</div>
            ${l("Subtotal",e.subtotal,e.currency)}
            ${w?l("Descuento global",e.discount,e.currency):""}
            ${b?l("Impuesto",e.tax,e.currency):""}
            <div class='summary-row' style='padding-top:12px;border-top:1px solid #e2e8f0;font-size:15px;font-weight:700;'><span>Total</span><strong>${o(a(e.total,e.currency))}</strong></div>
          </div>
        </div>
      `:"",D=t.isLast?`
        <div class='sections'>
          <div>
            ${y?`<div class='card'><div class='box-title'>Observaciones</div><div class='box-value'>${o(e.observations||"-")}</div></div><div style='height:16px'></div>`:""}
            ${j?`<div class='card'><div class='box-title'>Condiciones comerciales</div><div class='box-value'>${o(e.commercialTerms||"-")}</div></div>`:""}
          </div>
          <div class='totals'>
            <div class='totals-row'><span>Subtotal</span><strong>${o(a(e.subtotal,e.currency))}</strong></div>
            ${w?`<div class='totals-row'><span>Descuento</span><strong>${o(a(e.discount,e.currency))}</strong></div>`:""}
            ${b?`<div class='totals-row'><span>Impuesto</span><strong>${o(a(e.tax,e.currency))}</strong></div>`:""}
            <div class='totals-row total'><span>Total</span><strong>${o(a(e.total,e.currency))}</strong></div>
          </div>
        </div>
      `:"";return`
      <div class='page'>
        <div class='header'>
          <div class='company'>
            ${$}
          </div>
          <div class='badge'>
            <div class='badge-title'>${s}</div>
            <div class='badge-code'>${o(e.code)}</div>
            <div class='badge-meta'>
              <div>Fecha: ${o(i(e.issueDate))}</div>
              ${!1!==e.useExpirationDate?`<div>Vence: ${o(i(e.expirationDate))}</div>`:""}
            </div>
          </div>
        </div>
        ${t.isFirst&&e.documentHeader?.trim()?`<div class='document-header'>${o(e.documentHeader)}</div>`:""}
        <div class='company-meta'>
          <span>RUC: ${c}</span>
          <span>${u}</span>
          <span>${f}</span>
        </div>
        <div class='info-strip'>
          <div class='info-main'>
            <div style='display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:10px;line-height:1.25;'>
              <div style='font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#374151;'>${h}</div>
              <div style='color:#6b7280;'>\xb7</div>
              <div style='color:#374151;'>${g}</div>
              <div style='color:#6b7280;'>\xb7</div>
              <div style='color:#1d4ed8;text-decoration:underline;word-break:break-word;'>${x}</div>
            </div>
          </div>
          <div class='info-box'>
            <div style='font-size:13px;font-weight:700;color:#0f172a;line-height:1.2;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;'>${d}</div>
            <div style='margin-top:8px;color:#475569;font-size:12px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;'>
              <div>RUC: ${c}</div>
              <div>${p}</div>
              <div>${u} \xb7 ${f}</div>
            </div>
          </div>
        </div>
        ${t.isFirst,`<div class='title-strip'>${k}</div>`}
        ${C}
        ${t.isFirst?`<div style='margin-top:12px;border:1px solid #e2e8f0;border-radius:16px;padding:10px 12px;color:#475569;font-size:11px;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>${o(`Placa: ${e.plate||"-"} \xb7 C\xf3digo: ${e.codeReference||"-"} \xb7 Contrato marco: ${e.frameworkContract||"-"} \xb7 Pos. contrato marco: ${e.frameworkContractPosition||"-"} \xb7 T1/T2/FLT: ${e.technicalParameters||"-"}`)}</div>`:""}
        <div class='table-wrap'>
          <table>
            <thead>
              <tr>
                <th style='width:12%;'>Cant.</th>
                <th>Descripci\xf3n</th>
                <th style='width:18%; text-align:right;'>P. Unit.</th>
                ${v?"<th style='width:16%; text-align:right;'>Desc.</th>":""}
                <th style='text-align:right;width:${v?"18%":"28%"};'>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${r={...e,items:t.items},n=r.items?.some(e=>!(e.noDiscount??e.discount<=0)),!r.items?.length?`
      <tr>
        <td colspan="${n?5:4}" style="padding:14px;border-top:1px solid #e2e8f0;color:#64748b;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;">Sin \xedtems registrados</td>
      </tr>
    `:r.items.map(e=>`
        <tr>
          <td style="padding:12px 10px;border-top:1px solid #e2e8f0;vertical-align:top;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;">${o(String(e.quantity))}</td>
          <td style="padding:12px 10px;border-top:1px solid #e2e8f0;vertical-align:top;font-weight:600;color:#0f172a;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;">${o(e.description)}</td>
          <td style="padding:12px 10px;border-top:1px solid #e2e8f0;vertical-align:top;text-align:right;white-space:nowrap;">${o(a(e.unitPrice,r.currency))}</td>
          ${n?`<td style="padding:12px 10px;border-top:1px solid #e2e8f0;vertical-align:top;text-align:right;white-space:nowrap;">${e.noDiscount?"-":o(a(e.discount,r.currency))}</td>`:""}
          <td style="padding:12px 10px;border-top:1px solid #e2e8f0;vertical-align:top;text-align:right;font-weight:600;white-space:nowrap;">${o(a(e.subtotal,r.currency))}</td>
        </tr>
      `).join("")}
            </tbody>
          </table>
        </div>
        ${D}
        ${t.isLast?`<div class='footer'><div>Sin otro particular, atentamente.</div><div class='footer-note'>${m}</div></div>`:""}
      </div>
    `}).join("")}
</body>
</html>`}async function c(e,r){let o=(0,t.getAuthSession)();if(!o?.token)return(0,t.redirectToLogin)(),null;let a=await fetch(`/api/quotations/${e}/download`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o.token}`},body:JSON.stringify({session:o,fileName:r||`cotizacion_${e}`}),cache:"no-store"});if(!a.ok)throw 401===a.status&&(0,t.redirectToLogin)(),Error(await a.text());return await a.blob()}async function p(e,t){let r=await c(e,t);if(!r)return;let o=window.URL.createObjectURL(r),a=document.createElement("a");a.href=o,a.download=`${(t||`cotizacion_${e}`).replace(/[^a-z0-9-_]+/gi,"_").replace(/_+/g,"_").replace(/^_|_$/g,"")||`cotizacion_${e}`}.pdf`,document.body.appendChild(a),a.click(),a.remove(),window.setTimeout(()=>window.URL.revokeObjectURL(o),1e3)}e.s(["buildQuotationPreviewHtml",()=>d,"downloadQuotationPdf",()=>p,"fetchQuotationPdfBlob",()=>c])},11944,e=>{"use strict";var t=e.i(43476),r=e.i(71645),o=e.i(63982),a=e.i(31278),i=e.i(63488),n=e.i(67881),s=e.i(23750),l=e.i(43817),d=e.i(30374),c=e.i(43597),p=e.i(53489);let u={greeting:"<p>Estimado/a cliente,</p><p>Adjuntamos la cotización para su revisión.</p>",followup:"<p>Quedamos atentos a sus comentarios o consultas adicionales.</p>",closing:"<p>Saludos cordiales,<br/>MT-Cotiza</p>"};function f({open:e,onOpenChange:f,quotation:g,onSent:x}){let[h,w]=(0,r.useState)(!1),[b,v]=(0,r.useState)(!1),[y,j]=(0,r.useState)(""),[k,$]=(0,r.useState)(""),[C,D]=(0,r.useState)(""),[N,z]=(0,r.useState)(""),[P,R]=(0,r.useState)(!1),[F,E]=(0,r.useState)(!1),[T,S]=(0,r.useState)(""),[A,O]=(0,r.useState)(null),[I,L]=(0,r.useState)(""),[_,M]=(0,r.useState)("application/pdf"),H=(0,r.useRef)(null),U=(0,r.useMemo)(()=>g?`Cotizaci\xf3n ${g.code} - ${g.customerName}`:"",[g]),B=(0,r.useMemo)(()=>{let e;return g?(e=`Estimado/a ${g.customerName},

Adjuntamos la cotizaci\xf3n ${g.code} para su revisi\xf3n.
T\xedtulo: ${g.title}
Fecha: ${(0,c.shortDate)(g.issueDate)}
Monto: ${(0,c.money)(g.total,g.currency)}

Quedamos atentos a sus comentarios.

Saludos,
MT-Cotiza`.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),`<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#111827">${e.split(/\n\s*\n/).map(e=>`<p style="margin:0 0 12px;">${e.replaceAll("\n","<br/>")}</p>`).join("")}</div>`):""},[g]);(0,r.useEffect)(()=>{if(!e||!g)return;j(""),$(g.customerEmail||""),D(U),z(B),E(!1),R(!0),S(`cotizacion-${g.code}.pdf`),O(null),L(""),M("application/pdf");let t=!1,r=async()=>{try{let e=await (0,p.fetchQuotationPdfBlob)(g.id,g.code);if(t||!e)return;let r=`cotizacion-${g.code}.pdf`;S(r),O(e.size),M(e.type||"application/pdf");let o=await W(e);t||(L(o),E(!0))}catch{t||j("No se pudo preparar el PDF adjunto para el correo.")}finally{t||R(!1)}};return(async()=>{if(!g.customerEmail){w(!0);try{let e=await (0,c.apiFetch)(`/customers/${g.customerId}`);!t&&e.email&&$(e.email)}catch{}finally{t||w(!1)}}})(),r(),()=>{t=!0}},[e,g,B,U]),(0,r.useEffect)(()=>{H.current&&H.current.innerHTML!==N&&(H.current.innerHTML=N)},[N]);let q=()=>{b||f(!1)},W=e=>new Promise((t,r)=>{let o=new FileReader;o.onload=()=>{let e=String(o.result||""),r=e.indexOf(",");t(r>=0?e.slice(r+1):e)},o.onerror=()=>r(Error("No se pudo convertir el adjunto.")),o.readAsDataURL(e)}),Q=(e,t)=>{"undefined"!=typeof document&&(H.current?.focus(),document.execCommand(e,!1,t),z(H.current?.innerHTML||""))},V=e=>{Q("insertHTML",(()=>{try{let e=window.localStorage.getItem("cotiflow.email.fragments");if(!e)return u;let t=JSON.parse(e);return{greeting:t.greeting?.trim()||u.greeting,followup:t.followup?.trim()||u.followup,closing:t.closing?.trim()||u.closing}}catch{return u}})()[e])},K=async()=>{if(g){v(!0),j("");try{let e=await (0,c.apiFetch)(`/quotations/${g.id}/send-email`,{method:"POST",body:JSON.stringify({recipientEmail:k,subject:C,htmlBody:N,attachmentFileName:T,attachmentMimeType:_,attachmentBase64:I})});x?.(e.message||`Cotizaci\xf3n enviada a ${e.recipientEmail}.`),f(!1)}catch(e){j(e instanceof Error?e.message:"No se pudo enviar la cotización.")}finally{v(!1)}}};return(0,t.jsx)(d.Dialog,{open:e,onOpenChange:e=>{e||q()},children:(0,t.jsxs)(d.DialogContent,{className:"sm:max-w-2xl",children:[(0,t.jsxs)(d.DialogHeader,{children:[(0,t.jsx)("div",{className:"mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-700",children:(0,t.jsx)(i.Mail,{className:"h-5 w-5"})}),(0,t.jsx)(d.DialogTitle,{children:"Enviar cotización por correo"}),(0,t.jsx)(d.DialogDescription,{children:"Revisa y edita el correo antes de enviarlo. La cotización se adjuntará en PDF."})]}),(0,t.jsxs)("div",{className:"grid gap-4",children:[(0,t.jsxs)("div",{className:"border-border/70 bg-muted/30 rounded-2xl border p-4 text-sm",children:[(0,t.jsx)("div",{className:"text-foreground font-medium",children:g?.code}),(0,t.jsx)("div",{className:"text-muted-foreground",children:g?.customerName}),(0,t.jsx)("div",{className:"text-muted-foreground",children:g?`${g.title} \xb7 ${(0,c.money)(g.total,g.currency)}`:""})]}),(0,t.jsx)("div",{className:"rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4 text-sm",children:(0,t.jsxs)("div",{className:"flex items-start gap-3",children:[(0,t.jsx)("div",{className:"flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm ring-1 ring-sky-500/10",children:(0,t.jsx)(o.FileCheck2,{className:"h-5 w-5"})}),(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsx)("div",{className:"text-foreground font-medium",children:"Adjunto PDF de cotización"}),(0,t.jsx)("div",{className:"text-muted-foreground",children:P?"Preparando el PDF para el correo...":F?`${T}${A?` \xb7 ${(A/1024).toFixed(1)} KB`:""}`:"El PDF aún no está listo."})]})]})}),(0,t.jsx)(l.FormField,{label:"Destinatario",hint:h?"Buscando correo del cliente...":void 0,children:(0,t.jsx)(s.Input,{type:"email",placeholder:"correo@cliente.com",value:k,onChange:e=>$(e.target.value),required:!0})}),(0,t.jsx)(l.FormField,{label:"Asunto",children:(0,t.jsx)(s.Input,{placeholder:"Asunto",value:C,onChange:e=>D(e.target.value),required:!0})}),(0,t.jsxs)(l.FormField,{label:"Cuerpo del correo",children:[(0,t.jsxs)("div",{className:"border-border/70 bg-background overflow-hidden rounded-2xl border",children:[(0,t.jsxs)("div",{className:"border-border/70 bg-muted/30 flex flex-wrap items-center gap-2 border-b p-2",children:[(0,t.jsx)(m,{label:"Negrita",onClick:()=>Q("bold"),children:(0,t.jsx)("strong",{children:"B"})}),(0,t.jsx)(m,{label:"Cursiva",onClick:()=>Q("italic"),children:(0,t.jsx)("em",{children:"I"})}),(0,t.jsx)(m,{label:"Subrayado",onClick:()=>Q("underline"),children:(0,t.jsx)("span",{className:"underline",children:"U"})}),(0,t.jsx)("div",{className:"bg-border mx-1 h-6 w-px"}),(0,t.jsx)(m,{label:"Lista con viñetas",onClick:()=>Q("insertUnorderedList"),children:"• Lista"}),(0,t.jsx)(m,{label:"Lista numerada",onClick:()=>Q("insertOrderedList"),children:"1. Lista"}),(0,t.jsx)("div",{className:"bg-border mx-1 h-6 w-px"}),(0,t.jsx)(m,{label:"Plantilla saludo",onClick:()=>V("greeting"),children:"Saludo"}),(0,t.jsx)(m,{label:"Plantilla seguimiento",onClick:()=>V("followup"),children:"Seguimiento"}),(0,t.jsx)(m,{label:"Plantilla cierre",onClick:()=>V("closing"),children:"Cierre"}),(0,t.jsx)("div",{className:"bg-border mx-1 h-6 w-px"}),(0,t.jsx)(m,{label:"Limpiar formato",onClick:()=>{if("undefined"==typeof document)return;let e=H.current?.innerHTML||"",t=H.current?.innerText||H.current?.textContent||"";H.current?.focus(),document.execCommand("removeFormat",!1),document.execCommand("unlink",!1);let r=t.split(/\n{2,}/).map(e=>`<p>${e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;").replaceAll("\n","<br/>")}</p>`).join("");H.current&&(H.current.innerHTML=r||e,z(H.current.innerHTML||""))},children:"Limpiar"})]}),(0,t.jsx)("div",{ref:H,contentEditable:!0,suppressContentEditableWarning:!0,onInput:e=>z(e.currentTarget.innerHTML),className:"min-h-[240px] rounded-b-2xl px-4 py-3 text-sm leading-6 outline-none [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6",style:{whiteSpace:"normal"}})]}),(0,t.jsx)("div",{className:"text-muted-foreground mt-2 text-xs",children:"Puedes dar formato básico, insertar bloques rápidos y editar el cuerpo antes de enviar."})]}),y?(0,t.jsx)("div",{className:"rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700",children:y}):null]}),(0,t.jsxs)(d.DialogFooter,{children:[(0,t.jsx)(n.Button,{variant:"outline",onClick:q,disabled:b,children:"Cancelar"}),(0,t.jsxs)(n.Button,{onClick:()=>void K(),disabled:b||P||!F||!k||!C||!N,children:[b?(0,t.jsx)(a.Loader2,{className:"h-4 w-4 animate-spin"}):null,b?"Enviando...":"Enviar"]})]})]})})}function m({label:e,onClick:r,children:o}){return(0,t.jsx)("button",{type:"button",onMouseDown:e=>e.preventDefault(),onClick:r,title:e,className:"border-border/70 bg-background text-foreground hover:bg-muted inline-flex items-center rounded-lg border px-2.5 py-1.5 text-xs font-medium transition",children:o})}e.s(["QuotationEmailDialog",()=>f])}]);