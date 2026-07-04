module.exports=[10328,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(50944),e=a.i(72131);let f=(0,a.i(70106).default)("file-plus-corner",[["path",{d:"M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35",key:"17jvcc"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M14 19h6",key:"bvotb8"}],["path",{d:"M17 16v6",key:"18yu1i"}]]);var g=a.i(4720),h=a.i(96221),i=a.i(15618),j=a.i(81560),k=a.i(73320),l=a.i(40695),m=a.i(5522),n=a.i(46893),o=a.i(41398),p=a.i(97895),q=a.i(25503);function r(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function s(a){if(!a)return"-";let b=new Date(a);return Number.isNaN(b.getTime())?a:b.toLocaleDateString("es-PE")}function t(a,b){let c=[];for(let d=0;d<a.length;d+=b)c.push(a.slice(d,d+b));return c}async function u(a){return new Promise((b,c)=>{let d=new FileReader;d.onload=()=>b(String(d.result||"")),d.onerror=()=>c(Error("No se pudo convertir el logo a base64.")),d.readAsDataURL(a)})}async function v(a){let b=(0,q.normalizeAssetPath)(a);if(!b)return"";try{let a=await fetch(b.startsWith("http")?b:`${window.location.origin}${b}`);if(!a.ok)return"";return await u(await a.blob())}catch{return""}}async function w(a,b){let c=await v(b?.logoAsset),d=r(b?.businessName||b?.name||"MT-Cotiza"),e=r(b?.ruc||"-"),f=r(b?.address||"-"),g=r(b?.phone||"-"),h=r(b?.email||"-"),i=r(b?.footerMessage||"Documento técnico emitido para control interno y seguimiento operativo."),j=r(b?.reportsEmail||b?.email||"informes@mt-cotiza.com"),k=r(b?.reportLink||"https://mt-cotiza.com"),l=r(b?.logoText||b?.name||"MT"),m=`
    <div style="margin-top:8px;display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:11px;line-height:1.45;">
      <div style="font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#374151;">${l}</div>
      <div style="color:#6b7280;">\xb7</div>
      <div style="color:#374151;">${j}</div>
      <div style="color:#6b7280;">\xb7</div>
      <div style="color:#1d4ed8;text-decoration:underline;word-break:break-word;">${k}</div>
    </div>`,n=c?`<img src="${c}" alt="${d}" style="width:72px;height:72px;border-radius:999px;object-fit:contain;filter:grayscale(1);border:1px solid #111827;background:#fff;padding:6px;" />`:`<div style="width:72px;height:72px;border-radius:999px;border:1px solid #111827;background:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;">${r(b?.logoText||"MT")}</div>`,o=c?`<img src="${c}" alt="${d}" style="width:28px;height:28px;border-radius:999px;object-fit:contain;filter:grayscale(1);border:1px solid #111827;background:#fff;padding:3px;" />`:`<div style="width:28px;height:28px;border-radius:999px;border:1px solid #111827;background:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;">${r(b?.logoText||"MT")}</div>`,p=(a.photos||[]).filter(a=>a.label||a.dataUrl),q=t(p.length?p:[],4),u=(q.length?q:[[]]).map((b,c)=>{let d=3+c,e=2+(q.length?q.length:1),f=(b.length?b:[null,null,null,null]).map((a,b)=>{let c=`Imagen ${b+1}`;if(!a)return`<div><div style="width:100%;height:165px;border:2px dashed #111827;display:flex;align-items:center;justify-content:center;color:#6b7280;font-size:12px;font-weight:700;">${c}</div><div class="photo-caption">${c}</div></div>`;let d=r(a.label||c);return a.dataUrl?`<div><img src="${a.dataUrl}" alt="${d}" style="width:100%;height:165px;object-fit:cover;border:2px solid #111827;" /><div class="photo-caption">${d}</div></div>`:`<div><div style="width:100%;height:165px;border:2px dashed #111827;display:flex;align-items:center;justify-content:center;color:#6b7280;font-size:12px;font-weight:700;">${c}</div><div class="photo-caption">${d}</div></div>`}).join("");return`
  <div class="page">
    <div class="top">
      <div>
        ${n}
        ${m}
      </div>
      <div class="title-wrap">
        <div class="title">${r(a.reportTitle)}</div>
        <div class="subtitle">7. IM\xc1GENES</div>
      </div>
      <div class="page-badge">
        <div class="k">P\xe1gina</div>
        <div class="v">${d} / ${e}</div>
      </div>
    </div>

    <div class="photos">
      ${f}
    </div>

    <div class="card">
      <h3>Observaci\xf3n visual</h3>
      <div class="text">Las fotograf\xedas muestran el arrancador desmontado, piezas quemadas, restos carbonizados, holl\xedn y deterioro visible en sus componentes met\xe1licos. La apariencia general transmite da\xf1o severo, falla el\xe9ctrica y sobrecalentamiento sostenido.</div>
    </div>

    <div class="footer">
      <div>${o}</div>
      <div class="footer-note">P\xe1gina ${d} - Evidencias fotogr\xe1ficas</div>
      <div>${r(s(a.interventionDate))}</div>
    </div>
  </div>`}).join("");return`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    @page { size: A4; margin: 0; }
    html, body { margin: 0; padding: 0; background: #fff; color: #111827; }
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { width: 210mm; min-height: 297mm; padding: 14mm 15mm 12mm; position: relative; page-break-after: always; }
    .page:last-child { page-break-after: auto; }
    .top { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; border-bottom:2px solid #111827; padding-bottom:12px; }
    .title-wrap { flex:1; text-align:center; padding-top:4px; }
    .title { font-size:18px; font-weight:700; letter-spacing:.02em; }
    .subtitle { margin-top:4px; font-size:12px; color:#374151; }
    .page-badge { min-width:45mm; border:2px solid #111827; border-radius:16px; padding:12px 14px; }
    .page-badge .k { font-size:10px; letter-spacing:.24em; text-transform:uppercase; color:#6b7280; font-weight:700; }
    .page-badge .v { margin-top:8px; font-size:19px; font-weight:700; }
    .section-title { margin-top:14px; font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; }
    .meta-grid { margin-top:10px; display:grid; grid-template-columns:1fr 1fr; gap:0; border:1px solid #111827; break-inside: avoid; page-break-inside: avoid; }
    .meta-grid > div { padding:9px 10px; border-right:1px solid #111827; border-bottom:1px solid #111827; font-size:12px; line-height:1.45; overflow-wrap:anywhere; word-break:break-word; }
    .meta-grid > div:nth-child(2n) { border-right:0; }
    .meta-grid > div:last-child { border-bottom:0; }
    .meta-key { font-weight:700; text-transform:uppercase; font-size:10px; letter-spacing:.12em; margin-bottom:4px; }
    .card { margin-top:12px; border:1px solid #111827; padding:11px 12px; }
    .card h3 { margin:0 0 8px; font-size:12px; text-transform:uppercase; letter-spacing:.12em; }
    .text { font-size:12px; line-height:1.55; white-space:pre-wrap; overflow-wrap:anywhere; word-break:break-word; }
    .table { width:100%; border-collapse:collapse; margin-top:12px; font-size:12px; break-inside: avoid; page-break-inside: avoid; }
    .table td, .table th { border:1px solid #111827; padding:8px 10px; vertical-align:top; overflow-wrap:anywhere; word-break:break-word; }
    .table th { width:30%; background:#f8fafc; text-transform:uppercase; letter-spacing:.08em; font-size:10px; text-align:left; }
    .number { margin-top:12px; font-size:12px; font-weight:700; }
    .list { margin:10px 0 0 18px; padding:0; font-size:12px; line-height:1.55; }
    .list li { margin-bottom:6px; }
    .photos { margin-top:14px; display:grid; grid-template-columns:1fr 1fr; gap:14px; break-inside: avoid; page-break-inside: avoid; }
    .photo-caption { margin-top:6px; font-size:11px; color:#374151; text-transform:uppercase; letter-spacing:.12em; font-weight:700; overflow-wrap:anywhere; word-break:break-word; }
    .footer { position:absolute; left:15mm; right:15mm; bottom:10mm; display:flex; align-items:center; justify-content:space-between; gap:12px; border-top:1px solid #111827; padding-top:8px; font-size:10px; color:#374151; }
    .footer-note { flex:1; text-align:center; line-height:1.4; }
  </style>
</head>
<body>
  <div class="page">
    <div class="top">
      <div>
        ${n}
        ${m}
      </div>
      <div class="title-wrap">
        <div class="title">${r(a.reportTitle)}</div>
        <div class="subtitle">${r(d)} \xb7 RUC ${e}</div>
        <div style="margin-top:4px;font-size:11px;color:#6b7280;line-height:1.45;">${f} \xb7 ${g} \xb7 ${h}</div>
      </div>
      <div class="page-badge">
        <div class="k">Informe</div>
        <div class="v">${r(a.reportNumber)}</div>
      </div>
    </div>

    <div class="section-title">1. Datos t\xe9cnicos</div>
    <div class="meta-grid">
      <div><div class="meta-key">Fecha de intervenci\xf3n</div>${r(s(a.interventionDate))}</div>
      <div><div class="meta-key">Lugar</div>${r(a.location)}</div>
      <div><div class="meta-key">Equipo / componente</div>${r(a.assetName)}</div>
      <div><div class="meta-key">Marca</div>${r(a.brand)}</div>
      <div><div class="meta-key">Sistema</div>${r(a.system)}</div>
      <div><div class="meta-key">Motivo de ingreso</div>${r(a.reasonForEntry)}</div>
    </div>

    <div class="card">
      <h3>2. Inspecci\xf3n y diagn\xf3stico</h3>
      <table class="table">
        <tr><th>S\xedntoma principal</th><td>${r(a.symptom)}</td></tr>
        <tr><th>Inspecci\xf3n inicial</th><td>${r(a.initialInspection)}</td></tr>
        <tr><th>Inspecci\xf3n general</th><td>${r(a.generalInspection)}</td></tr>
        <tr><th>Diagn\xf3stico</th><td>${r(a.diagnosis)}</td></tr>
        <tr><th>Conclusi\xf3n parcial</th><td>${r(a.partialConclusion)}</td></tr>
      </table>
    </div>

    <div class="footer">
      <div>${o}</div>
      <div class="footer-note">${i}</div>
      <div>${r(s(a.interventionDate))}</div>
    </div>
  </div>

  <div class="page">
    <div class="top">
      <div>
        ${n}
        ${m}
      </div>
      <div class="title-wrap">
        <div class="title">${r(a.reportTitle)}</div>
        <div class="subtitle">An\xe1lisis de causa ra\xedz y acciones correctivas</div>
      </div>
      <div class="page-badge">
        <div class="k">P\xe1gina</div>
        <div class="v">2 / 3</div>
      </div>
    </div>


    <div class="number">3. Descripci\xf3n del caso</div>
    <div class="card">
      <div class="text">Se intervino un arrancador averiado de marca LINDE con evidencia de quemadura, perteneciente al sistema electr\xf3nico y cuya funci\xf3n principal es el arranque del motor. El ingreso del componente se registr\xf3 el ${r(s(a.interventionDate))} en ${r(a.location)}. El equipo ingres\xf3 con fallo severo y evidencia t\xe9rmica visible.</div>
    </div>

    <div class="number">4. An\xe1lisis de causa ra\xedz</div>
    <div class="card">
      <div class="text">${r(a.rootCauseAnalysis)}</div>
    </div>

    <div class="number">5. Secuencia de la falla</div>
    <div class="card">
      <ol class="list">
        ${r(a.failureSequence).split(" | ").map(a=>`<li>${a}</li>`).join("")}
      </ol>
    </div>

    <div class="number">6. Recomendaciones</div>
    <div class="card">
      <div class="text">${r(a.recommendations)}</div>
    </div>

    <div class="card">
      <h3>7. Conclusi\xf3n final</h3>
      <div class="text">${r(a.finalConclusion)}</div>
    </div>

    <div class="footer">
      <div>${o}</div>
      <div class="footer-note">P\xe1gina 2 - An\xe1lisis t\xe9cnico y conclusiones</div>
      <div>${r(s(a.interventionDate))}</div>
    </div>
  </div>

${u}</body>
</html>`}function x({values:a,company:c,className:d}){let e=(0,q.normalizeAssetPath)(c?.logoAsset),f=c?.businessName||c?.name||"MT-Cotiza",g=c?.logoText||c?.name||"MT",h=c?.footerMessage||"Documento técnico emitido para control interno y seguimiento operativo.",i=t((a.photos||[]).filter(a=>a.label||a.dataUrl),4),j=i.length?i:[[]];return(0,b.jsxs)("div",{className:(0,p.cn)("space-y-6",d),children:[(0,b.jsxs)(y,{children:[(0,b.jsx)(z,{logoSrc:e,companyName:f,companyRuc:c?.ruc||"-",companyAddress:c?.address||"-",companyPhone:c?.phone||"-",companyEmail:c?.email||"-",companyReportsEmail:c?.reportsEmail||c?.email||"informes@mt-cotiza.com",companyReportLink:c?.reportLink||"https://mt-cotiza.com",logoText:g,page:"1 / 3",values:a}),(0,b.jsx)(A,{children:"1. Datos técnicos"}),(0,b.jsx)(E,{values:a}),(0,b.jsx)(D,{title:"2. Inspección y diagnóstico",children:(0,b.jsx)(F,{rows:[["Síntoma principal",a.symptom],["Inspección inicial",a.initialInspection],["Inspección general",a.generalInspection],["Diagnóstico",a.diagnosis],["Conclusión parcial",a.partialConclusion]]})}),(0,b.jsx)(C,{logoSrc:e,logoText:g,note:h,date:s(a.interventionDate)})]}),(0,b.jsxs)(y,{children:[(0,b.jsx)(z,{logoSrc:e,companyName:f,companyRuc:c?.ruc||"-",companyAddress:c?.address||"-",companyPhone:c?.phone||"-",companyEmail:c?.email||"-",companyReportsEmail:c?.reportsEmail||c?.email||"informes@mt-cotiza.com",companyReportLink:c?.reportLink||"https://mt-cotiza.com",logoText:g,page:"2 / 3",values:a}),(0,b.jsx)(B,{children:"3. Descripción del caso"}),(0,b.jsx)(D,{children:(0,b.jsxs)("p",{className:"text-sm leading-7 break-words whitespace-pre-wrap text-slate-700",children:["Se intervino un arrancador averiado de marca LINDE con evidencia de quemadura, perteneciente al sistema electrónico y cuya función principal es el arranque del motor. El ingreso del componente se registró el"," ",s(a.interventionDate)," en ",a.location,". El equipo ingresó con fallo severo y evidencia térmica visible."]})}),(0,b.jsx)(B,{children:"4. Análisis de causa raíz"}),(0,b.jsx)(D,{children:(0,b.jsx)("p",{className:"text-sm leading-7 break-words whitespace-pre-wrap text-slate-700",children:a.rootCauseAnalysis})}),(0,b.jsx)(B,{children:"5. Secuencia de la falla"}),(0,b.jsx)(D,{children:(0,b.jsx)("ol",{className:"list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700",children:a.failureSequence.split(" | ").map(a=>(0,b.jsx)("li",{children:a},a))})}),(0,b.jsx)(B,{children:"6. Recomendaciones"}),(0,b.jsx)(D,{children:(0,b.jsx)("p",{className:"text-sm leading-7 break-words whitespace-pre-wrap text-slate-700",children:a.recommendations})}),(0,b.jsx)(D,{title:"7. Conclusión final",children:(0,b.jsx)("p",{className:"text-sm leading-7 break-words whitespace-pre-wrap text-slate-700",children:a.finalConclusion})}),(0,b.jsx)(C,{logoSrc:e,logoText:g,note:h,date:s(a.interventionDate)})]}),j.map((d,i)=>{let k=3+i,l=2+j.length;return(0,b.jsxs)(y,{children:[(0,b.jsx)(z,{logoSrc:e,companyName:f,companyRuc:c?.ruc||"-",companyAddress:c?.address||"-",companyPhone:c?.phone||"-",companyEmail:c?.email||"-",companyReportsEmail:c?.reportsEmail||c?.email||"informes@mt-cotiza.com",companyReportLink:c?.reportLink||"https://mt-cotiza.com",logoText:g,page:`${k} / ${l}`,values:a}),(0,b.jsx)(A,{children:"7. Imágenes"}),(0,b.jsx)("div",{className:"grid gap-4 md:grid-cols-2",children:d.length?d.map((a,c)=>(0,b.jsxs)("figure",{className:"space-y-2",children:[a.dataUrl?(0,b.jsx)("img",{src:a.dataUrl,alt:a.label,className:"h-[220px] w-full rounded-none border-2 border-slate-900 object-cover"}):(0,b.jsxs)("div",{className:"flex h-[220px] w-full items-center justify-center border-2 border-dashed border-slate-900 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase",children:["Imagen ",c+1]}),(0,b.jsx)("figcaption",{className:"text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase",children:a.label})]},a.id)):(0,b.jsx)("div",{className:"col-span-2 rounded-[20px] border-2 border-dashed border-slate-900 px-4 py-10 text-center text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase",children:"Sin imágenes"})}),(0,b.jsx)(D,{title:"Observación visual",children:(0,b.jsx)("p",{className:"text-sm leading-7 break-words whitespace-pre-wrap text-slate-700",children:"Las fotografías muestran el arrancador desmontado, piezas quemadas, restos carbonizados, hollín y deterioro visible en sus componentes metálicos. La apariencia general transmite daño severo, falla eléctrica y sobrecalentamiento sostenido."})}),(0,b.jsx)(C,{logoSrc:e,logoText:g,note:h,date:s(a.interventionDate)})]},i)})]})}function y({children:a}){return(0,b.jsx)("div",{className:"relative mx-auto h-[297mm] w-[210mm] overflow-hidden bg-white px-[15mm] pt-[14mm] pb-[28mm] text-slate-900 shadow-xl print:mx-0 print:h-[297mm] print:w-[210mm] print:break-after-page print:shadow-none",style:{breakInside:"avoid",pageBreakInside:"avoid"},children:a})}function z({logoSrc:a,companyName:c,companyRuc:d,companyAddress:e,companyPhone:f,companyEmail:g,companyReportsEmail:h,companyReportLink:i,logoText:j,page:k,values:l}){return(0,b.jsxs)("div",{className:"flex items-start justify-between gap-4 border-b-2 border-slate-900 pb-3",children:[(0,b.jsx)("div",{className:"shrink-0 space-y-2",children:(0,b.jsx)("div",{className:"flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-slate-900 bg-white",children:a?(0,b.jsx)("img",{src:a,alt:c,className:"h-14 w-14 object-contain grayscale"}):(0,b.jsx)("div",{className:"text-sm font-bold",children:j})})}),(0,b.jsxs)("div",{className:"flex-1 text-center",children:[(0,b.jsx)("div",{className:"text-[17px] font-bold tracking-[0.08em] uppercase",children:l.reportTitle}),(0,b.jsxs)("div",{className:"mt-1 text-xs text-slate-600",children:[c," · RUC ",d]}),(0,b.jsxs)("div",{className:"mt-1 text-[11px] leading-5 text-slate-500",children:[e," · ",f," · ",g]})]}),(0,b.jsxs)("div",{className:"min-w-[42mm] rounded-[16px] border-2 border-slate-900 px-3 py-2 text-center",children:[(0,b.jsx)("div",{className:"text-[10px] font-semibold tracking-[0.24em] text-slate-500 uppercase",children:"Página"}),(0,b.jsx)("div",{className:"mt-1 text-xl font-bold",children:k})]})]})}function A({children:a}){return(0,b.jsx)("div",{className:"mt-4 text-[11px] font-bold tracking-[0.18em] text-slate-900 uppercase",children:a})}function B({children:a}){return(0,b.jsx)("div",{className:"mt-4 text-sm font-bold tracking-[0.12em] text-slate-900 uppercase",children:a})}function C({logoSrc:a,logoText:c,note:d,date:e}){return(0,b.jsxs)("div",{className:"absolute inset-x-[15mm] bottom-[10mm] flex items-center justify-between gap-3 border-t border-slate-900 pt-2 text-[10px] text-slate-600",children:[(0,b.jsx)("div",{className:"flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-slate-900 bg-white",children:a?(0,b.jsx)("img",{src:a,alt:"MT-Cotiza",className:"h-5 w-5 object-contain grayscale"}):(0,b.jsx)("div",{className:"text-[9px] font-bold",children:c})}),(0,b.jsx)("div",{className:"flex-1 px-2 text-center leading-4",children:d}),(0,b.jsx)("div",{children:e})]})}function D({children:a,title:c}){return(0,b.jsxs)("div",{className:"mt-3 border border-slate-900 p-3.5",style:{breakInside:"avoid",pageBreakInside:"avoid"},children:[c?(0,b.jsx)("div",{className:"mb-2 text-[11px] font-bold tracking-[0.16em] text-slate-900 uppercase",children:c}):null,a]})}function E({values:a}){let c=[["Fecha de intervención",s(a.interventionDate)],["Lugar",a.location],["Equipo / componente",a.assetName],["Marca",a.brand],["Sistema",a.system],["Motivo de ingreso",a.reasonForEntry]];return(0,b.jsx)("div",{className:"mt-3 grid grid-cols-2 border border-slate-900 text-sm",style:{breakInside:"avoid",pageBreakInside:"avoid"},children:c.map(([a,c])=>(0,b.jsxs)("div",{className:"border-r border-b border-slate-900 p-2.5 odd:border-l-0 even:border-r-0",children:[(0,b.jsx)("div",{className:"mb-1 text-[10px] font-bold tracking-[0.14em] text-slate-500 uppercase",children:a}),(0,b.jsx)("div",{className:"leading-6 break-words whitespace-pre-wrap text-slate-700",children:c})]},a))})}function F({rows:a}){return(0,b.jsx)("table",{className:"w-full border-collapse text-sm",style:{breakInside:"avoid",pageBreakInside:"avoid"},children:(0,b.jsx)("tbody",{children:a.map(([a,c])=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{className:"w-[30%] border border-slate-900 bg-slate-50 px-3 py-2 text-left text-[10px] tracking-[0.14em] uppercase",children:a}),(0,b.jsx)("td",{className:"border border-slate-900 px-3 py-2 leading-6 text-slate-700",children:c})]},a))})})}function G(){return{reportNumber:"INFORME TÉCNICO N° 0003/2025",reportTitle:"INFORME TÉCNICO N° 0003/2025",interventionDate:"2025-04-26",location:"Planta Backus",assetName:"Arrancador averiado",brand:"LINDE",system:"Sistema electrónico / arranque del motor",reasonForEntry:"Averiado con evidencia de quemadura.",symptom:"Inoperativo con evidencia de quemadura.",initialInspection:"Quemadura del motor DC eléctrico.",generalInspection:"Averías en la porta carbón y el rotor.",diagnosis:"Solenoide defectuoso, contactos desgastados y craterizados, arco eléctrico recurrente, porta carbones y escobillas carbonizados, y rotor con daño irreversible.",partialConclusion:"Avería irrecuperable por fallo en cadena.",rootCauseAnalysis:"Bloqueo del solenoide por soldadura de contactos, lo que provocó funcionamiento continuo y sobrecalentamiento del sistema hasta comprometer irreversiblemente los componentes críticos.",failureSequence:"Desgaste de contactos | Soldadura de contactos | Sobrecarga térmica",recommendations:"Reemplazar el motor de arranque completo. Verificar alternador, batería y cableado. Implementar inspección preventiva para evitar recurrencia de la falla.",finalConclusion:"La soldadura de contactos del solenoide causó la destrucción de componentes críticos por sobrecarga térmica, dejando el arrancador fuera de servicio de manera definitiva.",photos:[{id:"photo-1",label:"Figura 1. Componentes dañados"},{id:"photo-2",label:"Figura 2. Evidencia de quemadura"}]}}async function H(a,b,c){let d=(0,q.getAuthSession)();d?.token;let e=await fetch(`${q.API_URL}/tasks/${a}/reports/pdf/render`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "},body:JSON.stringify({html:b,fileName:c}),cache:"no-store"});if(!e.ok)throw Error(await e.text());return await e.blob()}function I(a){return a.replace(/[^a-z0-9-_]+/gi,"_").replace(/_+/g,"_").replace(/^_|_$/g,"")}function J(){let a=(0,d.useParams)(),p=(0,d.useRouter)(),[r,s]=(0,e.useState)(null),[t,u]=(0,e.useState)(null),[v,y]=(0,e.useState)(G),[z,A]=(0,e.useState)(!1),[B,C]=(0,e.useState)("");(0,e.useEffect)(()=>{let b=!0;return Promise.all([(0,q.apiFetch)(`/tasks/${a.id}`),(0,q.apiFetch)("/companies/current")]).then(([a,c])=>{b&&(s(a),u(c))}).catch(a=>{b&&C(a instanceof Error?a.message:"No se pudo cargar la tarea.")}),()=>{b=!1}},[a.id]);let D=(0,e.useMemo)(()=>({order:r?.purchaseDocumentCode||r?.salesDocumentCode||r?.serviceOrderCode||r?.projectName||"-",customer:r?.customerName||"-"}),[r]),E=(a,b)=>{y(c=>({...c,[a]:b}))},F=(a,b)=>{y(c=>({...c,photos:c.photos.map(c=>c.id===a?{...c,...b}:c)}))},J=async(a,b)=>{b&&F(a,{dataUrl:await new Promise((a,c)=>{let d=new FileReader;d.onload=()=>a(String(d.result||"")),d.onerror=()=>c(Error("No se pudo leer la imagen.")),d.readAsDataURL(b)}),label:b.name})},L=async()=>{if(r){A(!0),C("");try{let a=await w(v,t);await (0,q.apiFetch)(`/tasks/${r.id}/reports`,{method:"POST",body:JSON.stringify({status:"FINALIZADO",comment:v.reportTitle,beforeComment:[v.reasonForEntry,v.symptom,v.initialInspection,v.generalInspection].join("\n"),afterComment:[v.diagnosis,v.partialConclusion,v.rootCauseAnalysis,v.recommendations,v.finalConclusion].join("\n"),beforeAttachmentIds:[],afterAttachmentIds:[]})});let b=await H(r.id,a,I(`${v.reportNumber||`reporte-tecnico-${r.id}`}.pdf`)),c=r.purchaseDocumentId||r.salesDocumentId||r.projectId;if(c){let a=new FormData;r.purchaseDocumentId?a.append("purchaseDocumentId",String(r.purchaseDocumentId)):r.salesDocumentId?a.append("salesDocumentId",String(r.salesDocumentId)):a.append("projectId",String(r.projectId)),a.append("purpose","TECHNICAL_REPORT"),a.append("file",new File([b],I(`${v.reportNumber||`reporte-tecnico-${r.id}`}.pdf`),{type:"application/pdf"})),await (0,q.apiFetch)("/attachments/upload",{method:"POST",body:a})}C(c?"Reporte técnico guardado y adjuntado a la orden.":"Reporte técnico guardado. La tarea no tiene orden asociada para adjuntar el PDF."),setTimeout(()=>{p.push(`/tareas/${r.id}`)},500)}catch(a){C(a instanceof Error?a.message:"No se pudo guardar el reporte técnico.")}finally{A(!1)}}};return(0,b.jsxs)("div",{className:"space-y-6",children:[(0,b.jsx)(o.PageHeader,{title:"Crear reporte técnico",description:"Redacta, previsualiza y guarda el informe para adjuntarlo automáticamente a la orden de servicio.",action:(0,b.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,b.jsx)(l.Button,{variant:"outline",asChild:!0,children:(0,b.jsxs)(c.default,{href:r?`/tareas/${r.id}`:"/tareas",children:[(0,b.jsx)(g.FileText,{className:"h-4 w-4"}),"Volver"]})}),(0,b.jsxs)(l.Button,{onClick:L,disabled:z||!r,children:[z?(0,b.jsx)(h.Loader2,{className:"h-4 w-4 animate-spin"}):(0,b.jsx)(f,{className:"h-4 w-4"}),"Guardar reporte"]})]})}),B?(0,b.jsx)("div",{className:"rounded-2xl border border-sky-500/20 bg-sky-500/10 px-4 py-3 text-sm text-sky-700",children:B}):null,(0,b.jsxs)(o.Panel,{title:"Tarea relacionada",children:[(0,b.jsxs)("div",{className:"grid gap-3 md:grid-cols-3",children:[(0,b.jsxs)("div",{className:"border-border/70 bg-muted/20 rounded-xl border p-4 text-sm",children:[(0,b.jsx)("div",{className:"text-muted-foreground text-[11px] tracking-[0.14em] uppercase",children:"Tarea"}),(0,b.jsx)("p",{className:"mt-1 font-medium",children:r?.title||"Cargando tarea..."})]}),(0,b.jsxs)("div",{className:"border-border/70 bg-muted/20 rounded-xl border p-4 text-sm",children:[(0,b.jsx)("div",{className:"text-muted-foreground text-[11px] tracking-[0.14em] uppercase",children:"Orden de servicio"}),(0,b.jsx)("p",{className:"mt-1 font-medium",children:D.order})]}),(0,b.jsxs)("div",{className:"border-border/70 bg-muted/20 rounded-xl border p-4 text-sm",children:[(0,b.jsx)("div",{className:"text-muted-foreground text-[11px] tracking-[0.14em] uppercase",children:"Cliente"}),(0,b.jsx)("p",{className:"mt-1 font-medium",children:D.customer})]})]}),r?.purchaseDocumentId||r?.salesDocumentId||r?.projectId?null:(0,b.jsx)("div",{className:"mt-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-700",children:"Esta tarea no tiene una orden vinculada; el reporte se guardará, pero no se adjuntará automáticamente a la orden."})]}),(0,b.jsxs)("div",{className:"grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]",children:[(0,b.jsx)(o.Panel,{title:"Datos del informe",children:(0,b.jsxs)("div",{className:"grid gap-4",children:[(0,b.jsx)(K,{label:"Número de informe",required:!0,children:(0,b.jsx)(m.Input,{value:v.reportNumber,onChange:a=>E("reportNumber",a.target.value)})}),(0,b.jsx)(K,{label:"Título del informe",required:!0,children:(0,b.jsx)(m.Input,{value:v.reportTitle,onChange:a=>E("reportTitle",a.target.value)})}),(0,b.jsx)(K,{label:"Fecha de intervención",required:!0,children:(0,b.jsx)(m.Input,{type:"date",value:v.interventionDate,onChange:a=>E("interventionDate",a.target.value)})}),(0,b.jsx)(K,{label:"Lugar",required:!0,children:(0,b.jsx)(m.Input,{value:v.location,onChange:a=>E("location",a.target.value)})}),(0,b.jsx)(K,{label:"Equipo / componente",required:!0,children:(0,b.jsx)(m.Input,{value:v.assetName,onChange:a=>E("assetName",a.target.value)})}),(0,b.jsx)(K,{label:"Marca",required:!0,children:(0,b.jsx)(m.Input,{value:v.brand,onChange:a=>E("brand",a.target.value)})}),(0,b.jsx)(K,{label:"Sistema",required:!0,children:(0,b.jsx)(m.Input,{value:v.system,onChange:a=>E("system",a.target.value)})}),(0,b.jsx)(K,{label:"Motivo de ingreso",required:!0,children:(0,b.jsx)(n.Textarea,{value:v.reasonForEntry,onChange:a=>E("reasonForEntry",a.target.value)})}),(0,b.jsx)(K,{label:"Síntoma principal",required:!0,children:(0,b.jsx)(n.Textarea,{value:v.symptom,onChange:a=>E("symptom",a.target.value)})}),(0,b.jsx)(K,{label:"Inspección inicial",required:!0,children:(0,b.jsx)(n.Textarea,{value:v.initialInspection,onChange:a=>E("initialInspection",a.target.value)})}),(0,b.jsx)(K,{label:"Inspección general",required:!0,children:(0,b.jsx)(n.Textarea,{value:v.generalInspection,onChange:a=>E("generalInspection",a.target.value)})}),(0,b.jsx)(K,{label:"Diagnóstico",required:!0,children:(0,b.jsx)(n.Textarea,{value:v.diagnosis,onChange:a=>E("diagnosis",a.target.value)})}),(0,b.jsx)(K,{label:"Conclusión parcial",required:!0,children:(0,b.jsx)(n.Textarea,{value:v.partialConclusion,onChange:a=>E("partialConclusion",a.target.value)})}),(0,b.jsx)(K,{label:"Análisis de causa raíz",required:!0,children:(0,b.jsx)(n.Textarea,{value:v.rootCauseAnalysis,onChange:a=>E("rootCauseAnalysis",a.target.value)})}),(0,b.jsx)(K,{label:"Secuencia de la falla",required:!0,hint:"Separar cada paso con | para mantener el orden en el PDF.",children:(0,b.jsx)(n.Textarea,{value:v.failureSequence,onChange:a=>E("failureSequence",a.target.value)})}),(0,b.jsx)(K,{label:"Recomendaciones",required:!0,children:(0,b.jsx)(n.Textarea,{value:v.recommendations,onChange:a=>E("recommendations",a.target.value)})}),(0,b.jsx)(K,{label:"Conclusión final",required:!0,children:(0,b.jsx)(n.Textarea,{value:v.finalConclusion,onChange:a=>E("finalConclusion",a.target.value)})}),(0,b.jsxs)("div",{className:"border-border/70 bg-muted/10 rounded-[24px] border p-4 lg:col-span-2",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between gap-3",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"text-sm font-semibold",children:"Imágenes de evidencia"}),(0,b.jsx)("div",{className:"text-muted-foreground text-xs",children:"Agrega tantos ítems como necesites. Cada bloque puede subirse o quitarse por separado."})]}),(0,b.jsxs)(l.Button,{type:"button",variant:"outline",onClick:()=>{y(a=>({...a,photos:[...a.photos,{id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,label:`Figura ${a.photos.length+1}. Evidencia adicional`}]}))},children:[(0,b.jsx)(i.Plus,{className:"h-4 w-4"}),"Agregar otro item"]})]}),(0,b.jsx)("div",{className:"mt-4 grid gap-4 md:grid-cols-2",children:v.photos.map((a,c)=>(0,b.jsxs)("div",{className:"border-border/70 bg-card/70 rounded-2xl border p-4",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between gap-3",children:[(0,b.jsxs)("div",{className:"text-sm font-medium",children:["Imagen ",c+1]}),(0,b.jsxs)(l.Button,{type:"button",variant:"ghost",size:"sm",onClick:()=>{var b;return b=a.id,void y(a=>({...a,photos:a.photos.filter(a=>a.id!==b)}))},children:[(0,b.jsx)(j.Trash2,{className:"h-4 w-4"}),"Quitar"]})]}),(0,b.jsxs)("div",{className:"mt-3 space-y-3",children:[(0,b.jsx)(K,{label:"Etiqueta",children:(0,b.jsx)(m.Input,{value:a.label,onChange:b=>F(a.id,{label:b.target.value}),placeholder:`Figura ${c+1}. Evidencia`})}),(0,b.jsx)(K,{label:"Archivo de imagen",hint:"Se insertará en la sección de imágenes del PDF.",children:(0,b.jsxs)("label",{className:"border-border text-muted-foreground flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed px-4 py-3 text-sm",children:[(0,b.jsx)(k.Upload,{className:"h-4 w-4"}),a.dataUrl?"Cambiar imagen":"Subir imagen",(0,b.jsx)("input",{className:"hidden",type:"file",accept:"image/*",capture:"environment",onChange:b=>void J(a.id,b.target.files?.[0]??null)})]})}),a.dataUrl?(0,b.jsx)("div",{className:"border-border/70 bg-background overflow-hidden rounded-2xl border",children:(0,b.jsx)("img",{src:a.dataUrl,alt:a.label,className:"h-44 w-full object-cover"})}):(0,b.jsx)("div",{className:"border-border text-muted-foreground rounded-2xl border border-dashed px-4 py-10 text-center text-xs tracking-[0.18em] uppercase",children:"Sin imagen cargada"})]})]},a.id))})]})]})}),(0,b.jsx)(o.Panel,{title:"Vista previa del informe",children:(0,b.jsx)("div",{className:"max-h-[calc(100vh-10rem)] overflow-auto pr-2",children:(0,b.jsx)(x,{values:v,company:t})})})]})]})}function K({label:a,required:c,hint:d,children:e}){return(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsxs)("label",{className:"text-foreground block text-sm font-medium",children:[a,c?(0,b.jsx)("span",{className:"ml-1 text-rose-600",children:"*"}):null]}),e,d?(0,b.jsx)("div",{className:"text-muted-foreground text-xs",children:d}):null]})}a.s(["default",()=>J],10328)}];

//# sourceMappingURL=app_%28workspace%29_tasks_%5Bid%5D_technical-report_page_tsx_74be4d8a._.js.map