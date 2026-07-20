module.exports=[14166,a=>{"use strict";let b=(0,a.i(70106).default)("file-check-corner",[["path",{d:"M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6",key:"g5mvt7"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"m14 20 2 2 4-4",key:"15kota"}]]);a.s(["FileCheck2",()=>b],14166)},96221,a=>{"use strict";let b=(0,a.i(70106).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);a.s(["Loader2",()=>b],96221)},65733,a=>{"use strict";let b,c,d;var e=a.i(87924),f=a.i(72131),g=a.i(7554),h=a.i(70121),i=a.i(50104),j=a.i(92843),k=a.i(25152),l=a.i(96743),m=a.i(22297),n=a.i(92616),o=a.i(77192),p=a.i(30553),q=a.i(86228),r=a.i(52081),s=a.i(41852),t=Symbol("radix.slottable");function u(a){return f.isValidElement(a)&&"function"==typeof a.type&&"__radixId"in a.type&&a.type.__radixId===t}var v="Dialog",[w,x]=(0,i.createContextScope)(v),[y,z]=w(v),A=a=>{let{__scopeDialog:b,children:c,open:d,defaultOpen:g,onOpenChange:h,modal:i=!0}=a,l=f.useRef(null),m=f.useRef(null),[n,o]=(0,k.useControllableState)({prop:d,defaultProp:g??!1,onChange:h,caller:v});return(0,e.jsx)(y,{scope:b,triggerRef:l,contentRef:m,contentId:(0,j.useId)(),titleId:(0,j.useId)(),descriptionId:(0,j.useId)(),open:n,onOpenChange:o,onOpenToggle:f.useCallback(()=>o(a=>!a),[o]),modal:i,children:c})};A.displayName=v;var B="DialogTrigger";f.forwardRef((a,b)=>{let{__scopeDialog:c,...d}=a,f=z(B,c),i=(0,h.useComposedRefs)(b,f.triggerRef);return(0,e.jsx)(p.Primitive.button,{type:"button","aria-haspopup":"dialog","aria-expanded":f.open,"aria-controls":f.contentId,"data-state":V(f.open),...d,ref:i,onClick:(0,g.composeEventHandlers)(a.onClick,f.onOpenToggle)})}).displayName=B;var C="DialogPortal",[D,E]=w(C,{forceMount:void 0}),F=a=>{let{__scopeDialog:b,forceMount:c,children:d,container:g}=a,h=z(C,b);return(0,e.jsx)(D,{scope:b,forceMount:c,children:f.Children.map(d,a=>(0,e.jsx)(o.Presence,{present:c||h.open,children:(0,e.jsx)(n.Portal,{asChild:!0,container:g,children:a})}))})};F.displayName=C;var G="DialogOverlay",H=f.forwardRef((a,b)=>{let c=E(G,a.__scopeDialog),{forceMount:d=c.forceMount,...f}=a,g=z(G,a.__scopeDialog);return g.modal?(0,e.jsx)(o.Presence,{present:d||g.open,children:(0,e.jsx)(J,{...f,ref:b})}):null});H.displayName=G;var I=((d=f.forwardRef((a,b)=>{let{children:c,...d}=a;if(f.isValidElement(c)){var e;let a,g,i=(e=c,(g=(a=Object.getOwnPropertyDescriptor(e.props,"ref")?.get)&&"isReactWarning"in a&&a.isReactWarning)?e.ref:(g=(a=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in a&&a.isReactWarning)?e.props.ref:e.props.ref||e.ref),j=function(a,b){let c={...b};for(let d in b){let e=a[d],f=b[d];/^on[A-Z]/.test(d)?e&&f?c[d]=(...a)=>{let b=f(...a);return e(...a),b}:e&&(c[d]=e):"style"===d?c[d]={...e,...f}:"className"===d&&(c[d]=[e,f].filter(Boolean).join(" "))}return{...a,...c}}(d,c.props);return c.type!==f.Fragment&&(j.ref=b?(0,h.composeRefs)(b,i):i),f.cloneElement(c,j)}return f.Children.count(c)>1?f.Children.only(null):null})).displayName="DialogOverlay.RemoveScroll.SlotClone",b=d,(c=f.forwardRef((a,c)=>{let{children:d,...g}=a,h=f.Children.toArray(d),i=h.find(u);if(i){let a=i.props.children,d=h.map(b=>b!==i?b:f.Children.count(a)>1?f.Children.only(null):f.isValidElement(a)?a.props.children:null);return(0,e.jsx)(b,{...g,ref:c,children:f.isValidElement(a)?f.cloneElement(a,void 0,d):null})}return(0,e.jsx)(b,{...g,ref:c,children:d})})).displayName="DialogOverlay.RemoveScroll.Slot",c),J=f.forwardRef((a,b)=>{let{__scopeDialog:c,...d}=a,f=z(G,c);return(0,e.jsx)(r.RemoveScroll,{as:I,allowPinchZoom:!0,shards:[f.contentRef],children:(0,e.jsx)(p.Primitive.div,{"data-state":V(f.open),...d,ref:b,style:{pointerEvents:"auto",...d.style}})})}),K="DialogContent",L=f.forwardRef((a,b)=>{let c=E(K,a.__scopeDialog),{forceMount:d=c.forceMount,...f}=a,g=z(K,a.__scopeDialog);return(0,e.jsx)(o.Presence,{present:d||g.open,children:g.modal?(0,e.jsx)(M,{...f,ref:b}):(0,e.jsx)(N,{...f,ref:b})})});L.displayName=K;var M=f.forwardRef((a,b)=>{let c=z(K,a.__scopeDialog),d=f.useRef(null),i=(0,h.useComposedRefs)(b,c.contentRef,d);return f.useEffect(()=>{let a=d.current;if(a)return(0,s.hideOthers)(a)},[]),(0,e.jsx)(O,{...a,ref:i,trapFocus:c.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,g.composeEventHandlers)(a.onCloseAutoFocus,a=>{a.preventDefault(),c.triggerRef.current?.focus()}),onPointerDownOutside:(0,g.composeEventHandlers)(a.onPointerDownOutside,a=>{let b=a.detail.originalEvent,c=0===b.button&&!0===b.ctrlKey;(2===b.button||c)&&a.preventDefault()}),onFocusOutside:(0,g.composeEventHandlers)(a.onFocusOutside,a=>a.preventDefault())})}),N=f.forwardRef((a,b)=>{let c=z(K,a.__scopeDialog),d=f.useRef(!1),g=f.useRef(!1);return(0,e.jsx)(O,{...a,ref:b,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:b=>{a.onCloseAutoFocus?.(b),b.defaultPrevented||(d.current||c.triggerRef.current?.focus(),b.preventDefault()),d.current=!1,g.current=!1},onInteractOutside:b=>{a.onInteractOutside?.(b),b.defaultPrevented||(d.current=!0,"pointerdown"===b.detail.originalEvent.type&&(g.current=!0));let e=b.target;c.triggerRef.current?.contains(e)&&b.preventDefault(),"focusin"===b.detail.originalEvent.type&&g.current&&b.preventDefault()}})}),O=f.forwardRef((a,b)=>{let{__scopeDialog:c,trapFocus:d,onOpenAutoFocus:g,onCloseAutoFocus:i,...j}=a,k=z(K,c),n=f.useRef(null),o=(0,h.useComposedRefs)(b,n);return(0,q.useFocusGuards)(),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(m.FocusScope,{asChild:!0,loop:!0,trapped:d,onMountAutoFocus:g,onUnmountAutoFocus:i,children:(0,e.jsx)(l.DismissableLayer,{role:"dialog",id:k.contentId,"aria-describedby":k.descriptionId,"aria-labelledby":k.titleId,"data-state":V(k.open),...j,ref:o,onDismiss:()=>k.onOpenChange(!1)})}),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(Z,{titleId:k.titleId}),(0,e.jsx)($,{contentRef:n,descriptionId:k.descriptionId})]})]})}),P="DialogTitle",Q=f.forwardRef((a,b)=>{let{__scopeDialog:c,...d}=a,f=z(P,c);return(0,e.jsx)(p.Primitive.h2,{id:f.titleId,...d,ref:b})});Q.displayName=P;var R="DialogDescription",S=f.forwardRef((a,b)=>{let{__scopeDialog:c,...d}=a,f=z(R,c);return(0,e.jsx)(p.Primitive.p,{id:f.descriptionId,...d,ref:b})});S.displayName=R;var T="DialogClose",U=f.forwardRef((a,b)=>{let{__scopeDialog:c,...d}=a,f=z(T,c);return(0,e.jsx)(p.Primitive.button,{type:"button",...d,ref:b,onClick:(0,g.composeEventHandlers)(a.onClick,()=>f.onOpenChange(!1))})});function V(a){return a?"open":"closed"}U.displayName=T;var W="DialogTitleWarning",[X,Y]=(0,i.createContext)(W,{contentName:K,titleName:P,docsSlug:"dialog"}),Z=({titleId:a})=>{let b=Y(W),c=`\`${b.contentName}\` requires a \`${b.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${b.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${b.docsSlug}`;return f.useEffect(()=>{a&&(document.getElementById(a)||console.error(c))},[c,a]),null},$=({contentRef:a,descriptionId:b})=>{let c=Y("DialogDescriptionWarning"),d=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${c.contentName}}.`;return f.useEffect(()=>{let c=a.current?.getAttribute("aria-describedby");b&&c&&(document.getElementById(b)||console.warn(d))},[d,a,b]),null},_=a.i(62213),_=_,aa=a.i(97895);function ab({...a}){return(0,e.jsx)(A,{"data-slot":"dialog",...a})}function ac({...a}){return(0,e.jsx)(F,{"data-slot":"dialog-portal",...a})}function ad({className:a,...b}){return(0,e.jsx)(H,{"data-slot":"dialog-overlay",className:(0,aa.cn)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",a),...b})}function ae({className:a,children:b,showCloseButton:c=!0,...d}){return(0,e.jsxs)(ac,{"data-slot":"dialog-portal",children:[(0,e.jsx)(ad,{}),(0,e.jsxs)(L,{"data-slot":"dialog-content",onInteractOutside:a=>a.preventDefault(),onEscapeKeyDown:a=>a.preventDefault(),className:(0,aa.cn)("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",a),...d,children:[b,c&&(0,e.jsxs)(U,{"data-slot":"dialog-close",className:"ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",children:[(0,e.jsx)(_.default,{}),(0,e.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})}function af({className:a,...b}){return(0,e.jsx)("div",{"data-slot":"dialog-header",className:(0,aa.cn)("flex flex-col gap-2 text-center sm:text-left",a),...b})}function ag({className:a,...b}){return(0,e.jsx)("div",{"data-slot":"dialog-footer",className:(0,aa.cn)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",a),...b})}function ah({className:a,...b}){return(0,e.jsx)(Q,{"data-slot":"dialog-title",className:(0,aa.cn)("text-lg leading-none font-semibold",a),...b})}function ai({className:a,...b}){return(0,e.jsx)(S,{"data-slot":"dialog-description",className:(0,aa.cn)("text-muted-foreground text-sm",a),...b})}a.s(["Dialog",()=>ab,"DialogContent",()=>ae,"DialogDescription",()=>ai,"DialogFooter",()=>ag,"DialogHeader",()=>af,"DialogTitle",()=>ah],65733)},84505,a=>{"use strict";let b=(0,a.i(70106).default)("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);a.s(["Download",()=>b],84505)},51409,a=>{"use strict";var b=a.i(25503),c=a.i(24537);function d(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function e(a,b="PEN"){return new Intl.NumberFormat("es-PE",{style:"currency",currency:b,maximumFractionDigits:2}).format(a??0)}function f(a){if(!a)return"-";if(/^\d{2}\/\d{2}\/\d{4}$/.test(a))return a;let b=a.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(b)return`${b[3]}/${b[2]}/${b[1]}`;let c=new Date(a);return Number.isNaN(c.getTime())?"-":`${String(c.getDate()).padStart(2,"0")}/${String(c.getMonth()+1).padStart(2,"0")}/${c.getFullYear()}`}async function g(a){return new Promise((b,c)=>{let d=new FileReader;d.onload=()=>b(String(d.result||"")),d.onerror=()=>c(Error("No se pudo convertir el logo a base64.")),d.readAsDataURL(a)})}async function h(a){let c=(0,b.normalizeAssetPath)(a);if(!c)return"";try{let a=await fetch(c.startsWith("http")?c:`${window.location.origin}${c}`);if(!a.ok)return"";return await g(await a.blob())}catch{return""}}function i(a,b,c){return`<div class='summary-row'><span>${d(a)}</span><strong>${d(e(b,c))}</strong></div>`}async function j(a,b){let g=await h(b?.logoAsset),j=d(b?.businessName||b?.name||"MT-Cotiza"),k=d(b?.ruc||"-"),l=d(b?.address||"-"),m=d(b?.phone||"-"),n=d(b?.email||"-"),o=d(b?.footerMessage||"Documento emitido para control comercial interno."),p=d(a.reportsEmail||b?.reportsEmail||b?.email||"informes@mt-cotiza.com"),q=d(a.reportLink||b?.reportLink||"https://mt-cotiza.com"),r=d(b?.logoText||b?.name||"MT-Cotiza"),s=d(a.logoText||b?.ruc||"-"),t=d(a.reportLink||b?.phone||"-"),u=!1!==a.includeDiscount,v=!1!==a.includeTax,w=a.items?.some(a=>!(a.noDiscount??a.discount<=0)),x=!0!==a.hideObservations,y=!0!==a.hideCommercialTerms,z=!!(a.plate||a.codeReference||a.frameworkContract||a.frameworkContractPosition||a.technicalParameters),A=(0,c.buildQuotationPageChunks)(a),B=g?`<img src="${g}" alt="${j}" style="height:96px;max-width:360px;object-fit:contain;display:block;" />`:`<div style="display:inline-flex;align-items:center;justify-content:center;width:120px;height:96px;border-radius:18px;background:#e0f2fe;color:#0f172a;font-weight:700;font-size:28px;">${d(b?.logoText||b?.name||"MT")}</div>`;return`
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
  ${A.map(b=>{var c;let g,h=b.isFirst?"COTIZACIÓN":`CONTINUACI\xd3N ${b.pageNumber}/${b.totalPages}`,A=b.isFirst?d(a.title||"Cotización comercial"):`Continuaci\xf3n de ${d(a.title||"Cotización comercial")}`,C=b.isFirst?`
        <div class='grid'>
          <div class='card'>
            <div class='label'>Cliente</div>
            <div class='customer-name'>${d(a.customerName)}</div>
            <div class='description'>${d(a.description||"-")}</div>
            <div style='margin-top:10px;color:#475569;font-size:13px;line-height:1.7;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;'>
              ${a.customerDocumentNumber?`<div>${d(a.customerDocumentType||"RUC")}: ${d(a.customerDocumentNumber)}</div>`:""}
            </div>
          </div>
          <div class='card'>
            <div class='label'>Resumen</div>
            ${i("Subtotal",a.subtotal,a.currency)}
            ${u?i("Descuento global",a.discount,a.currency):""}
            ${v?i("Impuesto",a.tax,a.currency):""}
            <div class='summary-row' style='padding-top:12px;border-top:1px solid #e2e8f0;font-size:15px;font-weight:700;'><span>Total</span><strong>${d(e(a.total,a.currency))}</strong></div>
          </div>
        </div>
      `:"",D=b.isLast?`
        <div class='sections'>
          <div>
            ${x?`<div class='card'><div class='box-title'>Observaciones</div><div class='box-value'>${d(a.observations||"-")}</div></div><div style='height:16px'></div>`:""}
            ${y?`<div class='card'><div class='box-title'>Condiciones comerciales</div><div class='box-value'>${d(a.commercialTerms||"-")}</div></div>`:""}
          </div>
          <div class='totals'>
            <div class='totals-row'><span>Subtotal</span><strong>${d(e(a.subtotal,a.currency))}</strong></div>
            ${u?`<div class='totals-row'><span>Descuento</span><strong>${d(e(a.discount,a.currency))}</strong></div>`:""}
            ${v?`<div class='totals-row'><span>Impuesto</span><strong>${d(e(a.tax,a.currency))}</strong></div>`:""}
            <div class='totals-row total'><span>Total</span><strong>${d(e(a.total,a.currency))}</strong></div>
          </div>
        </div>
      `:"";return`
      <div class='page'>
        <div class='header'>
          <div class='company'>
            ${B}
          </div>
          <div class='badge'>
            <div class='badge-title'>${h}</div>
            <div class='badge-code'>${d(a.code)}</div>
            <div class='badge-meta'>
              <div>Fecha: ${d(f(a.issueDate))}</div>
              ${!1!==a.useExpirationDate?`<div>Vence: ${d(f(a.expirationDate))}</div>`:""}
            </div>
          </div>
        </div>
        ${b.isFirst&&a.documentHeader?.trim()?`<div class='document-header'>${d(a.documentHeader).replace(/&lt;(\/?)(b|strong|u|ul|ol|li|div|p|br)&gt;/gi,"<$1$2>").replace(/&lt;font size=&quot;([235])&quot;&gt;/gi,'<font size="$1">').replace(/&lt;\/font&gt;/gi,"</font>")}</div>`:""}
        <div class='company-meta'>
          <span>RUC: ${s}</span>
          <span>${t}</span>
          <span>${p||n}</span>
        </div>
        <div class='info-strip'>
          <div class='info-main'>
            <div style='display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:10px;line-height:1.25;'>
              <div style='font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#374151;'>${r}</div>
              <div style='color:#6b7280;'>\xb7</div>
              <div style='color:#374151;'>${p}</div>
              <div style='color:#6b7280;'>\xb7</div>
              <div style='color:#1d4ed8;text-decoration:underline;word-break:break-word;'>${q}</div>
            </div>
          </div>
          <div class='info-box'>
            <div style='font-size:13px;font-weight:700;color:#0f172a;line-height:1.2;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;'>${j}</div>
            <div style='margin-top:8px;color:#475569;font-size:12px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;'>
              <div>RUC: ${k}</div>
              <div>${l}</div>
              <div>${m} \xb7 ${n}</div>
            </div>
          </div>
        </div>
        ${b.isFirst,`<div class='title-strip'>${A}</div>`}
        ${C}
        ${b.isFirst&&z?`<div style='margin-top:12px;border:1px solid #e2e8f0;border-radius:16px;padding:10px 12px;color:#475569;font-size:11px;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>${d(`Placa: ${a.plate||"-"} \xb7 C\xf3digo: ${a.codeReference||"-"} \xb7 Contrato marco: ${a.frameworkContract||"-"} \xb7 Pos. contrato marco: ${a.frameworkContractPosition||"-"} \xb7 T1/T2/FLT: ${a.technicalParameters||"-"}`)}</div>`:""}
        <div class='table-wrap'>
          <table>
            <thead>
              <tr>
                <th style='width:12%;'>Cant.</th>
                <th>Descripci\xf3n</th>
                <th style='width:18%; text-align:right;'>P. Unit.</th>
                ${w?"<th style='width:16%; text-align:right;'>Desc.</th>":""}
                <th style='text-align:right;width:${w?"18%":"28%"};'>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${c={...a,items:b.items},g=c.items?.some(a=>!(a.noDiscount??a.discount<=0)),!c.items?.length?`
      <tr>
        <td colspan="${g?5:4}" style="padding:14px;border-top:1px solid #e2e8f0;color:#64748b;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;">Sin \xedtems registrados</td>
      </tr>
    `:c.items.map(a=>`
        <tr>
          <td style="padding:12px 10px;border-top:1px solid #e2e8f0;vertical-align:top;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;">${d(String(a.quantity))}</td>
          <td style="padding:12px 10px;border-top:1px solid #e2e8f0;vertical-align:top;font-weight:600;color:#0f172a;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;">${d(a.description)}</td>
          <td style="padding:12px 10px;border-top:1px solid #e2e8f0;vertical-align:top;text-align:right;white-space:nowrap;">${d(e(a.unitPrice,c.currency))}</td>
          ${g?`<td style="padding:12px 10px;border-top:1px solid #e2e8f0;vertical-align:top;text-align:right;white-space:nowrap;">${a.noDiscount?"-":d(e(a.discount,c.currency))}</td>`:""}
          <td style="padding:12px 10px;border-top:1px solid #e2e8f0;vertical-align:top;text-align:right;font-weight:600;white-space:nowrap;">${d(e(a.subtotal,c.currency))}</td>
        </tr>
      `).join("")}
            </tbody>
          </table>
        </div>
        ${D}
        ${b.isLast?`<div class='footer'><div>Sin otro particular, atentamente.</div><div class='footer-note'>${o}</div></div>`:""}
      </div>
    `}).join("")}
</body>
</html>`}async function k(a,b){throw Error("La descarga de PDF debe ejecutarse en el navegador.")}async function l(a,b){await k(a,b)}a.s(["buildQuotationPreviewHtml",()=>j,"downloadQuotationPdf",()=>l,"fetchQuotationPdfBlob",()=>k])},81554,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(14166),e=a.i(96221),f=a.i(92258),g=a.i(40695),h=a.i(5522),i=a.i(83196),j=a.i(65733),k=a.i(25503),l=a.i(51409);let m={greeting:"<p>Estimado/a cliente,</p><p>Adjuntamos la cotización para su revisión.</p>",followup:"<p>Quedamos atentos a sus comentarios o consultas adicionales.</p>",closing:"<p>Saludos cordiales,<br/>MT-Cotiza</p>"};function n({open:a,onOpenChange:n,quotation:p,onSent:q}){let[r,s]=(0,c.useState)(!1),[t,u]=(0,c.useState)(!1),[v,w]=(0,c.useState)(""),[x,y]=(0,c.useState)(""),[z,A]=(0,c.useState)(""),[B,C]=(0,c.useState)(""),[D,E]=(0,c.useState)(!1),[F,G]=(0,c.useState)(!1),[H,I]=(0,c.useState)(""),[J,K]=(0,c.useState)(null),[L,M]=(0,c.useState)(""),[N,O]=(0,c.useState)("application/pdf"),P=(0,c.useRef)(null),Q=(0,c.useMemo)(()=>p?`Cotizaci\xf3n ${p.code} - ${p.customerName}`:"",[p]),R=(0,c.useMemo)(()=>{let a;return p?(a=`Estimado/a ${p.customerName},

Adjuntamos la cotizaci\xf3n ${p.code} para su revisi\xf3n.
T\xedtulo: ${p.title}
Fecha: ${(0,k.shortDate)(p.issueDate)}
Monto: ${(0,k.money)(p.total,p.currency)}

Quedamos atentos a sus comentarios.

Saludos,
MT-Cotiza`.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),`<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#111827">${a.split(/\n\s*\n/).map(a=>`<p style="margin:0 0 12px;">${a.replaceAll("\n","<br/>")}</p>`).join("")}</div>`):""},[p]);(0,c.useEffect)(()=>{if(!a||!p)return;w(""),y(p.customerEmail||""),A(Q),C(R),G(!1),E(!0),I(`cotizacion-${p.code}.pdf`),K(null),M(""),O("application/pdf");let b=!1,c=async()=>{try{let a=await (0,l.fetchQuotationPdfBlob)(p.id,p.code);if(b||!a)return;let c=`cotizacion-${p.code}.pdf`;I(c),K(a.size),O(a.type||"application/pdf");let d=await T(a);b||(M(d),G(!0))}catch{b||w("No se pudo preparar el PDF adjunto para el correo.")}finally{b||E(!1)}};return(async()=>{if(!p.customerEmail){s(!0);try{let a=await (0,k.apiFetch)(`/customers/${p.customerId}`);!b&&a.email&&y(a.email)}catch{}finally{b||s(!1)}}})(),c(),()=>{b=!0}},[a,p,R,Q]),(0,c.useEffect)(()=>{P.current&&P.current.innerHTML!==B&&(P.current.innerHTML=B)},[B]);let S=()=>{t||n(!1)},T=a=>new Promise((b,c)=>{let d=new FileReader;d.onload=()=>{let a=String(d.result||""),c=a.indexOf(",");b(c>=0?a.slice(c+1):a)},d.onerror=()=>c(Error("No se pudo convertir el adjunto.")),d.readAsDataURL(a)}),U=(a,b)=>{"undefined"!=typeof document&&(P.current?.focus(),document.execCommand(a,!1,b),C(P.current?.innerHTML||""))},V=a=>{U("insertHTML",m[a])},W=async()=>{if(p){u(!0),w("");try{let a=await (0,k.apiFetch)(`/quotations/${p.id}/send-email`,{method:"POST",body:JSON.stringify({recipientEmail:x,subject:z,htmlBody:B,attachmentFileName:H,attachmentMimeType:N,attachmentBase64:L})});q?.(a.message||`Cotizaci\xf3n enviada a ${a.recipientEmail}.`),n(!1)}catch(a){w(a instanceof Error?a.message:"No se pudo enviar la cotización.")}finally{u(!1)}}};return(0,b.jsx)(j.Dialog,{open:a,onOpenChange:a=>{a||S()},children:(0,b.jsxs)(j.DialogContent,{className:"sm:max-w-2xl",children:[(0,b.jsxs)(j.DialogHeader,{children:[(0,b.jsx)("div",{className:"mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/12 text-sky-700",children:(0,b.jsx)(f.Mail,{className:"h-5 w-5"})}),(0,b.jsx)(j.DialogTitle,{children:"Enviar cotización por correo"}),(0,b.jsx)(j.DialogDescription,{children:"Revisa y edita el correo antes de enviarlo. La cotización se adjuntará en PDF."})]}),(0,b.jsxs)("div",{className:"grid gap-4",children:[(0,b.jsxs)("div",{className:"border-border/70 bg-muted/30 rounded-2xl border p-4 text-sm",children:[(0,b.jsx)("div",{className:"text-foreground font-medium",children:p?.code}),(0,b.jsx)("div",{className:"text-muted-foreground",children:p?.customerName}),(0,b.jsx)("div",{className:"text-muted-foreground",children:p?`${p.title} \xb7 ${(0,k.money)(p.total,p.currency)}`:""})]}),(0,b.jsx)("div",{className:"rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4 text-sm",children:(0,b.jsxs)("div",{className:"flex items-start gap-3",children:[(0,b.jsx)("div",{className:"flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm ring-1 ring-sky-500/10",children:(0,b.jsx)(d.FileCheck2,{className:"h-5 w-5"})}),(0,b.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,b.jsx)("div",{className:"text-foreground font-medium",children:"Adjunto PDF de cotización"}),(0,b.jsx)("div",{className:"text-muted-foreground",children:D?"Preparando el PDF para el correo...":F?`${H}${J?` \xb7 ${(J/1024).toFixed(1)} KB`:""}`:"El PDF aún no está listo."})]})]})}),(0,b.jsx)(i.FormField,{label:"Destinatario",hint:r?"Buscando correo del cliente...":void 0,children:(0,b.jsx)(h.Input,{type:"email",placeholder:"correo@cliente.com",value:x,onChange:a=>y(a.target.value),required:!0})}),(0,b.jsx)(i.FormField,{label:"Asunto",children:(0,b.jsx)(h.Input,{placeholder:"Asunto",value:z,onChange:a=>A(a.target.value),required:!0})}),(0,b.jsxs)(i.FormField,{label:"Cuerpo del correo",children:[(0,b.jsxs)("div",{className:"border-border/70 bg-background overflow-hidden rounded-2xl border",children:[(0,b.jsxs)("div",{className:"border-border/70 bg-muted/30 flex flex-wrap items-center gap-2 border-b p-2",children:[(0,b.jsx)(o,{label:"Negrita",onClick:()=>U("bold"),children:(0,b.jsx)("strong",{children:"B"})}),(0,b.jsx)(o,{label:"Cursiva",onClick:()=>U("italic"),children:(0,b.jsx)("em",{children:"I"})}),(0,b.jsx)(o,{label:"Subrayado",onClick:()=>U("underline"),children:(0,b.jsx)("span",{className:"underline",children:"U"})}),(0,b.jsx)("div",{className:"bg-border mx-1 h-6 w-px"}),(0,b.jsx)(o,{label:"Lista con viñetas",onClick:()=>U("insertUnorderedList"),children:"• Lista"}),(0,b.jsx)(o,{label:"Lista numerada",onClick:()=>U("insertOrderedList"),children:"1. Lista"}),(0,b.jsx)("div",{className:"bg-border mx-1 h-6 w-px"}),(0,b.jsx)(o,{label:"Plantilla saludo",onClick:()=>V("greeting"),children:"Saludo"}),(0,b.jsx)(o,{label:"Plantilla seguimiento",onClick:()=>V("followup"),children:"Seguimiento"}),(0,b.jsx)(o,{label:"Plantilla cierre",onClick:()=>V("closing"),children:"Cierre"}),(0,b.jsx)("div",{className:"bg-border mx-1 h-6 w-px"}),(0,b.jsx)(o,{label:"Limpiar formato",onClick:()=>{if("undefined"==typeof document)return;let a=P.current?.innerHTML||"",b=P.current?.innerText||P.current?.textContent||"";P.current?.focus(),document.execCommand("removeFormat",!1),document.execCommand("unlink",!1);let c=b.split(/\n{2,}/).map(a=>`<p>${a.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;").replaceAll("\n","<br/>")}</p>`).join("");P.current&&(P.current.innerHTML=c||a,C(P.current.innerHTML||""))},children:"Limpiar"})]}),(0,b.jsx)("div",{ref:P,contentEditable:!0,suppressContentEditableWarning:!0,onInput:a=>C(a.currentTarget.innerHTML),className:"min-h-[240px] rounded-b-2xl px-4 py-3 text-sm leading-6 outline-none [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6",style:{whiteSpace:"normal"}})]}),(0,b.jsx)("div",{className:"text-muted-foreground mt-2 text-xs",children:"Puedes dar formato básico, insertar bloques rápidos y editar el cuerpo antes de enviar."})]}),v?(0,b.jsx)("div",{className:"rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700",children:v}):null]}),(0,b.jsxs)(j.DialogFooter,{children:[(0,b.jsx)(g.Button,{variant:"outline",onClick:S,disabled:t,children:"Cancelar"}),(0,b.jsxs)(g.Button,{onClick:()=>void W(),disabled:t||D||!F||!x||!z||!B,children:[t?(0,b.jsx)(e.Loader2,{className:"h-4 w-4 animate-spin"}):null,t?"Enviando...":"Enviar"]})]})]})})}function o({label:a,onClick:c,children:d}){return(0,b.jsx)("button",{type:"button",onMouseDown:a=>a.preventDefault(),onClick:c,title:a,className:"border-border/70 bg-background text-foreground hover:bg-muted inline-flex items-center rounded-lg border px-2.5 py-1.5 text-xs font-medium transition",children:d})}a.s(["QuotationEmailDialog",()=>n])}];

//# sourceMappingURL=_f4ab9375._.js.map