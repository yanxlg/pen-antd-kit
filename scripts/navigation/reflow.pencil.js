let x=0,maxHeight=0;
for(const name of ['anchor','breadcrumb','dropdown','menu','pagination','steps','tabs']){
 const section='section-'+name,boards=Get(section,{depth:1}).children.filter(n=>/Principles|Usage|Components/.test(n.name||'')).sort((a,b)=>{const rank=n=>n.name.startsWith('Principles')?0:n.name==='Usage'?1:2;return rank(a)-rank(b)});
 let bx=0,sectionHeight=0;
 for(const b of boards){let bottom=0;Get(b.id,(n,c)=>{if(c.depth===1)bottom=Math.max(bottom,c.bounds.y+c.bounds.height)});const h=Math.ceil(bottom+32);Update(b.id,{x:bx,y:90,height:h});bx+=b.width+40;sectionHeight=Math.max(sectionHeight,h+122);}
 Update(section,{x,width:bx-40,height:sectionHeight});Update(section+'-banner',{width:bx-40});x+=bx+60;maxHeight=Math.max(maxHeight,sectionHeight);
}
Update('layer-navigation',{width:x-100,height:maxHeight});
Print({width:x-100,height:maxHeight});
