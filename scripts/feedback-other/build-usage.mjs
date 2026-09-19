import fs from 'node:fs';
const pages=JSON.parse(fs.readFileSync('artifacts/feedback-other/imports.json'));
const data=pages.map(p=>({...p,records:JSON.parse(fs.readFileSync(`artifacts/feedback-other/${p.slug}-official.json`)).records.filter(r=>!r.demo?.endsWith('_semantic')).map(({childClasses,style,...r})=>({...r,style:{color:style.color,backgroundColor:style.backgroundColor},skeletonRows:childClasses.filter(x=>x==='ant-skeleton-paragraph').length,hasAvatar:childClasses.some(x=>x.includes('ant-skeleton-avatar')),skeletonKind:r.classes.includes('ant-skeleton-element')?['button','avatar','input','image','node'].find(k=>childClasses.some(x=>x.split(' ').includes('ant-skeleton-'+k))):null}))}));
const code=`const pages=${JSON.stringify(data)};
const norm=s=>String(s||'').replace(/\\s+/g,'').trim();
const report=[];const matches=[];
for(const p of pages){
 const tree=Get(p.root,{depth:60});const texts=new Map();
 function collect(n){const t=n.type==='text'?n.content||'':(Array.isArray(n.children)?n.children.map(collect).join(''):'');texts.set(n.id,n.enabled===false?'':t);return n.enabled===false?'':t;}collect(tree);
 const candidates=Get(p.root,(n,c)=>(n.type==='frame'||n.type==='rectangle')?{id:n.id,context:n.context||'',text:norm(texts.get(n.id)),width:c.bounds.width,height:c.bounds.height,depth:c.depth,node:n}:undefined);const used=new Set();let found=0;const missing=[];
 const records=p.records.filter(r=>p.slug!=='float-button'||r.demo==='float-button-demo-back-top');
 for(const r of records){
  const target=norm(r.text);let possible=candidates.filter(c=>!used.has(c.id)&&(c.text===target||target.endsWith(c.text)&&c.text.length>target.length*.65||r.kind==='ant-skeleton'&&target==='Imageplaceholder'&&!c.text)&&Math.abs(c.height-r.height)<Math.max(12,r.height*.15)&&Math.abs(c.width-r.width)<Math.max(32,r.width*.08));
  if(r.kind==='ant-btn')possible=possible.filter(c=>c.context==='button');
  possible.sort((a,b)=>(Math.abs(a.width-r.width)+Math.abs(a.height-r.height)-a.depth*.03)-(Math.abs(b.width-r.width)+Math.abs(b.height-r.height)-b.depth*.03));
  const c=possible[0];if(c){used.add(c.id);matches.push({page:p.slug,id:c.id,depth:c.depth,r});found++;}else missing.push({kind:r.kind,title:r.title,text:r.text.slice(0,60),w:r.width,h:r.height});
 }
 report.push({slug:p.slug,found,total:records.length,missing});
}
Print(report);`;
fs.writeFileSync('scripts/feedback-other/match-usage.pencil.js',code);fs.writeFileSync('scripts/feedback-other/apply-usage.pencil.js',code+fs.readFileSync('scripts/feedback-other/apply-usage-tail.txt','utf8'));
