const rows=Get(root,(n,c)=>({n,b:c.bounds,parent:c.parentCtx?.node.id,depth:c.depth})),index=new Map(rows.map(r=>[r.n.id,r]));
for(const l of rows.filter(r=>r.n.context==='a'&&index.get(r.parent)?.n.y<0)){
 const row=index.get(l.parent),desc=index.get(row.parent);
 for(const c of row.n.children||[])if(c.id!==l.n.id)Delete(c.id);
 Update(row.n.id,{width:l.b.width+16,height:28,y:-14});Update(l.n.id,{y:-1,x:8});
 const line=Insert(desc.n.id,{type:'rectangle',name:'Example title divider',width:'fill_container',height:1,fill:'#F0F0F0'});Move(line,desc.n.id,0);
}
for(const r of rows)if((r.n.opacity===.7&&r.n.strokeWidth?.top===1)||(r.depth===1&&r.n.layoutPosition==='absolute'))Delete(r.n.id);
for(const r of rows.filter(r=>r.n.type==='text'&&/^\d+\.\d+\.\d+$/.test(r.n.content||''))){const p=index.get(r.parent);if(p?.n.layoutPosition==='absolute')Delete(p.n.id);}
