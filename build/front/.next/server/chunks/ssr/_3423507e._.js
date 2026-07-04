module.exports=[41398,a=>{"use strict";var b=a.i(87924);a.i(38246);var c=a.i(97895);function d({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card",className:(0,c.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",a),...d})}function e({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card-header",className:(0,c.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",a),...d})}function f({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card-title",className:(0,c.cn)("leading-none font-semibold",a),...d})}function g({className:a,...d}){return(0,b.jsx)("div",{"data-slot":"card-content",className:(0,c.cn)("px-6",a),...d})}function h({title:a,description:c,action:d}){return(0,b.jsxs)("div",{className:"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",children:[(0,b.jsxs)("div",{className:"min-w-0",children:[(0,b.jsx)("h1",{className:"text-2xl font-semibold tracking-tight sm:text-3xl",children:a}),c?(0,b.jsx)("p",{className:"text-muted-foreground mt-1 text-sm",children:c}):null]}),d]})}function i({value:a}){let d=a.toUpperCase(),e=d.includes("ACTIV")||d.includes("HABIL")||d.includes("APROB")||d.includes("PAG")||d.includes("FINAL")?"bg-emerald-500/12 text-emerald-700 ring-emerald-500/25":d.includes("INACT")||d.includes("RECH")||d.includes("ANUL")||d.includes("CANCEL")?"bg-rose-500/12 text-rose-700 ring-rose-500/25":d.includes("PEND")||d.includes("REVISION")||d.includes("PROCESO")?"bg-amber-500/12 text-amber-700 ring-amber-500/25":"bg-sky-500/12 text-sky-700 ring-sky-500/25";return(0,b.jsx)("span",{className:(0,c.cn)("inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 sm:text-xs",e),children:a.replaceAll("_"," ")})}function j({title:a,action:c,children:h}){return(0,b.jsxs)(d,{className:"border-border/70",children:[(0,b.jsxs)(e,{className:"flex min-w-0 flex-col items-start justify-between gap-4 sm:flex-row sm:items-center",children:[(0,b.jsx)(f,{children:a}),c]}),(0,b.jsx)(g,{className:"min-w-0 overflow-hidden",children:h})]})}a.s(["PageHeader",()=>h,"Panel",()=>j,"StatusBadge",()=>i],41398)},5522,a=>{"use strict";var b=a.i(87924),c=a.i(97895);function d({className:a,type:d,...e}){let f=e.title||e["aria-label"]||("string"==typeof e.placeholder?e.placeholder:void 0)||e.name;return(0,b.jsx)("input",{type:d,"data-slot":"input",title:f,"aria-label":e["aria-label"]||f,className:(0,c.cn)("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",a),...e})}a.s(["Input",()=>d])},83196,a=>{"use strict";var b=a.i(87924),c=a.i(97895);function d({label:a,children:d,className:e,hint:f,required:g}){return(0,b.jsxs)("div",{className:(0,c.cn)("space-y-2",e),children:[(0,b.jsxs)("label",{className:"text-foreground flex items-center gap-2 text-sm font-medium",children:[a,g?(0,b.jsx)("span",{className:"ml-1 text-rose-600",children:"*"}):null]}),d,f?(0,b.jsx)("div",{className:"text-muted-foreground text-xs",children:f}):null]})}a.s(["FormField",()=>d])},46893,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(97895);let e=c.forwardRef(({className:a,value:e,onInput:f,...g},h)=>{let i=c.useRef(null),j=g.title||g["aria-label"]||("string"==typeof g.placeholder?g.placeholder:void 0)||g.name;return c.useLayoutEffect(()=>{let a=i.current;a&&(a.style.height="auto",a.style.height=`${a.scrollHeight}px`)},[e]),(0,b.jsx)("textarea",{ref:function(...a){return b=>{for(let c of a)c&&("function"==typeof c?c(b):c.current=b)}}(i,h),"data-slot":"textarea",title:j,"aria-label":g["aria-label"]||j,className:(0,d.cn)("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full resize-none overflow-hidden whitespace-pre-wrap break-words rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]",a),onInput:a=>{let b=a.currentTarget;b.style.height="auto",b.style.height=`${b.scrollHeight}px`,f?.(a)},value:e,style:{overflowWrap:"anywhere",wordBreak:"break-word"},...g})});e.displayName="Textarea",a.s(["Textarea",()=>e])},51409,a=>{"use strict";var b=a.i(25503),c=a.i(24537);function d(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function e(a,b="PEN"){return new Intl.NumberFormat("es-PE",{style:"currency",currency:b,maximumFractionDigits:2}).format(a??0)}function f(a){return a?new Date(a).toLocaleDateString("es-PE"):"-"}async function g(a){return new Promise((b,c)=>{let d=new FileReader;d.onload=()=>b(String(d.result||"")),d.onerror=()=>c(Error("No se pudo convertir el logo a base64.")),d.readAsDataURL(a)})}async function h(a){let c=(0,b.normalizeAssetPath)(a);if(!c)return"";try{let a=await fetch(c.startsWith("http")?c:`${window.location.origin}${c}`);if(!a.ok)return"";return await g(await a.blob())}catch{return""}}function i(a,b,c){return`<div class='summary-row'><span>${d(a)}</span><strong>${d(e(b,c))}</strong></div>`}async function j(a,b){let g=await h(b?.logoAsset),j=d(b?.businessName||b?.name||"MT-Cotiza"),k=d(b?.ruc||"-"),l=d(b?.address||"-"),m=d(b?.phone||"-"),n=d(b?.email||"-"),o=d(b?.footerMessage||"Documento emitido para control comercial interno."),p=d(a.reportsEmail||b?.reportsEmail||b?.email||"informes@mt-cotiza.com"),q=d(a.reportLink||b?.reportLink||"https://mt-cotiza.com"),r=d(a.logoText||b?.logoText||b?.name||"MT-Cotiza"),s=!1!==a.includeDiscount,t=!1!==a.includeTax,u=a.items?.some(a=>!(a.noDiscount??a.discount<=0)),v=!0!==a.hideObservations,w=!0!==a.hideCommercialTerms,x=(0,c.buildQuotationPageChunks)(a),y=g?`<img src="${g}" alt="${j}" style="height:96px;max-width:360px;object-fit:contain;display:block;" />`:`<div style="display:inline-flex;align-items:center;justify-content:center;width:120px;height:96px;border-radius:18px;background:#e0f2fe;color:#0f172a;font-weight:700;font-size:28px;">${d(b?.logoText||b?.name||"MT")}</div>`;return`
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
  ${x.map(b=>{var c;let g,h=b.isFirst?"COTIZACIÓN":`CONTINUACI\xd3N ${b.pageNumber}/${b.totalPages}`,x=b.isFirst?d(a.title||"Cotización comercial"):`Continuaci\xf3n de ${d(a.title||"Cotización comercial")}`,z=b.isFirst?`
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
            ${s?i("Descuento global",a.discount,a.currency):""}
            ${t?i("Impuesto",a.tax,a.currency):""}
            <div class='summary-row' style='padding-top:12px;border-top:1px solid #e2e8f0;font-size:15px;font-weight:700;'><span>Total</span><strong>${d(e(a.total,a.currency))}</strong></div>
          </div>
        </div>
      `:"",A=b.isLast?`
        <div class='sections'>
          <div>
            ${v?`<div class='card'><div class='box-title'>Observaciones</div><div class='box-value'>${d(a.observations||"-")}</div></div><div style='height:16px'></div>`:""}
            ${w?`<div class='card'><div class='box-title'>Condiciones comerciales</div><div class='box-value'>${d(a.commercialTerms||"-")}</div></div>`:""}
          </div>
          <div class='totals'>
            <div class='totals-row'><span>Subtotal</span><strong>${d(e(a.subtotal,a.currency))}</strong></div>
            ${s?`<div class='totals-row'><span>Descuento</span><strong>${d(e(a.discount,a.currency))}</strong></div>`:""}
            ${t?`<div class='totals-row'><span>Impuesto</span><strong>${d(e(a.tax,a.currency))}</strong></div>`:""}
            <div class='totals-row total'><span>Total</span><strong>${d(e(a.total,a.currency))}</strong></div>
          </div>
        </div>
      `:"";return`
      <div class='page'>
        <div class='header'>
          <div class='company'>
            ${y}
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
        ${b.isFirst&&a.documentHeader?.trim()?`<div class='document-header'>${d(a.documentHeader)}</div>`:""}
        <div class='company-meta'>
          <span>RUC: ${k}</span>
          <span>${m}</span>
          <span>${n}</span>
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
        ${b.isFirst,`<div class='title-strip'>${x}</div>`}
        ${z}
        ${b.isFirst?`<div style='margin-top:12px;border:1px solid #e2e8f0;border-radius:16px;padding:10px 12px;color:#475569;font-size:11px;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>${d(`Placa: ${a.plate||"-"} \xb7 C\xf3digo: ${a.codeReference||"-"} \xb7 Contrato marco: ${a.frameworkContract||"-"} \xb7 Pos. contrato marco: ${a.frameworkContractPosition||"-"} \xb7 T1/T2/FLT: ${a.technicalParameters||"-"}`)}</div>`:""}
        <div class='table-wrap'>
          <table>
            <thead>
              <tr>
                <th style='width:12%;'>Cant.</th>
                <th>Descripci\xf3n</th>
                <th style='width:18%; text-align:right;'>P. Unit.</th>
                ${u?"<th style='width:16%; text-align:right;'>Desc.</th>":""}
                <th style='text-align:right;width:${u?"18%":"28%"};'>Subtotal</th>
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
        ${A}
        ${b.isLast?`<div class='footer'><div>Sin otro particular, atentamente.</div><div class='footer-note'>${o}</div></div>`:""}
      </div>
    `}).join("")}
</body>
</html>`}async function k(a,b){throw Error("La descarga de PDF debe ejecutarse en el navegador.")}async function l(a,b){await k(a,b)}a.s(["buildQuotationPreviewHtml",()=>j,"downloadQuotationPdf",()=>l,"fetchQuotationPdfBlob",()=>k])},24537,a=>{"use strict";function b(a,b){return 0===a?b?4:5:b?5:6}function c(a){let c=!0!==a.hideObservations||!0!==a.hideCommercialTerms,d=a.items?.length?a.items:[];if(!d.length)return[{items:[],isFirst:!0,isLast:!0,pageNumber:1,totalPages:1}];let e=[],f=[],g=0,h=0,i=b(0,c);for(let a of d){let d=Math.max(1,Math.ceil(Math.max((a.description||"").trim().length,24)/180));f.length>0&&g+d>i&&(e.push(f),h+=1,f=[],g=0,i=b(h,c)),f.push(a),g+=d}return(f.length||!e.length)&&e.push(f),e.map((a,b)=>({items:a,isFirst:0===b,isLast:b===e.length-1,pageNumber:b+1,totalPages:e.length}))}a.s(["buildQuotationPageChunks",()=>c])},46946,a=>{"use strict";function b(a){}a.i(25503),a.s(["syncCompanySettingsFromApi",()=>b])},29061,a=>{"use strict";var b=a.i(87924),c=a.i(97895),d=a.i(25503),e=a.i(73943),f=a.i(24537);function g({quotation:a,company:e,className:g,compact:i=!1,serverExport:j=!1}){let k=(0,d.normalizeAssetPath)(e?.logoAsset),l=e?.businessName||e?.name||"MT-Cotiza",m=!1!==a.includeDiscount,n=!1!==a.includeTax,o=!!a.items?.some(a=>!(a.noDiscount??a.discount<=0)),p=!0!==a.hideObservations,q=!0!==a.hideCommercialTerms,r=(0,f.buildQuotationPageChunks)(a);return(0,b.jsx)("div",{className:(0,c.cn)("space-y-6",g),children:r.map(c=>(0,b.jsx)(h,{quotation:a,companyName:l,companyLogoText:a.logoText||e?.logoText||l,companyRuc:e?.ruc,companyPhone:e?.phone,companyEmail:e?.email,logoSrc:k,showDiscount:m,showTax:n,showItemDiscount:o,showObservations:p,showCommercialTerms:q,page:c,compact:i,serverExport:j},c.pageNumber))})}function h({quotation:a,companyName:f,companyLogoText:g,companyRuc:h,companyPhone:k,companyEmail:l,logoSrc:m,showDiscount:n,showTax:o,showItemDiscount:p,showObservations:q,showCommercialTerms:r,page:s,compact:t=!1,serverExport:u=!1}){let v=!s.isFirst;return(0,b.jsxs)("div",{className:(0,c.cn)("quotation-print-area print-flow border-border/70 mx-auto w-full max-w-[210mm] rounded-[28px] border bg-white p-7 text-slate-900 shadow-sm sm:p-11 print:mx-0 print:w-full print:max-w-none print:rounded-none print:break-after-page print:break-inside-avoid",t&&"min-h-[297mm]",v&&"mt-0"),children:[(0,b.jsxs)("div",{className:"border-b border-slate-200 pb-6",children:[(0,b.jsxs)("div",{className:"flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between",children:[(0,b.jsx)("div",{className:"flex-1",children:(0,b.jsx)("div",{className:"flex items-center gap-3",children:m?(0,b.jsx)("img",{src:m,alt:f,className:"h-28 w-auto max-w-[360px] object-contain sm:h-32"}):(0,b.jsx)(e.BrandLogo,{showText:!1,iconClassName:"h-14 w-14"})})}),(0,b.jsxs)("div",{className:"min-w-[220px] rounded-[20px] border-2 border-slate-900 p-4",children:[(0,b.jsx)("div",{className:"text-[10px] font-semibold tracking-[0.18em] text-slate-500",children:v?`CONTINUACI\xd3N ${s.pageNumber}/${s.totalPages}`:"COTIZACIÓN"}),"BORRADOR"!==a.status?(0,b.jsxs)("div",{className:"mt-2 text-xs text-slate-700",children:["Estado: ",a.status.replaceAll("_"," ")]}):null,(0,b.jsx)("div",{className:"mt-1 text-2xl font-semibold tracking-tight",children:a.code}),(0,b.jsxs)("div",{className:"mt-1 text-xs text-slate-600",children:["Fecha: ",(0,d.shortDate)(a.issueDate)]}),!1!==a.useExpirationDate?(0,b.jsxs)("div",{className:"text-xs text-slate-600",children:["Vence: ",(0,d.shortDate)(a.expirationDate)]}):null]})]}),s.isFirst&&a.documentHeader?.trim()?(0,b.jsx)("div",{className:"mt-5 min-h-20 rounded-[18px] border border-slate-200 px-5 py-4 text-center text-sm leading-6 [overflow-wrap:anywhere] break-words [word-break:break-word] whitespace-pre-wrap text-slate-700",children:a.documentHeader}):null,(0,b.jsxs)("div",{className:"mt-4 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-[11px] leading-5 text-slate-600",children:[(0,b.jsxs)("span",{children:["RUC: ",h||"-"]}),(0,b.jsxs)("span",{children:["Teléfono: ",k||"-"]}),(0,b.jsx)("span",{children:l||"-"}),v?(0,b.jsx)("span",{className:"text-xs font-semibold tracking-[0.18em] whitespace-normal text-slate-500 uppercase",children:"Continuación de documento"}):null]})]}),s.isFirst?(0,b.jsxs)("div",{className:"mt-6 space-y-4",children:[(0,b.jsx)("div",{className:"rounded-[18px] border border-slate-200 px-4 py-3 text-xs text-slate-600",children:(0,b.jsxs)("div",{className:"flex flex-wrap items-center gap-x-4 gap-y-2",children:[(0,b.jsxs)("span",{children:[(0,b.jsx)("span",{className:"font-semibold tracking-[0.18em] text-slate-500 uppercase",children:"Placa:"})," ",a.plate||"-"]}),(0,b.jsxs)("span",{children:[(0,b.jsx)("span",{className:"font-semibold tracking-[0.18em] text-slate-500 uppercase",children:"Código:"})," ",a.codeReference||"-"]}),(0,b.jsxs)("span",{children:[(0,b.jsx)("span",{className:"font-semibold tracking-[0.18em] text-slate-500 uppercase",children:"Contrato marco:"})," ",a.frameworkContract||"-"]}),(0,b.jsxs)("span",{children:[(0,b.jsx)("span",{className:"font-semibold tracking-[0.18em] text-slate-500 uppercase",children:"Pos. contrato marco:"})," ",a.frameworkContractPosition||"-"]}),(0,b.jsxs)("span",{children:[(0,b.jsx)("span",{className:"font-semibold tracking-[0.18em] text-slate-500 uppercase",children:"T1/T2/FLT:"})," ",a.technicalParameters||"-"]})]})}),(0,b.jsxs)("div",{className:"grid gap-5 rounded-[24px] border border-slate-200 p-5 sm:grid-cols-2",children:[(0,b.jsxs)("div",{className:"space-y-2 text-sm",children:[(0,b.jsx)("div",{className:"text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase",children:"Cliente"}),(0,b.jsx)("div",{className:"font-semibold break-words",children:a.customerName}),a.customerDocumentNumber?(0,b.jsxs)("div",{className:"text-slate-600",children:[a.customerDocumentType||"RUC",":"," ",a.customerDocumentNumber]}):null,(0,b.jsx)("div",{className:"leading-6 break-words whitespace-pre-wrap text-slate-600",children:a.description||"-"})]}),(0,b.jsxs)("div",{className:"space-y-2 text-sm",children:[(0,b.jsx)("div",{className:"text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase",children:"Resumen"}),(0,b.jsxs)("div",{className:"flex justify-between gap-4",children:[(0,b.jsx)("span",{className:"text-slate-600",children:"Subtotal"}),(0,b.jsx)("strong",{children:(0,d.money)(a.subtotal,a.currency)})]}),n?(0,b.jsxs)("div",{className:"flex justify-between gap-4",children:[(0,b.jsx)("span",{className:"text-slate-600",children:"Descuento global"}),(0,b.jsx)("strong",{children:(0,d.money)(a.discount,a.currency)})]}):null,o?(0,b.jsxs)("div",{className:"flex justify-between gap-4",children:[(0,b.jsx)("span",{className:"text-slate-600",children:"Impuesto"}),(0,b.jsx)("strong",{children:(0,d.money)(a.tax,a.currency)})]}):null,(0,b.jsxs)("div",{className:"flex justify-between gap-4 border-t border-slate-200 pt-3 text-base",children:[(0,b.jsx)("span",{children:"Total"}),(0,b.jsx)("strong",{children:(0,d.money)(a.total,a.currency)})]})]})]}),(0,b.jsx)("div",{className:"mt-6 overflow-hidden rounded-[24px] border border-slate-200",children:(0,b.jsxs)("table",{className:"w-full table-fixed border-collapse text-sm",children:[(0,b.jsx)("thead",{className:"bg-slate-50 text-slate-600",children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{className:"w-[12%] px-3 py-3 text-left font-medium",children:"Cant."}),(0,b.jsx)("th",{className:"px-3 py-3 text-left font-medium",children:"Descripción"}),(0,b.jsx)("th",{className:"w-[18%] px-3 py-3 text-right font-medium",children:"P. Unit."}),p?(0,b.jsx)("th",{className:"w-[16%] px-3 py-3 text-right font-medium",children:"Desc."}):null,(0,b.jsx)("th",{className:p?"w-[18%] px-3 py-3 text-right font-medium":"w-[28%] px-3 py-3 text-right font-medium",children:"Subtotal"})]})}),(0,b.jsx)("tbody",{children:s.items.map((c,d)=>(0,b.jsx)(i,{item:c,currency:a.currency,showDiscount:p},d))})]})})]}):(0,b.jsx)("div",{className:"mt-6 overflow-hidden rounded-[24px] border border-slate-200",children:(0,b.jsxs)("table",{className:"w-full table-fixed border-collapse text-sm",children:[(0,b.jsx)("thead",{className:"bg-slate-50 text-slate-600",children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{className:"w-[12%] px-3 py-3 text-left font-medium",children:"Cant."}),(0,b.jsx)("th",{className:"px-3 py-3 text-left font-medium",children:"Descripción"}),(0,b.jsx)("th",{className:"w-[18%] px-3 py-3 text-right font-medium",children:"P. Unit."}),p?(0,b.jsx)("th",{className:"w-[16%] px-3 py-3 text-right font-medium",children:"Desc."}):null,(0,b.jsx)("th",{className:p?"w-[18%] px-3 py-3 text-right font-medium":"w-[28%] px-3 py-3 text-right font-medium",children:"Subtotal"})]})}),(0,b.jsx)("tbody",{children:s.items.map((c,d)=>(0,b.jsx)(i,{item:c,currency:a.currency,showDiscount:p},d))})]})}),s.isLast?(0,b.jsxs)("div",{className:"mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]",children:[(0,b.jsxs)("div",{className:"space-y-4 text-sm",children:[q?(0,b.jsx)(j,{title:"Observaciones",value:a.observations||"-"}):null,r?(0,b.jsx)(j,{title:"Condiciones comerciales",value:a.commercialTerms||"-"}):null]}),(0,b.jsx)("div",{className:"rounded-[24px] border border-slate-200 p-5",children:(0,b.jsxs)("div",{className:"space-y-3 text-sm",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("span",{className:"text-slate-600",children:"Subtotal"}),(0,b.jsx)("strong",{children:(0,d.money)(a.subtotal,a.currency)})]}),n?(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("span",{className:"text-slate-600",children:"Descuento global"}),(0,b.jsx)("strong",{children:(0,d.money)(a.discount,a.currency)})]}):null,o?(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsx)("span",{className:"text-slate-600",children:"Impuesto"}),(0,b.jsx)("strong",{children:(0,d.money)(a.tax,a.currency)})]}):null,(0,b.jsxs)("div",{className:"flex items-center justify-between border-t border-slate-200 pt-3 text-base",children:[(0,b.jsx)("span",{children:"Total"}),(0,b.jsx)("strong",{children:(0,d.money)(a.total,a.currency)})]})]})})]}):null]})}function i({item:a,currency:c,showDiscount:e}){return(0,b.jsxs)("tr",{className:"border-t border-slate-200",children:[(0,b.jsx)("td",{className:"px-3 py-3 align-top break-words",children:a.quantity}),(0,b.jsx)("td",{className:"px-3 py-3 align-top",children:(0,b.jsx)("div",{className:"font-medium break-words whitespace-pre-wrap text-slate-900",children:a.description})}),(0,b.jsx)("td",{className:"px-3 py-3 text-right align-top break-words",children:(0,d.money)(a.unitPrice,c)}),e?(0,b.jsx)("td",{className:"px-3 py-3 text-right align-top break-words",children:a.noDiscount?"-":(0,d.money)(a.discount,c)}):null,(0,b.jsx)("td",{className:"px-3 py-3 text-right align-top font-medium break-words",children:(0,d.money)(a.subtotal,c)})]})}function j({title:a,value:c}){return(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase",children:a}),(0,b.jsx)("div",{className:"mt-1 overflow-hidden rounded-2xl border border-slate-200 px-4 py-3 leading-6 [overflow-wrap:anywhere] break-words [word-break:break-word] whitespace-pre-wrap text-slate-700",children:c})]})}a.s(["QuotationDocument",()=>g])}];

//# sourceMappingURL=_3423507e._.js.map