module.exports=[41398,a=>{"use strict";var b=a.i(87924);a.i(38246);var c=a.i(97895);function d({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card",className:(0,c.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",a),...d})}function e({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card-header",className:(0,c.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",a),...d})}function f({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card-title",className:(0,c.cn)("leading-none font-semibold",a),...d})}function g({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card-content",className:(0,c.cn)("px-6",a),...d})}function h({title:a,description:c,action:d}){return(0,b.jsxs)("div",{className:"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",children:[(0,b.jsxs)("div",{className:"min-w-0",children:[(0,b.jsx)("h1",{className:"text-2xl font-semibold tracking-tight sm:text-3xl",children:a}),c?(0,b.jsx)("p",{className:"text-muted-foreground mt-1 text-sm",children:c}):null]}),d]})}function i({value:a}){let d=a.toUpperCase(),e=d.includes("ACTIV")||d.includes("HABIL")||d.includes("APROB")||d.includes("PAG")||d.includes("FINAL")?"bg-emerald-500/12 text-emerald-700 ring-emerald-500/25":d.includes("INACT")||d.includes("RECH")||d.includes("ANUL")||d.includes("CANCEL")?"bg-rose-500/12 text-rose-700 ring-rose-500/25":d.includes("PEND")||d.includes("REVISION")||d.includes("PROCESO")?"bg-amber-500/12 text-amber-700 ring-amber-500/25":"bg-sky-500/12 text-sky-700 ring-sky-500/25";return(0,b.jsx)("span",{className:(0,c.cn)("inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 sm:text-xs",e),children:a.replaceAll("_"," ")})}function j({title:a,action:c,children:h}){return(0,b.jsxs)(d,{className:"border-border/70",children:[(0,b.jsxs)(e,{className:"flex min-w-0 flex-col items-start justify-between gap-4 sm:flex-row sm:items-center",children:[(0,b.jsx)(f,{children:a}),c]}),(0,b.jsx)(g,{className:"min-w-0 overflow-hidden",children:h})]})}a.s(["PageHeader",()=>h,"Panel",()=>j,"StatusBadge",()=>i],41398)},5522,a=>{"use strict";var b=a.i(87924),c=a.i(97895);function d({className:a,type:d,...e}){let f=e.title||e["aria-label"]||("string"==typeof e.placeholder?e.placeholder:void 0)||e.name;return(0,b.jsx)("input",{type:d,"data-slot":"input",title:f,"aria-label":e["aria-label"]||f,className:(0,c.cn)("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",a),...e})}a.s(["Input",()=>d])},83196,a=>{"use strict";var b=a.i(87924),c=a.i(97895);function d({label:a,children:d,className:e,hint:f,required:g}){return(0,b.jsxs)("div",{className:(0,c.cn)("space-y-2",e),children:[(0,b.jsxs)("label",{className:"text-foreground flex items-center gap-2 text-sm font-medium",children:[a,g?(0,b.jsx)("span",{className:"ml-1 text-rose-600",children:"*"}):null]}),d,f?(0,b.jsx)("div",{className:"text-muted-foreground text-xs",children:f}):null]})}a.s(["FormField",()=>d])},46893,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(97895);let e=c.forwardRef(({className:a,value:e,onInput:f,...g},h)=>{let i=c.useRef(null),j=g.title||g["aria-label"]||("string"==typeof g.placeholder?g.placeholder:void 0)||g.name;return c.useLayoutEffect(()=>{let a=i.current;a&&(a.style.height="auto",a.style.height=`${a.scrollHeight}px`)},[e]),(0,b.jsx)("textarea",{ref:function(...a){return b=>{for(let c of a)c&&("function"==typeof c?c(b):c.current=b)}}(i,h),"data-slot":"textarea",title:j,"aria-label":g["aria-label"]||j,className:(0,d.cn)("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full resize-none overflow-hidden whitespace-pre-wrap break-words rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]",a),onInput:a=>{let b=a.currentTarget;b.style.height="auto",b.style.height=`${b.scrollHeight}px`,f?.(a)},value:e,style:{overflowWrap:"anywhere",wordBreak:"break-word"},...g})});e.displayName="Textarea",a.s(["Textarea",()=>e])},51409,a=>{"use strict";var b=a.i(25503),c=a.i(24537),d=a.i(96109),e=a.i(19753);function f(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function g(a,b="PEN"){return new Intl.NumberFormat("es-PE",{style:"currency",currency:b,maximumFractionDigits:2}).format(a??0)}function h(a){if(!a)return"-";if(/^\d{2}\/\d{2}\/\d{4}$/.test(a))return a;let b=a.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(b)return`${b[3]}/${b[2]}/${b[1]}`;let c=new Date(a);return Number.isNaN(c.getTime())?"-":`${String(c.getDate()).padStart(2,"0")}/${String(c.getMonth()+1).padStart(2,"0")}/${c.getFullYear()}`}async function i(a){return new Promise((b,c)=>{let d=new FileReader;d.onload=()=>b(String(d.result||"")),d.onerror=()=>c(Error("No se pudo convertir el logo a base64.")),d.readAsDataURL(a)})}async function j(a){let c=(0,b.normalizeAssetPath)(a);if(!c)return"";try{let a=await fetch(c.startsWith("http")?c:`${window.location.origin}${c}`);if(!a.ok)return"";return await i(await a.blob())}catch{return""}}function k(a,b){return`<div class="data-row"><strong>${f(a)}</strong><span>: ${f(b||"-")}</span></div>`}async function l(a,b){let i=await j(b?.logoAsset),l=e.QUOTATION_COMPANY_TITLE,m=(0,c.buildQuotationPageChunks)(a),n=!!a.items?.some(a=>!(a.noDiscount??a.discount<=0)),o=i?`<img src="${i}" alt="${f(l)}" />`:`<div class="logo-fallback">${f(b?.logoText||"MT")}</div>`,p=`<section class="engineering-profile">
    <div><h2>\xc1REA INGENIER\xcdA MECATR\xd3NICA</h2>
    <div class="engineering-list">${e.QUOTATION_ENGINEERING_PROFILE.map(a=>`<p><strong>${f(a.title)}:</strong> ${f(a.description)}</p>`).join("")}</div></div>
    <div class="provider-data">
      ${k("RUC",a.logoText||b?.ruc)}
      ${k("DIRECCIÓN",b?.address)}
      ${k("CÓDIGO PROVEEDOR",a.codeReference)}
      ${k("CONTRATO MARCO",a.frameworkContract)}
      ${k("POSICIÓN",a.frameworkContractPosition)}
    </div>
  </section>`;return`<!doctype html><html lang="es"><head><meta charset="utf-8" /><style>
    @page{size:A4;margin:0}*{box-sizing:border-box}html,body{margin:0;background:#fff;color:#111827}body{font-family:Arial,Helvetica,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .page{width:210mm;min-height:297mm;padding:12mm 12mm 14mm;page-break-after:always}.page:last-child{page-break-after:auto}
    header{display:grid;grid-template-columns:34mm 1fr 48mm;gap:4mm;align-items:start;border-bottom:2px solid #075985;padding-bottom:3mm}.logo{height:25mm;display:flex;align-items:center;justify-content:center}.logo img{max-height:25mm;max-width:34mm;object-fit:contain}.logo-fallback{font-size:22px;font-weight:800}.company-data{font-size:8px;line-height:1.45}.company-data h1{font-size:12px;margin:0 0 2mm;text-transform:uppercase}.quote-box{border:2px solid #b45309;border-radius:10px;padding:3mm;font-size:8px;line-height:1.5}.quote-label{font-size:8px;font-weight:800;letter-spacing:.12em}.quote-code{font-size:15px;font-weight:800;margin:1mm 0}
    .engineering-profile{display:grid;grid-template-columns:1fr 48mm;gap:3mm;margin-top:2mm;padding-bottom:2mm;border-bottom:1px solid #cbd5e1}.engineering-profile h2{margin:0;color:#0c4a6e;font-size:8px;font-weight:800;letter-spacing:.12em}.engineering-list{margin-top:1mm}.engineering-list p{margin:.5mm 0;color:#475569;font-size:5.7px;line-height:1.3}.engineering-list strong{color:#111827}.provider-data{padding-left:2mm;border-left:2px solid #d97706;font-size:6px}.provider-data .data-row{display:block;margin-bottom:.7mm}.provider-data .data-row strong{display:block}
    .document-header{margin-top:2mm;padding-bottom:2mm;border-bottom:1px solid #cbd5e1;font-size:8px;line-height:1.4}.section-title{margin-top:3mm;padding:1mm 0;border-top:2px solid #075985;border-bottom:2px solid #075985;font-size:8px;font-weight:800;letter-spacing:.1em}.data-grid,.operation-grid{display:grid;grid-template-columns:1fr 1fr;gap:1mm 5mm;margin-top:2mm;font-size:8px}.operation-grid{grid-template-columns:1fr;max-width:90mm;border-top:1px solid #94a3b8;border-bottom:1px solid #94a3b8;padding:2mm 0}.data-row{display:grid;grid-template-columns:28mm 1fr;gap:1mm;min-width:0}.data-row strong{font-size:7px}.data-row span{overflow-wrap:anywhere}.parameters{margin-top:1mm;font-size:7px}.scope{margin-top:2mm;border:1px solid #cbd5e1;padding:2mm;font-size:8px;white-space:pre-wrap}
    .table-wrap{margin-top:3mm;border:1px solid #111827}.table-wrap table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:8px}.table-wrap th{background:#d1d5db;padding:2mm 1mm;border-right:1px solid #111827;text-align:left}.table-wrap td{padding:2mm 1mm;border-top:1px solid #111827;border-right:1px solid #111827;vertical-align:top;white-space:pre-wrap;overflow-wrap:anywhere}.table-wrap th:last-child,.table-wrap td:last-child{border-right:0}.center{text-align:center}.right{text-align:right}.strong{font-weight:700}.empty{text-align:center;color:#64748b;padding:5mm!important}
    .amount-row{display:grid;grid-template-columns:1fr 48mm;border:1px solid #111827;border-top:0;font-size:8px}.amount-row>div{padding:2mm}.grand-total{display:flex;justify-content:space-between;border-left:1px solid #111827;font-size:10px}.tax-warning{margin-top:1mm;color:#dc2626;font-size:8px;font-weight:800}.summary-line{display:flex;justify-content:flex-end;gap:5mm;margin-top:1mm;font-size:8px;color:#475569}.terms-grid{display:grid;grid-template-columns:1fr 1fr;gap:5mm;border:1px solid #111827;margin-top:6mm;padding:4mm;font-size:7px;line-height:1.45;white-space:pre-wrap}.terms-grid h3{margin:0 0 2mm;text-align:center;color:#dc2626;font-size:8px}.signatures{display:grid;grid-template-columns:1fr 1fr;gap:25mm;margin-top:14mm;text-align:center;font-size:7px;font-weight:700}.signatures div{border-top:1px solid #111827;padding-top:2mm;text-transform:uppercase}
  </style></head><body>${m.map(c=>{var e;let i=m.slice(0,c.pageNumber-1).reduce((a,b)=>a+b.items.length,0),j=c.isFirst?`<div class="section-title">DATOS DE EMPRESA</div>
         <div class="data-grid">
           ${k("RAZÓN SOCIAL",a.customerName)}
           ${k("ATENCIÓN",a.attentionTo)}
           ${k("DIRECCIÓN",a.customerAddress)}
           ${k("REFERENCIA",a.reference||a.title)}
           ${k(a.customerDocumentType||"RUC",a.customerDocumentNumber)}
           ${k("TELÉFONO",a.customerPhone)}
         </div>
         ${a.description?`<div class="scope"><strong>ALCANCE:</strong> ${f(a.description)}</div>`:""}
         <div class="operation-grid">
           ${k("DESTINO",a.destination)}
           ${k("PLACA",a.plate)}
           ${k("N.° SERIE",a.serialNumber)}
           ${k("GUÍA N.°",a.guideNumber)}
           ${k("FECHA",h(a.issueDate))}
         </div>
         ${a.technicalParameters?`<div class="parameters">${k("PARÁMETROS",a.technicalParameters)}</div>`:""}`:"",q=c.isLast?`<div class="amount-row">
           <div><strong>SON:</strong> ${f((0,d.amountInWords)(a.total,a.currency))}</div>
           <div class="grand-total"><span>TOTAL</span><strong>${f(g(a.total,a.currency))}</strong></div>
         </div>
         ${a.includeTax?"":'<div class="tax-warning">PRECIO NO INCLUYE I.G.V.</div>'}
         ${a.includeDiscount||a.includeTax?`<div class="summary-line">
           <span>Subtotal: ${f(g(a.subtotal,a.currency))}</span>
           ${a.includeDiscount?`<span>Descuento: ${f(g(a.discount,a.currency))}</span>`:""}
           ${a.includeTax?`<span>Impuesto: ${f(g(a.tax,a.currency))}</span>`:""}
         </div>`:""}
         <div class="terms-grid">
           <div><h3>T\xc9RMINOS Y CONDICIONES</h3><div>${f(a.hideCommercialTerms?"-":a.commercialTerms||"-")}</div></div>
           <div><h3>CUENTA BANCARIA / DATOS DE PAGO</h3><div>${f(a.hideObservations?"-":a.observations||"-")}</div></div>
         </div>
         <div class="signatures"><div>${f(l)}</div><div>CLIENTE</div></div>`:"";return`<section class="page">
      <header>
        <div class="logo">${o}</div>
        <div class="company-data">
          <h1>${f(l)}</h1>
          <div>RUC: ${f(a.logoText||b?.ruc||"-")}</div>
          <div>${f(b?.address||"-")}</div>
          <div>${f(a.reportLink||b?.phone||"-")}</div>
          <div>${f(a.reportsEmail||b?.email||"-")}</div>
        </div>
        <div class="quote-box">
          <div class="quote-label">${c.isFirst?"COTIZACIÓN N.°":`CONTINUACI\xd3N ${c.pageNumber}/${c.totalPages}`}</div>
          <div class="quote-code">${f(a.code)}</div>
          <div>Fecha: ${f(h(a.issueDate))}</div>
          ${!1!==a.useExpirationDate&&a.expirationDate?`<div>Vence: ${f(h(a.expirationDate))}</div>`:""}
        </div>
      </header>
      ${c.isFirst?p:""}
      ${c.isFirst&&a.documentHeader?.trim()?`<div class="document-header">${f(a.documentHeader).replace(/&lt;(\/?)(b|strong|u|ul|ol|li|div|p|br)&gt;/gi,"<$1$2>").replace(/&lt;font size=&quot;([235])&quot;&gt;/gi,'<font size="$1">').replace(/&lt;\/font&gt;/gi,"</font>")}</div>`:""}
      ${j}
      <div class="table-wrap"><table><thead><tr>
        <th style="width:7%">\xcdTEM</th><th style="width:13%">C\xd3DIGO</th><th>DESCRIPCI\xd3N</th>
        <th style="width:9%">CANT.</th><th style="width:14%" class="right">P/UNITARIO</th>
        ${n?'<th style="width:12%" class="right">DESC.</th>':""}
        <th style="width:14%" class="right">IMPORTE</th>
      </tr></thead><tbody>${e={...a,items:c.items},!e.items?.length?`<tr><td colspan="${n?7:6}" class="empty">Sin \xedtems registrados</td></tr>`:e.items.map((a,b)=>{let c=a.subtotal??a.quantity*a.unitPrice-(a.noDiscount?0:a.discount);return`<tr>
        <td class="center">${i+b+1}</td>
        <td>${f(a.code||"-")}</td>
        <td>${f(a.description)}</td>
        <td class="center">${f(String(a.quantity))}</td>
        <td class="right">${f(g(a.unitPrice,e.currency))}</td>
        ${n?`<td class="right">${a.noDiscount?"-":f(g(a.discount,e.currency))}</td>`:""}
        <td class="right strong">${f(g(c,e.currency))}</td>
      </tr>`}).join("")}</tbody></table></div>
      ${q}
    </section>`}).join("")}</body></html>`}async function m(a,b){throw Error("La descarga de PDF debe ejecutarse en el navegador.")}async function n(a,b){await m(a,b)}a.s(["buildQuotationPreviewHtml",()=>l,"downloadQuotationPdf",()=>n,"fetchQuotationPdfBlob",()=>m])}];

//# sourceMappingURL=_fad973f9._.js.map