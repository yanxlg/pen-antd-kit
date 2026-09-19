import fs from 'node:fs';
const source=JSON.parse(fs.readFileSync('artifacts/official-navigation/principles-geometry.json')),trees=JSON.parse(fs.readFileSync('artifacts/official-navigation/principles-current.json'));
const names=['Menu','Breadcrumb','Tabs','Steps','Pagination'],walk=n=>[n,...(n.children||[]).flatMap(walk)],txt=n=>walk(n).filter(n=>n.type==='text').map(n=>n.content).join(''),norm=s=>s.replace(/\s/g,'');let code='';
for(let i=0;i<names.length;i++){
const name=names[i],tree=trees[i],start=source.find(n=>n.tag==='h2'&&n.text===name).y,end=i<4?source.find(n=>n.tag==='h2'&&n.text===names[i+1]).y:Infinity,candidates=source.filter(n=>n.y>=start&&n.y<end),used=new Set();let bottom=0;
for(const n of tree.children){
 const image=walk(n).find(x=>x.fill?.type==='image')?.fill.url;
 const found=candidates.find(s=>!used.has(s)&&(image?s.image?.split('/').at(-1)===image.split('/').at(-1).replace(/^navigation-/,''):s.tag===(n.context||n.name)&&norm(s.text)===norm(txt(n))));
 if(!found){console.log('Unmatched',name,n.id,n.context,txt(n).slice(0,60));continue;}
 used.add(found);const y=found.y-start;code+=`Update('${n.id}',${JSON.stringify({x:found.x-source.find(n=>n.tag==='h2'&&n.text===name).x,y,width:found.w,height:found.h})});\n`;bottom=Math.max(bottom,y+found.h);
}
// Source article has a 32px inner inset; content uses that inset as its origin.
code+=`Update('${tree.id}',{height:${Math.ceil(bottom)},metadata:{source:'https://ant.design/docs/spec/navigation/',sourceViewport:{width:2400,height:1978},contentWidth:1788}});\n`;
}
fs.writeFileSync('scripts/navigation/repair-principles.pencil.js',code+'Print("Principles matched to browser coordinates");');
