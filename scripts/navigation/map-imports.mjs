import fs from 'node:fs';
const base=new URL('../../',import.meta.url),read=p=>JSON.parse(fs.readFileSync(new URL(p,base),'utf8'));
const jobs=read('registry/navigation-official-props.json');
const walk=(n)=>[n,...(n.children||[]).flatMap(walk)];
const text=n=>walk(n).filter(n=>n.type==='text').map(n=>n.content).join('');
const norm=s=>String(s).replace(/\s+/g,'').replaceAll('svg','');
const result=[],missing=[],used=new Set();
for(const name of ['Anchor','Breadcrumb','Dropdown','Menu','Pagination','Steps','Tabs']){
 const tree=read('artifacts/official-navigation/'+name+'.canvas.json');
 const cards=walk(tree).filter(n=>n.children?.length===2&&n.children.every(c=>c.context==='section')&&n.children[1].children?.length>=2&&n.children[1].children[0].layoutPosition==='absolute');
 for(const j of jobs.filter(j=>j.component===name)){
  const card=cards.find(n=>norm(text(n.children[1].children[0]))===norm(j.cardTitle));
  if(!card){missing.push({...j,reason:'card'});continue;}
  const preview=card.children[0], candidates=walk(preview).filter(n=>!used.has(n.id)&&norm(text(n))===j.text);
  const tag=name==='Breadcrumb'?'ol':j.tag;
  const preferred=candidates.filter(n=>n.context===tag);
  let target=(preferred.length?preferred:candidates).sort((a,b)=>walk(a).length-walk(b).length)[0];
  if(!target&&name==='Steps'){
   const labels=JSON.parse(j.props.items).map(it=>norm(it.title));
   const matches=walk(preview).filter(n=>n.type==='frame'&&!used.has(n.id)&&labels.every(t=>norm(text(n)).includes(t))&&n.children?.length>=labels.length);
   target=matches.sort((a,b)=>walk(a).length-walk(b).length)[0];
  }
  if(!target&&name==='Pagination')target=walk(preview).find(n=>n.context==='ul'&&!used.has(n.id));
  if(!target){missing.push({...j,reason:'node'});continue;}
  used.add(target.id);result.push({...j,nodeId:target.id,preview:preview.id,card:card.id});
 }
}
fs.writeFileSync(new URL('registry/navigation-instance-migration.json',base),JSON.stringify({instances:result,unmatched:missing},null,2));
console.log('Mapped',result.length,'unmatched',missing.length);
for(const m of missing)console.log(m.component,m.cardTitle,m.reason,m.text.slice(0,90));
