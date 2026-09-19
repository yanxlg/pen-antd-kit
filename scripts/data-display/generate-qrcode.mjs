import {readFileSync,writeFileSync} from 'node:fs';
const sourcePath='node_modules/.pnpm/@rc-component+qrcode@2.0.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@rc-component/qrcode/es/libs/qrcodegen.js';
let lib=readFileSync(sourcePath,'utf8').replace(/^import .*;\n/,'const _defineProperty=(target,key,value)=>{Object.defineProperty(target,key,{value,writable:true,enumerable:true,configurable:true});};\n').replaceAll('export class ','class ');
const file='canvas-components/QRCode.js',old=readFileSync(file,'utf8'),header=old.slice(0,old.indexOf('*/')+2),status=old.slice(old.indexOf("if(i.status!=="));
writeFileSync(file,header+'\n'+lib+`\nconst i=pencil.input||{},s=Math.min(pencil.width,pencil.height),pad=12,nodes=[],qr=QrCode.encodeText(String(i.value||'https://ant.design'),({L:Ecc.LOW,M:Ecc.MEDIUM,Q:Ecc.QUARTILE,H:Ecc.HIGH})[i.errorLevel]||Ecc.MEDIUM),n=qr.size,cell=(s-pad*2)/n;
nodes.push({type:'rectangle',name:'QR surface',x:0,y:0,width:s,height:s,fill:i.bgColor||'#FFFFFF',cornerRadius:8,stroke:i.bordered===false?'#00000000':'#F0F0F0',strokeWidth:1});
for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(qr.getModule(c,r))nodes.push({type:'rectangle',name:'QR module',x:pad+c*cell,y:pad+r*cell,width:cell+.02,height:cell+.02,fill:i.color||'#000000'});
`+status);
