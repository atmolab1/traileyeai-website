// Run: node tools/generate-de-homepage.cjs. No external dependencies.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const base={URLSearchParams,location:{pathname:'/',search:'?lang=en',hash:''},navigator:{language:'en'},localStorage:{getItem(){return null},setItem(){}},history:{replaceState(){}},document:{documentElement:{},querySelector(){return null}}};
vm.runInNewContext(read('languages.js').replace('function addSelector(){','globalThis.maps=dictionaries; function addSelector(){'),base);
const extra={...base,location:{pathname:'/',search:'?lang=de'}};
vm.runInNewContext(read('languages-extra.js').replace('tr();','globalThis.maps=T;'),extra);
const map={...base.maps.de,...extra.maps.de};
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const translate=s=>{
  const raw=s.trim(),decoded=raw.replaceAll('&amp;','&').replaceAll('&nbsp;',' ');
  return map[decoded] ? s.replace(raw,escape(map[decoded])) : s;
};
let html=read('index.html');
// Preserve tags, classes and script contents; translate only text nodes.
html=html.split(/(<script\b[^>]*>[\s\S]*?<\/script>)/gi).map(part=>part.startsWith('<script')?part:part.replace(/>([^<>]+)</g,(_,s)=>'>'+translate(s)+'<')).join('');
html=html.replace('<html lang="en">','<html lang="de">')
  .replace(/(<link rel="canonical" href=")https:\/\/traileye.eu\/("\s*>)/,'$1https://traileye.eu/de/$2')
  .replace(/(<meta property="og:url" content=")https:\/\/traileye.eu\/("\s*>)/,'$1https://traileye.eu/de/$2');
html=html.replace(/(alt|aria-label)="([^"]*)"/g,(_,attr,value)=>`${attr}="${map[value]?escape(map[value]).replaceAll('"','&quot;'):value}"`);
const description='Wildkamera-Fotos und Videos lokal auf Windows auswerten: Tierarten bestimmen, Erkennungen prüfen, Zeitleisten, Heatmaps, Karten und Berichte erstellen. Menschen, Fahrzeuge und Cloud-KI-Suche sind in Pro enthalten.';
html=html.replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*/, '$1'+description)
  .replace(/(<meta property="og:title" content=")[^"]*/, '$1Wildkamera-Software für Windows | TrailEye AI');
html=html.replace(/(href|src|poster)="([^"#][^"]*)"/g,(all,attr,value)=>{
  if(/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(value))return all;
  return `${attr}="${value==='download/'?'/de/download/':'/'+value}"`;
});
html=html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,(_,open,source,close)=>{
  const data=JSON.parse(source);data.url='https://traileye.eu/de/';data.inLanguage='de';data.description=description;
  return open+'\n'+JSON.stringify(data,null,2)+'\n'+close;
});
fs.mkdirSync(path.join(root,'de'),{recursive:true});
fs.writeFileSync(path.join(root,'de/index.html'),html);
console.log('Generated /de/ from index.html and German dictionaries.');
