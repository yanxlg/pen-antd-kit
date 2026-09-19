import fs from 'node:fs';
const root=new URL('../../',import.meta.url),names=['Anchor','Breadcrumb','Dropdown','Menu','Pagination','Steps','Tabs'];
const intros={Anchor:process.argv[2]||'',Breadcrumb:'f351R',Dropdown:'EIQRd',Menu:'jrJ3Y',Pagination:'Hr9Ya',Steps:'hx5oQ',Tabs:'c5yiX'};
const walk=n=>[n,...(n.children||[]).flatMap(walk)],txt=n=>walk(n).filter(n=>n.type==='text').map(n=>n.content).join('');
const manifest={};let code='';
for(const name of names){
 if(!intros[name]||(process.argv[3]&&name!==process.argv[3]))continue;
 const slug=name.toLowerCase(),tree=JSON.parse(fs.readFileSync(new URL('artifacts/official-navigation/'+name+'.canvas.json',root),'utf8'));
 const cards=walk(tree).filter(n=>n.children?.length===2&&n.children.every(c=>c.context==='section')&&n.children[1].children?.length>=2&&n.children[1].children[0].layoutPosition==='absolute');
 const count=['Breadcrumb','Dropdown'].includes(name)?2:1;
 const sourceCols=count===2?tree.children[1].children:[];
 manifest[name]={source:'https://ant.design/components/'+slug+'/',selector:'.demo-wrapper',importedRoot:tree.id,introduction:intros[name],columns:count,cards:cards.map(n=>({id:n.id,title:txt(n.children[1].children[0]),preview:n.children[0].id}))};
 code+=`{const board='artboard-${slug}-usage';for(const n of Get(board,{depth:1}).children||[])Delete(n.id);Update(board,{width:1728,layout:'none',name:'Usage'});Insert(board,{type:'text',name:'Usage',content:'Usage',x:32,y:32,fontFamily:'Inter',fontSize:80,fontWeight:'700',fill:'#000'});const content=Insert(board,{type:'frame',name:'Usage content',x:32,y:160,width:1664,layout:'vertical'});Move('${intros[name]}',content);Update('${intros[name]}',{width:1664,height:'fit_content',clip:false});Get('${intros[name]}',(n,c)=>{if(['h2','h3'].includes(n.context)){for(const ch of Get(n.id,{depth:1}).children)if(ch.context==='a')Delete(ch.id);Update(n.id,{padding:0,gap:0});}});const examples=Insert(content,{type:'frame',name:'Official examples',width:1664,layout:'horizontal',gap:16});const columns=Array.from({length:${count}},(_,i)=>Insert(examples,{type:'frame',name:'Examples column '+(i+1),width:${count===2?824:1664},layout:'vertical',gap:16}));`;
 for(const card of cards){const title=txt(card.children[1].children[0]),meta=card.children[1],oldTitle=meta.children[0],col=count===2?Math.max(0,sourceCols.findIndex(c=>walk(c).some(n=>n.id===card.id))):0;
  code+=`Move('${card.id}',columns[${col}]);Update('${card.id}',{name:${JSON.stringify('Example · '+title)},width:'fill_container',height:'fit_content'});Update('${card.children[0].id}',{width:'fill_container'});Update('${meta.id}',{width:'fill_container',height:'fit_content',clip:false});`;
  for(const action of meta.children.slice(2))code+=`Delete('${action.id}');`;
  const label=walk(oldTitle).find(n=>n.type==='text'),width=Math.max(36,(oldTitle.width||200)-16);
  code+=`Replace('${oldTitle.id}',${JSON.stringify({type:'frame',name:'Example title · '+title,layoutPosition:'absolute',x:16,y:-14.5,width,height:28,fill:'#fff',layout:'horizontal',padding:[0,8],children:[{...label,id:undefined,name:'Example title',content:title,width:'fill_container',height:28,textGrowth:'fixed-width-height',lineHeight:1,textAlignVertical:'middle'}]})});`;
 }
 code+=`Delete('${tree.id}');const h=Get(content,(n,c)=>c.depth===0?c.bounds.height:undefined)[0];Update(board,{height:Math.ceil(h+192)});Print('${name}',${cards.length},h);}`;
}
fs.writeFileSync(new URL('scripts/navigation/usage.pencil.js',root),code);
fs.writeFileSync(new URL('registry/navigation-official-imports.json',root),JSON.stringify({...JSON.parse(fs.readFileSync(new URL('registry/navigation-official-imports.json',root),'utf8')), ...manifest},null,2));
