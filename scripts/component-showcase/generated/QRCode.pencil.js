const name="QRCode",groups=[{"title":"Status × Border","cols":4,"samples":[{"label":"active · border false","inputs":{"status":"active","bordered":false,"size":160},"width":160,"height":160},{"label":"active · border true","inputs":{"status":"active","bordered":true,"size":160},"width":160,"height":160},{"label":"loading · border false","inputs":{"status":"loading","bordered":false,"size":160},"width":160,"height":160},{"label":"loading · border true","inputs":{"status":"loading","bordered":true,"size":160},"width":160,"height":160},{"label":"expired · border false","inputs":{"status":"expired","bordered":false,"size":160},"width":160,"height":160},{"label":"expired · border true","inputs":{"status":"expired","bordered":true,"size":160},"width":160,"height":160},{"label":"scanned · border false","inputs":{"status":"scanned","bordered":false,"size":160},"width":160,"height":160},{"label":"scanned · border true","inputs":{"status":"scanned","bordered":true,"size":160},"width":160,"height":160}]},{"title":"Size × Error correction","cols":4,"samples":[{"label":"120px · L","inputs":{"size":120,"errorLevel":"L"},"width":120,"height":120},{"label":"120px · M","inputs":{"size":120,"errorLevel":"M"},"width":120,"height":120},{"label":"120px · Q","inputs":{"size":120,"errorLevel":"Q"},"width":120,"height":120},{"label":"120px · H","inputs":{"size":120,"errorLevel":"H"},"width":120,"height":120},{"label":"200px · L","inputs":{"size":200,"errorLevel":"L"},"width":200,"height":200},{"label":"200px · M","inputs":{"size":200,"errorLevel":"M"},"width":200,"height":200},{"label":"200px · Q","inputs":{"size":200,"errorLevel":"Q"},"width":200,"height":200},{"label":"200px · H","inputs":{"size":200,"errorLevel":"H"},"width":200,"height":200}]}],defaults={"QRCode":{"value":"https://ant.design","size":160,"status":"active","bgColor":"#FFFFFF","color":"#000000","bordered":true,"errorLevel":"M","type":"canvas","icon":"","iconSize":40,"statusRender":"","styles":"{}","primaryColor":"#1677FF"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n&&n.reusable&&typeof n.name==='string'&&n.name?{id:n.id,name:n.name}:undefined)||[],byName=Object.fromEntries(all.filter(d=>d&&typeof d.name==='string').map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n&&n.id===master?(()=>{let a=c;while(a?.node&&!/^Components/.test(String(a.node.name||'')))a=a.parentCtx;return a?.node&&a.parentCtx?.node&&a.parentCtx?.parentCtx?.node?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined).filter(Boolean)[0];
if(!located)throw Error('Missing Components '+name);
const board=located.id,before=Get(board,{depth:1}),old=before.children;
Update(board,{placeholder:true,layout:'none',name:'Components'});
let y=152,col=0,rowH=0;
for(const child of old){
 if(child.type==='text'&&child.content==='Components'){Update(child.id,{x:32,y:32,fontSize:80});continue;}
 const defs=Get(child.id,n=>n.reusable?n.id:undefined);
 if(!defs.length){Delete(child.id);continue;}
 Update(child.id,{x:32+col*844,y});rowH=Math.max(rowH,Number(child.height)||200);col++;
 if(col===2){y+=rowH+24;col=0;rowH=0;}
}
if(col)y+=rowH+24;
const created=[];
for(const g of groups){
 const cellW=(1616-24*(g.cols-1))/g.cols,previewH=Math.max(...g.samples.map(s=>s.scene?200:s.height)),cellH=previewH+76,rows=Math.ceil(g.samples.length/g.cols),height=76+rows*cellH;
 const group=Insert(board,{type:'frame',name:g.title,x:32,y,width:1664,height,layout:'none',fill:'#FFFFFF',stroke:'#F0F0F0',strokeWidth:1,cornerRadius:8,metadata:{type:'props-cross-showcase'}});
 Insert(group,{type:'text',name:g.title,content:g.title,x:24,y:20,fontFamily:'Inter',fontSize:20,fontWeight:'600',fill:'#1F1F1F',textGrowth:'auto'});
 for(let k=0;k<g.samples.length;k++){
 const s=g.samples[k],component=s.component||name,definition=Get(byName[component],{depth:1}),file=definition.scriptUri?.split('/').pop().replace('.js','')||component,inputs={...(defaults[file]||{}),...s.inputs};
 if(s.width>cellW)throw Error(name+' exceeds cell: '+s.label);
 const cell=Insert(group,{type:'frame',name:s.label,x:24+(k%g.cols)*(cellW+24),y:64+Math.floor(k/g.cols)*cellH,width:cellW,height:cellH,layout:'none',fill:s.background||'#FFFFFF'});
 Insert(cell,{type:'text',name:'Configuration',content:s.label,x:0,y:0,width:cellW,height:36,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:12,lineHeight:1.4,fill:'#8C8C8C'});
 const node={type:'ref',name:component+' · '+s.label,ref:definition.id,x:8,y:52,width:s.width,height:s.height,inputs};
 if(component==='Avatar.Group'){
 const size=s.inputs.size==='small'?24:s.inputs.size==='large'?40:32;delete node.inputs;node.layout='none';node.descendants={};
 definition.children.forEach((c,j)=>{node.descendants[c.id]={x:j*(size-8),y:0,width:size,height:size,inputs:{...defaults.Avatar,...c.inputs,size:s.inputs.size,customSize:size,shape:s.inputs.shape}}});
 }
 if(component==='Badge'){
 delete node.inputs;const status=!!s.inputs.status,dot=!!s.inputs.dot,small=s.inputs.size==='small';node.clip=false;
 node.descendants={W3pV6:{enabled:!status},qQ3I2:{enabled:false},n6rSDv:{x:status?0:dot?37:small?32:30,y:status?0:dot?-3:small?-7:-10,width:status?s.width:40,height:status?22:20,inputs}};
 }
 if(['Tooltip','Popover'].includes(component)){
 delete node.inputs;const pop=component==='Popover',p=s.inputs.placement||'top',pw=pop?200:180,ph=pop?88:38,tw=112,th=32,gap=12;
 let tx=(s.width-tw)/2,ty=(s.height-th)/2,px=(s.width-pw)/2,py=0;
 if(p==='top'){ty=ph+gap;py=0;}else if(p==='bottom'){ty=10;py=ty+th+gap;}else if(p==='left'){px=0;tx=pw+gap;py=(s.height-ph)/2;}else{tx=0;px=tw+gap;py=(s.height-ph)/2;}
 node.descendants={[pop?'GcjUR':'AdefJ']:{x:tx,y:ty,width:tw,height:th,inputs:{...defaults.Button,children:'Hover me',type:'default',size:'middle'}},[pop?'esabY':'kPvKP']:{x:px,y:py,width:pw,height:ph,inputs}};
 }
 if(component==='Tour'){delete node.inputs;node.descendants={UVkCF:{enabled:false},p0HlBD:{x:0,y:0,width:s.width,height:s.height,inputs}};}
 if(s.scene){const scene=Insert(cell,{type:'frame',name:'Scroll container · static position',x:0,y:44,width:cellW,height:200,layout:'none',fill:'#FAFAFA',stroke:'#D9D9D9',strokeWidth:1,cornerRadius:6});node.x=16;node.y=s.scene.edge==='top'?s.scene.distance:200-s.scene.distance-s.height;Insert(scene,node);}else Insert(cell,node);
 }
 created.push({id:group,title:g.title,samples:g.samples.length});y+=height+24;
}
Update(board,{height:y+8,placeholder:false});
const section=Get(located.section,{depth:1});let sectionH=90;for(const c of section.children)if(c.type==='frame')Get(c.id,(n,cx)=>{if(cx.depth===0)sectionH=Math.max(sectionH,cx.bounds.y+cx.bounds.height+32);});Update(located.section,{height:sectionH});
let layerH=0;Get(located.layer,(n,c)=>{if(c.depth===1)layerH=Math.max(layerH,c.bounds.y+c.bounds.height);});Update(located.layer,{height:layerH});
let prev=Get('layer-data-display');for(const id of ['layer-feedback','layer-other']){const next=Get(id);if(next.y<prev.y+prev.height+160)Update(id,{y:prev.y+prev.height+160});prev=Get(id);}
Print({name,board,height:y+8,groups:created});