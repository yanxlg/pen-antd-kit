{
const name="Avatar",groups=[{"title":"Size × Shape × Content","cols":6,"samples":[{"label":"small · circle · Icon","inputs":{"size":"small","shape":"circle","icon":"UserOutlined","text":"","src":"","customSize":0},"width":24,"height":24},{"label":"small · circle · Text","inputs":{"size":"small","shape":"circle","icon":"","text":"U","src":"","customSize":0},"width":24,"height":24},{"label":"small · square · Icon","inputs":{"size":"small","shape":"square","icon":"UserOutlined","text":"","src":"","customSize":0},"width":24,"height":24},{"label":"small · square · Text","inputs":{"size":"small","shape":"square","icon":"","text":"U","src":"","customSize":0},"width":24,"height":24},{"label":"default · circle · Icon","inputs":{"size":"default","shape":"circle","icon":"UserOutlined","text":"","src":"","customSize":0},"width":32,"height":32},{"label":"default · circle · Text","inputs":{"size":"default","shape":"circle","icon":"","text":"U","src":"","customSize":0},"width":32,"height":32},{"label":"default · square · Icon","inputs":{"size":"default","shape":"square","icon":"UserOutlined","text":"","src":"","customSize":0},"width":32,"height":32},{"label":"default · square · Text","inputs":{"size":"default","shape":"square","icon":"","text":"U","src":"","customSize":0},"width":32,"height":32},{"label":"large · circle · Icon","inputs":{"size":"large","shape":"circle","icon":"UserOutlined","text":"","src":"","customSize":0},"width":40,"height":40},{"label":"large · circle · Text","inputs":{"size":"large","shape":"circle","icon":"","text":"U","src":"","customSize":0},"width":40,"height":40},{"label":"large · square · Icon","inputs":{"size":"large","shape":"square","icon":"UserOutlined","text":"","src":"","customSize":0},"width":40,"height":40},{"label":"large · square · Text","inputs":{"size":"large","shape":"square","icon":"","text":"U","src":"","customSize":0},"width":40,"height":40}]},{"title":"Text length × Gap","cols":4,"samples":[{"label":"U · gap 2","inputs":{"text":"U","gap":2,"customSize":64,"backgroundColor":"#F56A00"},"width":64,"height":64},{"label":"U · gap 8","inputs":{"text":"U","gap":8,"customSize":64,"backgroundColor":"#F56A00"},"width":64,"height":64},{"label":"USER · gap 2","inputs":{"text":"USER","gap":2,"customSize":64,"backgroundColor":"#F56A00"},"width":64,"height":64},{"label":"USER · gap 8","inputs":{"text":"USER","gap":8,"customSize":64,"backgroundColor":"#F56A00"},"width":64,"height":64},{"label":"ANT DESIGN · gap 2","inputs":{"text":"ANT DESIGN","gap":2,"customSize":64,"backgroundColor":"#F56A00"},"width":64,"height":64},{"label":"ANT DESIGN · gap 8","inputs":{"text":"ANT DESIGN","gap":8,"customSize":64,"backgroundColor":"#F56A00"},"width":64,"height":64}]},{"title":"Avatar.Group · Size × Shape","cols":6,"samples":[{"label":"small · circle","inputs":{"size":"small","shape":"circle"},"width":72,"height":24,"component":"Avatar.Group"},{"label":"small · square","inputs":{"size":"small","shape":"square"},"width":72,"height":24,"component":"Avatar.Group"},{"label":"default · circle","inputs":{"size":"default","shape":"circle"},"width":104,"height":32,"component":"Avatar.Group"},{"label":"default · square","inputs":{"size":"default","shape":"square"},"width":104,"height":32,"component":"Avatar.Group"},{"label":"large · circle","inputs":{"size":"large","shape":"circle"},"width":136,"height":40,"component":"Avatar.Group"},{"label":"large · square","inputs":{"size":"large","shape":"square"},"width":136,"height":40,"component":"Avatar.Group"}]}],defaults={"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"},"Avatar.Group":{"maxCount":0,"maxPopoverPlacement":"bottom","maxPopoverTrigger":"focus","shape":"square","primaryColor":"#1677FF"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Badge",groups=[{"title":"Count × Size","cols":6,"samples":[{"label":"5 · default","inputs":{"count":5,"size":"default"},"width":40,"height":40},{"label":"5 · small","inputs":{"count":5,"size":"small"},"width":40,"height":40},{"label":"99 · default","inputs":{"count":99,"size":"default"},"width":40,"height":40},{"label":"99 · small","inputs":{"count":99,"size":"small"},"width":40,"height":40},{"label":"100 · default","inputs":{"count":100,"size":"default"},"width":40,"height":40},{"label":"100 · small","inputs":{"count":100,"size":"small"},"width":40,"height":40}]},{"title":"Zero × Visibility / Dot × Color","cols":4,"samples":[{"label":"zero · default · showZero false","inputs":{"showZero":false,"size":"default","count":0},"width":40,"height":40},{"label":"zero · small · showZero false","inputs":{"showZero":false,"size":"small","count":0},"width":40,"height":40},{"label":"zero · default · showZero true","inputs":{"showZero":true,"size":"default","count":0},"width":40,"height":40},{"label":"zero · small · showZero true","inputs":{"showZero":true,"size":"small","count":0},"width":40,"height":40},{"label":"count · #FF4D4F","inputs":{"dot":false,"color":"#FF4D4F","count":8},"width":40,"height":40},{"label":"count · #1677FF","inputs":{"dot":false,"color":"#1677FF","count":8},"width":40,"height":40},{"label":"dot · #FF4D4F","inputs":{"dot":true,"color":"#FF4D4F","count":8},"width":40,"height":40},{"label":"dot · #1677FF","inputs":{"dot":true,"color":"#1677FF","count":8},"width":40,"height":40}]},{"title":"Status × Text","cols":5,"samples":[{"label":"success · dot","inputs":{"status":"success","text":""},"width":240,"height":22},{"label":"success · text","inputs":{"status":"success","text":"Status text"},"width":240,"height":22},{"label":"processing · dot","inputs":{"status":"processing","text":""},"width":240,"height":22},{"label":"processing · text","inputs":{"status":"processing","text":"Status text"},"width":240,"height":22},{"label":"default · dot","inputs":{"status":"default","text":""},"width":240,"height":22},{"label":"default · text","inputs":{"status":"default","text":"Status text"},"width":240,"height":22},{"label":"error · dot","inputs":{"status":"error","text":""},"width":240,"height":22},{"label":"error · text","inputs":{"status":"error","text":"Status text"},"width":240,"height":22},{"label":"warning · dot","inputs":{"status":"warning","text":""},"width":240,"height":22},{"label":"warning · text","inputs":{"status":"warning","text":"Status text"},"width":240,"height":22}]},{"title":"Badge.Ribbon · Placement × Color","cols":3,"samples":[{"label":"start · #1677FF","inputs":{"placement":"start","color":"#1677FF","text":"Featured","children":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"\",\"extra\":\"\",\"children\":\"Card content\",\"styles\":\"{\\\"body\\\":{\\\"padding\\\":40}}\"},\"width\":340,\"height\":160}"},"width":440,"height":160,"component":"Badge.Ribbon"},{"label":"start · #52C41A","inputs":{"placement":"start","color":"#52C41A","text":"Featured","children":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"\",\"extra\":\"\",\"children\":\"Card content\",\"styles\":\"{\\\"body\\\":{\\\"padding\\\":40}}\"},\"width\":340,\"height\":160}"},"width":440,"height":160,"component":"Badge.Ribbon"},{"label":"start · #722ED1","inputs":{"placement":"start","color":"#722ED1","text":"Featured","children":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"\",\"extra\":\"\",\"children\":\"Card content\",\"styles\":\"{\\\"body\\\":{\\\"padding\\\":40}}\"},\"width\":340,\"height\":160}"},"width":440,"height":160,"component":"Badge.Ribbon"},{"label":"end · #1677FF","inputs":{"placement":"end","color":"#1677FF","text":"Featured","children":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"\",\"extra\":\"\",\"children\":\"Card content\",\"styles\":\"{\\\"body\\\":{\\\"padding\\\":40}}\"},\"width\":340,\"height\":160}"},"width":440,"height":160,"component":"Badge.Ribbon"},{"label":"end · #52C41A","inputs":{"placement":"end","color":"#52C41A","text":"Featured","children":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"\",\"extra\":\"\",\"children\":\"Card content\",\"styles\":\"{\\\"body\\\":{\\\"padding\\\":40}}\"},\"width\":340,\"height\":160}"},"width":440,"height":160,"component":"Badge.Ribbon"},{"label":"end · #722ED1","inputs":{"placement":"end","color":"#722ED1","text":"Featured","children":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"\",\"extra\":\"\",\"children\":\"Card content\",\"styles\":\"{\\\"body\\\":{\\\"padding\\\":40}}\"},\"width\":340,\"height\":160}"},"width":440,"height":160,"component":"Badge.Ribbon"}]}],defaults={"Badge":{"children":"","status":"","text":"","count":5,"dot":false,"size":"default","showZero":false,"overflowCount":99,"color":"#FF4D4F","offsetX":0,"offsetY":0},"Badge.Ribbon":{"children":"","text":"Hippies","color":"#FF4D4F","styles":"{}","placement":"end"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Calendar",groups=[{"title":"Fullscreen × Mode × Week numbers","cols":2,"samples":[{"label":"card · month · week false","inputs":{"fullscreen":false,"mode":"month","showWeek":false,"value":"2026-09-19"},"width":340,"height":340},{"label":"card · month · week true","inputs":{"fullscreen":false,"mode":"month","showWeek":true,"value":"2026-09-19"},"width":340,"height":340},{"label":"card · year · week false","inputs":{"fullscreen":false,"mode":"year","showWeek":false,"value":"2026-09-19"},"width":340,"height":340},{"label":"card · year · week true","inputs":{"fullscreen":false,"mode":"year","showWeek":true,"value":"2026-09-19"},"width":340,"height":340},{"label":"full · month · week false","inputs":{"fullscreen":true,"mode":"month","showWeek":false,"value":"2026-09-19"},"width":740,"height":520},{"label":"full · month · week true","inputs":{"fullscreen":true,"mode":"month","showWeek":true,"value":"2026-09-19"},"width":740,"height":520},{"label":"full · year · week false","inputs":{"fullscreen":true,"mode":"year","showWeek":false,"value":"2026-09-19"},"width":740,"height":520},{"label":"full · year · week true","inputs":{"fullscreen":true,"mode":"year","showWeek":true,"value":"2026-09-19"},"width":740,"height":520}]}],defaults={"Calendar":{"fullscreen":true,"mode":"month","showWeek":false,"value":"2026-09-14","cellRender":"{}","fullCellRender":"{}","headerRender":"","styles":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Card",groups=[{"title":"Size × Variant × Loading","cols":2,"samples":[{"label":"default · outlined · content","inputs":{"size":"default","variant":"outlined","loading":false,"title":"Card title","children":"Card content","extra":"More","bordered":true},"width":720,"height":180},{"label":"default · outlined · loading","inputs":{"size":"default","variant":"outlined","loading":true,"title":"Card title","children":"Card content","extra":"More","bordered":true},"width":720,"height":180},{"label":"default · borderless · content","inputs":{"size":"default","variant":"borderless","loading":false,"title":"Card title","children":"Card content","extra":"More","bordered":false},"width":720,"height":180,"background":"#F5F5F5"},{"label":"default · borderless · loading","inputs":{"size":"default","variant":"borderless","loading":true,"title":"Card title","children":"Card content","extra":"More","bordered":false},"width":720,"height":180,"background":"#F5F5F5"},{"label":"small · outlined · content","inputs":{"size":"small","variant":"outlined","loading":false,"title":"Card title","children":"Card content","extra":"More","bordered":true},"width":720,"height":180},{"label":"small · outlined · loading","inputs":{"size":"small","variant":"outlined","loading":true,"title":"Card title","children":"Card content","extra":"More","bordered":true},"width":720,"height":180},{"label":"small · borderless · content","inputs":{"size":"small","variant":"borderless","loading":false,"title":"Card title","children":"Card content","extra":"More","bordered":false},"width":720,"height":180,"background":"#F5F5F5"},{"label":"small · borderless · loading","inputs":{"size":"small","variant":"borderless","loading":true,"title":"Card title","children":"Card content","extra":"More","bordered":false},"width":720,"height":180,"background":"#F5F5F5"}]},{"title":"Card.Meta × Card.Grid","cols":3,"samples":[{"label":"Meta · title + description","inputs":{"title":"Europe Street beat","description":"www.instagram.com"},"width":440,"height":90,"component":"Card.Meta"},{"label":"Meta · description only","inputs":{"title":"","description":"Description"},"width":440,"height":90,"component":"Card.Meta"},{"label":"Grid · hoverable false","inputs":{"children":"Content","hoverable":false},"width":300,"height":100,"component":"Card.Grid"},{"label":"Grid · hoverable true","inputs":{"children":"Content","hoverable":true},"width":300,"height":100,"component":"Card.Grid"}]}],defaults={"Card":{"title":"Card title","extra":"More","children":"Card content","bordered":true,"size":"default","hoverable":false,"loading":false,"variant":"outlined","cover":false,"actions":false,"primaryColor":"#1677FF"},"Card.Meta":{"title":"Card title","description":"This is the description","avatar":"","styles":"{}"},"Card.Grid":{"children":"Content","hoverable":true},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"},"Card.content":{"title":"Card title","extra":"More","children":"Card content","bordered":true,"size":"default","hoverable":false,"loading":false,"variant":"outlined","cover":"","actions":"[]","primaryColor":"#1677FF","styles":"{}","type":"default"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Carousel",groups=[{"title":"Dot placement × Arrows","cols":2,"samples":[{"label":"top · arrows false","inputs":{"dotPlacement":"top","arrows":false,"dots":true,"children":"1|2|3|4"},"width":720,"height":160},{"label":"top · arrows true","inputs":{"dotPlacement":"top","arrows":true,"dots":true,"children":"1|2|3|4"},"width":720,"height":160},{"label":"bottom · arrows false","inputs":{"dotPlacement":"bottom","arrows":false,"dots":true,"children":"1|2|3|4"},"width":720,"height":160},{"label":"bottom · arrows true","inputs":{"dotPlacement":"bottom","arrows":true,"dots":true,"children":"1|2|3|4"},"width":720,"height":160},{"label":"start · arrows false","inputs":{"dotPlacement":"start","arrows":false,"dots":true,"children":"1|2|3|4"},"width":720,"height":160},{"label":"start · arrows true","inputs":{"dotPlacement":"start","arrows":true,"dots":true,"children":"1|2|3|4"},"width":720,"height":160},{"label":"end · arrows false","inputs":{"dotPlacement":"end","arrows":false,"dots":true,"children":"1|2|3|4"},"width":720,"height":160},{"label":"end · arrows true","inputs":{"dotPlacement":"end","arrows":true,"dots":true,"children":"1|2|3|4"},"width":720,"height":160}]},{"title":"Initial slide × Indicators","cols":2,"samples":[{"label":"slide 1 · dots false","inputs":{"initialSlide":0,"dots":false,"arrows":true},"width":720,"height":160},{"label":"slide 1 · dots true","inputs":{"initialSlide":0,"dots":true,"arrows":true},"width":720,"height":160},{"label":"slide 3 · dots false","inputs":{"initialSlide":2,"dots":false,"arrows":true},"width":720,"height":160},{"label":"slide 3 · dots true","inputs":{"initialSlide":2,"dots":true,"arrows":true},"width":720,"height":160}]}],defaults={"Carousel":{"children":"1|2|3|4","arrows":false,"dots":true,"dotPlacement":"bottom","initialSlide":0,"effect":"scrollx","autoplay":"false"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Collapse",groups=[{"title":"Size × Surface × Expanded panels","cols":2,"samples":[{"label":"small · outlined · closed","inputs":{"size":"small","ghost":false,"activeKey":"[]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":118},{"label":"small · outlined · expanded","inputs":{"size":"small","ghost":false,"activeKey":"[\"1\",\"2\"]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":226},{"label":"small · ghost · closed","inputs":{"size":"small","ghost":true,"activeKey":"[]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":118},{"label":"small · ghost · expanded","inputs":{"size":"small","ghost":true,"activeKey":"[\"1\",\"2\"]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":226},{"label":"middle · outlined · closed","inputs":{"size":"middle","ghost":false,"activeKey":"[]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":142},{"label":"middle · outlined · expanded","inputs":{"size":"middle","ghost":false,"activeKey":"[\"1\",\"2\"]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":250},{"label":"middle · ghost · closed","inputs":{"size":"middle","ghost":true,"activeKey":"[]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":142},{"label":"middle · ghost · expanded","inputs":{"size":"middle","ghost":true,"activeKey":"[\"1\",\"2\"]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":250},{"label":"large · outlined · closed","inputs":{"size":"large","ghost":false,"activeKey":"[]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":175},{"label":"large · outlined · expanded","inputs":{"size":"large","ghost":false,"activeKey":"[\"1\",\"2\"]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":283},{"label":"large · ghost · closed","inputs":{"size":"large","ghost":true,"activeKey":"[]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":175},{"label":"large · ghost · expanded","inputs":{"size":"large","ghost":true,"activeKey":"[\"1\",\"2\"]","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]"},"width":720,"height":283}]},{"title":"Expand icon placement × Disabled","cols":2,"samples":[{"label":"start · header","inputs":{"expandIconPlacement":"start","collapsible":"header","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]","activeKey":"[]"},"width":720,"height":142},{"label":"start · disabled","inputs":{"expandIconPlacement":"start","collapsible":"disabled","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]","activeKey":"[]"},"width":720,"height":142},{"label":"end · header","inputs":{"expandIconPlacement":"end","collapsible":"header","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]","activeKey":"[]"},"width":720,"height":142},{"label":"end · disabled","inputs":{"expandIconPlacement":"end","collapsible":"disabled","items":"[{\"key\":\"1\",\"label\":\"Panel 1\",\"children\":\"Panel content 1\"},{\"key\":\"2\",\"label\":\"Panel 2\",\"children\":\"Panel content 2\"},{\"key\":\"3\",\"label\":\"Panel 3\",\"children\":\"Panel content 3\"}]","activeKey":"[]"},"width":720,"height":142}]}],defaults={"Collapse":{"items":"This is panel header 1|This is panel header 2|This is panel header 3","activeKey":"1","accordion":false,"bordered":true,"collapsible":"header","expandIconPlacement":"start","expandIcon":"","ghost":false,"size":"middle","styles":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Descriptions",groups=[{"title":"Layout × Border × Size","cols":2,"samples":[{"label":"horizontal · border false · small","inputs":{"layout":"horizontal","bordered":false,"size":"small","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"horizontal · border false · middle","inputs":{"layout":"horizontal","bordered":false,"size":"middle","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"horizontal · border false · large","inputs":{"layout":"horizontal","bordered":false,"size":"large","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"horizontal · border true · small","inputs":{"layout":"horizontal","bordered":true,"size":"small","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"horizontal · border true · middle","inputs":{"layout":"horizontal","bordered":true,"size":"middle","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"horizontal · border true · large","inputs":{"layout":"horizontal","bordered":true,"size":"large","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"vertical · border false · small","inputs":{"layout":"vertical","bordered":false,"size":"small","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"vertical · border false · middle","inputs":{"layout":"vertical","bordered":false,"size":"middle","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"vertical · border false · large","inputs":{"layout":"vertical","bordered":false,"size":"large","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"vertical · border true · small","inputs":{"layout":"vertical","bordered":true,"size":"small","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"vertical · border true · middle","inputs":{"layout":"vertical","bordered":true,"size":"middle","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260},{"label":"vertical · border true · large","inputs":{"layout":"vertical","bordered":true,"size":"large","title":"User information","column":3,"items":"Name:Zhou Maomao|Telephone:1810000000|Live:Hangzhou|Remark:None|Address:West Lake District|Status:Active"},"width":740,"height":260}]},{"title":"Columns × Colon","cols":2,"samples":[{"label":"1 columns · colon false","inputs":{"column":1,"colon":false},"width":740,"height":260},{"label":"1 columns · colon true","inputs":{"column":1,"colon":true},"width":740,"height":260},{"label":"2 columns · colon false","inputs":{"column":2,"colon":false},"width":740,"height":260},{"label":"2 columns · colon true","inputs":{"column":2,"colon":true},"width":740,"height":260},{"label":"3 columns · colon false","inputs":{"column":3,"colon":false},"width":740,"height":260},{"label":"3 columns · colon true","inputs":{"column":3,"colon":true},"width":740,"height":260}]}],defaults={"Descriptions":{"title":"User Info","extra":"","items":"Product:Cloud Database|Billing Mode:Prepaid|Automatic Renewal:YES","bordered":false,"size":"middle","colon":true,"layout":"horizontal","column":3,"styles":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Empty",groups=[{"title":"Image × Description × Action","cols":3,"samples":[{"label":"default · No data · no action","inputs":{"image":"default","description":"No data","children":""},"width":460,"height":210},{"label":"default · No data · action","inputs":{"image":"default","description":"No data","children":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"DQZzq\",\"inputs\":{\"children\":\"Create now\",\"type\":\"primary\",\"icon\":\"\",\"size\":\"middle\"},\"width\":140,\"height\":32}"},"width":460,"height":210},{"label":"default · No matching results · no action","inputs":{"image":"default","description":"No matching results","children":""},"width":460,"height":210},{"label":"default · No matching results · action","inputs":{"image":"default","description":"No matching results","children":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"DQZzq\",\"inputs\":{\"children\":\"Create now\",\"type\":\"primary\",\"icon\":\"\",\"size\":\"middle\"},\"width\":140,\"height\":32}"},"width":460,"height":210},{"label":"simple · No data · no action","inputs":{"image":"simple","description":"No data","children":""},"width":460,"height":210},{"label":"simple · No data · action","inputs":{"image":"simple","description":"No data","children":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"DQZzq\",\"inputs\":{\"children\":\"Create now\",\"type\":\"primary\",\"icon\":\"\",\"size\":\"middle\"},\"width\":140,\"height\":32}"},"width":460,"height":210},{"label":"simple · No matching results · no action","inputs":{"image":"simple","description":"No matching results","children":""},"width":460,"height":210},{"label":"simple · No matching results · action","inputs":{"image":"simple","description":"No matching results","children":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"DQZzq\",\"inputs\":{\"children\":\"Create now\",\"type\":\"primary\",\"icon\":\"\",\"size\":\"middle\"},\"width\":140,\"height\":32}"},"width":460,"height":210}]}],defaults={"Empty":{"description":"No data","image":"default","children":"","styles":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Image",groups=[{"title":"Image size × Preview","cols":3,"samples":[{"label":"120px · preview true","inputs":{"src":"images/ant.design/c1f5bcc0f96aaa3c.png","width":120,"height":120,"preview":"true"},"width":120,"height":120},{"label":"120px · preview false","inputs":{"src":"images/ant.design/c1f5bcc0f96aaa3c.png","width":120,"height":120,"preview":"false"},"width":120,"height":120},{"label":"180px · preview true","inputs":{"src":"images/ant.design/c1f5bcc0f96aaa3c.png","width":180,"height":180,"preview":"true"},"width":180,"height":180},{"label":"180px · preview false","inputs":{"src":"images/ant.design/c1f5bcc0f96aaa3c.png","width":180,"height":180,"preview":"false"},"width":180,"height":180},{"label":"240px · preview true","inputs":{"src":"images/ant.design/c1f5bcc0f96aaa3c.png","width":240,"height":240,"preview":"true"},"width":240,"height":240},{"label":"240px · preview false","inputs":{"src":"images/ant.design/c1f5bcc0f96aaa3c.png","width":240,"height":240,"preview":"false"},"width":240,"height":240}]},{"title":"Image.PreviewGroup · Two images × Size","cols":2,"samples":[{"label":"120px × 2","inputs":{"children":"[{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"tTT7M\",\"inputs\":{\"src\":\"images/ant.design/c1f5bcc0f96aaa3c.png\",\"width\":120,\"height\":120},\"width\":120,\"height\":120,\"x\":0,\"y\":0},{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"tTT7M\",\"inputs\":{\"src\":\"images/ant.design/c1f5bcc0f96aaa3c.png\",\"width\":120,\"height\":120},\"width\":120,\"height\":120,\"x\":136,\"y\":0}]"},"width":256,"height":120,"component":"Image.PreviewGroup"},{"label":"180px × 2","inputs":{"children":"[{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"tTT7M\",\"inputs\":{\"src\":\"images/ant.design/c1f5bcc0f96aaa3c.png\",\"width\":180,\"height\":180},\"width\":180,\"height\":180,\"x\":0,\"y\":0},{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"tTT7M\",\"inputs\":{\"src\":\"images/ant.design/c1f5bcc0f96aaa3c.png\",\"width\":180,\"height\":180},\"width\":180,\"height\":180,\"x\":196,\"y\":0}]"},"width":376,"height":180,"component":"Image.PreviewGroup"}]}],defaults={"Image":{"width":200,"height":200,"src":"images/ant.design/c1f5bcc0f96aaa3c.png","alt":"","fallback":"","preview":"true","placeholder":"","styles":"{}","loading":"lazy"},"Image.PreviewGroup":{"children":"","items":"[]","preview":"true"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Listy",groups=[{"title":"Viewport × Row height","cols":2,"samples":[{"label":"height 192 · row 40","inputs":{"height":192,"items":"[{\"key\":\"0\",\"label\":\"List item 1\"},{\"key\":\"1\",\"label\":\"List item 2\"},{\"key\":\"2\",\"label\":\"List item 3\"},{\"key\":\"3\",\"label\":\"List item 4\"},{\"key\":\"4\",\"label\":\"List item 5\"},{\"key\":\"5\",\"label\":\"List item 6\"},{\"key\":\"6\",\"label\":\"List item 7\"},{\"key\":\"7\",\"label\":\"List item 8\"},{\"key\":\"8\",\"label\":\"List item 9\"},{\"key\":\"9\",\"label\":\"List item 10\"},{\"key\":\"10\",\"label\":\"List item 11\"},{\"key\":\"11\",\"label\":\"List item 12\"}]","styles":"{\"item\":{\"height\":40}}"},"width":720,"height":192},{"label":"height 192 · row 64","inputs":{"height":192,"items":"[{\"key\":\"0\",\"label\":\"List item 1\"},{\"key\":\"1\",\"label\":\"List item 2\"},{\"key\":\"2\",\"label\":\"List item 3\"},{\"key\":\"3\",\"label\":\"List item 4\"},{\"key\":\"4\",\"label\":\"List item 5\"},{\"key\":\"5\",\"label\":\"List item 6\"},{\"key\":\"6\",\"label\":\"List item 7\"},{\"key\":\"7\",\"label\":\"List item 8\"},{\"key\":\"8\",\"label\":\"List item 9\"},{\"key\":\"9\",\"label\":\"List item 10\"},{\"key\":\"10\",\"label\":\"List item 11\"},{\"key\":\"11\",\"label\":\"List item 12\"}]","styles":"{\"item\":{\"height\":64}}"},"width":720,"height":192},{"label":"height 320 · row 40","inputs":{"height":320,"items":"[{\"key\":\"0\",\"label\":\"List item 1\"},{\"key\":\"1\",\"label\":\"List item 2\"},{\"key\":\"2\",\"label\":\"List item 3\"},{\"key\":\"3\",\"label\":\"List item 4\"},{\"key\":\"4\",\"label\":\"List item 5\"},{\"key\":\"5\",\"label\":\"List item 6\"},{\"key\":\"6\",\"label\":\"List item 7\"},{\"key\":\"7\",\"label\":\"List item 8\"},{\"key\":\"8\",\"label\":\"List item 9\"},{\"key\":\"9\",\"label\":\"List item 10\"},{\"key\":\"10\",\"label\":\"List item 11\"},{\"key\":\"11\",\"label\":\"List item 12\"}]","styles":"{\"item\":{\"height\":40}}"},"width":720,"height":320},{"label":"height 320 · row 64","inputs":{"height":320,"items":"[{\"key\":\"0\",\"label\":\"List item 1\"},{\"key\":\"1\",\"label\":\"List item 2\"},{\"key\":\"2\",\"label\":\"List item 3\"},{\"key\":\"3\",\"label\":\"List item 4\"},{\"key\":\"4\",\"label\":\"List item 5\"},{\"key\":\"5\",\"label\":\"List item 6\"},{\"key\":\"6\",\"label\":\"List item 7\"},{\"key\":\"7\",\"label\":\"List item 8\"},{\"key\":\"8\",\"label\":\"List item 9\"},{\"key\":\"9\",\"label\":\"List item 10\"},{\"key\":\"10\",\"label\":\"List item 11\"},{\"key\":\"11\",\"label\":\"List item 12\"}]","styles":"{\"item\":{\"height\":64}}"},"width":720,"height":320}]},{"title":"Item composition × Viewport","cols":2,"samples":[{"label":"Card instances · 192px","inputs":{"height":192,"itemRender":"[{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"Item 1\",\"children\":\"Item content\",\"size\":\"small\",\"extra\":\"\"},\"width\":340,\"height\":88},{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"Item 2\",\"children\":\"Item content\",\"size\":\"small\",\"extra\":\"\"},\"width\":340,\"height\":88},{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"Item 3\",\"children\":\"Item content\",\"size\":\"small\",\"extra\":\"\"},\"width\":340,\"height\":88},{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"Item 4\",\"children\":\"Item content\",\"size\":\"small\",\"extra\":\"\"},\"width\":340,\"height\":88}]"},"width":720,"height":192},{"label":"Card instances · 320px","inputs":{"height":320,"itemRender":"[{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"Item 1\",\"children\":\"Item content\",\"size\":\"small\",\"extra\":\"\"},\"width\":340,\"height\":88},{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"Item 2\",\"children\":\"Item content\",\"size\":\"small\",\"extra\":\"\"},\"width\":340,\"height\":88},{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"Item 3\",\"children\":\"Item content\",\"size\":\"small\",\"extra\":\"\"},\"width\":340,\"height\":88},{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"LSKNJ\",\"inputs\":{\"title\":\"Item 4\",\"children\":\"Item content\",\"size\":\"small\",\"extra\":\"\"},\"width\":340,\"height\":88}]"},"width":720,"height":320}]}],defaults={"Listy":{"itemRender":"[]","group":"{}","items":"List item 1|List item 2|List item 3|List item 4|List item 5","rowKey":"key","height":320,"virtual":true,"sticky":false,"styles":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Popover",groups=[{"title":"Placement × Arrow","cols":3,"samples":[{"label":"top · arrow false","inputs":{"placement":"top","arrow":false,"open":true,"title":"Title","content":"Popover content"},"width":480,"height":200},{"label":"top · arrow true","inputs":{"placement":"top","arrow":true,"open":true,"title":"Title","content":"Popover content"},"width":480,"height":200},{"label":"bottom · arrow false","inputs":{"placement":"bottom","arrow":false,"open":true,"title":"Title","content":"Popover content"},"width":480,"height":200},{"label":"bottom · arrow true","inputs":{"placement":"bottom","arrow":true,"open":true,"title":"Title","content":"Popover content"},"width":480,"height":200},{"label":"left · arrow false","inputs":{"placement":"left","arrow":false,"open":true,"title":"Title","content":"Popover content"},"width":480,"height":200},{"label":"left · arrow true","inputs":{"placement":"left","arrow":true,"open":true,"title":"Title","content":"Popover content"},"width":480,"height":200},{"label":"right · arrow false","inputs":{"placement":"right","arrow":false,"open":true,"title":"Title","content":"Popover content"},"width":480,"height":200},{"label":"right · arrow true","inputs":{"placement":"right","arrow":true,"open":true,"title":"Title","content":"Popover content"},"width":480,"height":200}]},{"title":"Title × Content","cols":3,"samples":[{"label":"Title + content","inputs":{"open":true,"title":"Details","content":"Additional information"},"width":480,"height":200},{"label":"Content only","inputs":{"open":true,"title":"","content":"Content without a heading"},"width":480,"height":200},{"label":"Nested Button","inputs":{"open":true,"title":"Action","content":"{\"type\":\"ref\",\"name\":\"Nested component\",\"ref\":\"DQZzq\",\"inputs\":{\"children\":\"Continue\",\"type\":\"primary\",\"icon\":\"\",\"size\":\"middle\"},\"width\":140,\"height\":32}"},"width":480,"height":200}]}],defaults={"Popover":{"title":"Title","content":"Content","open":false,"defaultOpen":false,"arrow":true,"trigger":"hover","placement":"top","styles":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="QRCode",groups=[{"title":"Status × Border","cols":4,"samples":[{"label":"active · border false","inputs":{"status":"active","bordered":false,"size":160},"width":160,"height":160},{"label":"active · border true","inputs":{"status":"active","bordered":true,"size":160},"width":160,"height":160},{"label":"loading · border false","inputs":{"status":"loading","bordered":false,"size":160},"width":160,"height":160},{"label":"loading · border true","inputs":{"status":"loading","bordered":true,"size":160},"width":160,"height":160},{"label":"expired · border false","inputs":{"status":"expired","bordered":false,"size":160},"width":160,"height":160},{"label":"expired · border true","inputs":{"status":"expired","bordered":true,"size":160},"width":160,"height":160},{"label":"scanned · border false","inputs":{"status":"scanned","bordered":false,"size":160},"width":160,"height":160},{"label":"scanned · border true","inputs":{"status":"scanned","bordered":true,"size":160},"width":160,"height":160}]},{"title":"Size × Error correction","cols":4,"samples":[{"label":"120px · L","inputs":{"size":120,"errorLevel":"L"},"width":120,"height":120},{"label":"120px · M","inputs":{"size":120,"errorLevel":"M"},"width":120,"height":120},{"label":"120px · Q","inputs":{"size":120,"errorLevel":"Q"},"width":120,"height":120},{"label":"120px · H","inputs":{"size":120,"errorLevel":"H"},"width":120,"height":120},{"label":"200px · L","inputs":{"size":200,"errorLevel":"L"},"width":200,"height":200},{"label":"200px · M","inputs":{"size":200,"errorLevel":"M"},"width":200,"height":200},{"label":"200px · Q","inputs":{"size":200,"errorLevel":"Q"},"width":200,"height":200},{"label":"200px · H","inputs":{"size":200,"errorLevel":"H"},"width":200,"height":200}]}],defaults={"QRCode":{"value":"https://ant.design","size":160,"status":"active","bgColor":"#FFFFFF","color":"#000000","bordered":true,"errorLevel":"M","type":"canvas","icon":"","iconSize":40,"statusRender":"","styles":"{}","primaryColor":"#1677FF"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Segmented",groups=[{"title":"Size × Shape × Disabled","cols":3,"samples":[{"label":"small · default · disabled false","inputs":{"size":"small","shape":"default","disabled":false,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":180,"height":24},{"label":"small · default · disabled true","inputs":{"size":"small","shape":"default","disabled":true,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":180,"height":24},{"label":"small · round · disabled false","inputs":{"size":"small","shape":"round","disabled":false,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":180,"height":24},{"label":"small · round · disabled true","inputs":{"size":"small","shape":"round","disabled":true,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":180,"height":24},{"label":"middle · default · disabled false","inputs":{"size":"middle","shape":"default","disabled":false,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":204,"height":32},{"label":"middle · default · disabled true","inputs":{"size":"middle","shape":"default","disabled":true,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":204,"height":32},{"label":"middle · round · disabled false","inputs":{"size":"middle","shape":"round","disabled":false,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":204,"height":32},{"label":"middle · round · disabled true","inputs":{"size":"middle","shape":"round","disabled":true,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":204,"height":32},{"label":"large · default · disabled false","inputs":{"size":"large","shape":"default","disabled":false,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":223,"height":40},{"label":"large · default · disabled true","inputs":{"size":"large","shape":"default","disabled":true,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":223,"height":40},{"label":"large · round · disabled false","inputs":{"size":"large","shape":"round","disabled":false,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":223,"height":40},{"label":"large · round · disabled true","inputs":{"size":"large","shape":"round","disabled":true,"options":"Daily|Weekly|Monthly","value":"Weekly"},"width":223,"height":40}]},{"title":"Orientation × Selection","cols":3,"samples":[{"label":"horizontal · Daily","inputs":{"orientation":"horizontal","value":"Daily","options":"Daily|Weekly|Monthly","block":true},"width":420,"height":32},{"label":"horizontal · Weekly","inputs":{"orientation":"horizontal","value":"Weekly","options":"Daily|Weekly|Monthly","block":true},"width":420,"height":32},{"label":"horizontal · Monthly","inputs":{"orientation":"horizontal","value":"Monthly","options":"Daily|Weekly|Monthly","block":true},"width":420,"height":32},{"label":"vertical · Daily","inputs":{"orientation":"vertical","value":"Daily","options":"Daily|Weekly|Monthly","block":true},"width":180,"height":88},{"label":"vertical · Weekly","inputs":{"orientation":"vertical","value":"Weekly","options":"Daily|Weekly|Monthly","block":true},"width":180,"height":88},{"label":"vertical · Monthly","inputs":{"orientation":"vertical","value":"Monthly","options":"Daily|Weekly|Monthly","block":true},"width":180,"height":88}]}],defaults={"Segmented":{"options":"Daily|Weekly|Monthly","value":"Daily","size":"middle","disabled":false,"block":false,"vertical":false,"orientation":"horizontal","shape":"default","styles":"{}","name":""},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Statistic",groups=[{"title":"Precision × Loading","cols":3,"samples":[{"label":"precision 0 · loading false","inputs":{"precision":0,"loading":false,"title":"Account balance","value":"112893.56","prefix":"$","suffix":""},"width":440,"height":80},{"label":"precision 0 · loading true","inputs":{"precision":0,"loading":true,"title":"Account balance","value":"112893.56","prefix":"$","suffix":""},"width":440,"height":80},{"label":"precision 1 · loading false","inputs":{"precision":1,"loading":false,"title":"Account balance","value":"112893.56","prefix":"$","suffix":""},"width":440,"height":80},{"label":"precision 1 · loading true","inputs":{"precision":1,"loading":true,"title":"Account balance","value":"112893.56","prefix":"$","suffix":""},"width":440,"height":80},{"label":"precision 2 · loading false","inputs":{"precision":2,"loading":false,"title":"Account balance","value":"112893.56","prefix":"$","suffix":""},"width":440,"height":80},{"label":"precision 2 · loading true","inputs":{"precision":2,"loading":true,"title":"Account balance","value":"112893.56","prefix":"$","suffix":""},"width":440,"height":80}]},{"title":"Prefix × Suffix","cols":3,"samples":[{"label":"Growth","inputs":{"title":"Growth","value":"11.28","precision":2,"prefix":"↑","suffix":"%","valueStyle":"{\"color\":\"#3f8600\"}"},"width":440,"height":80},{"label":"Capacity","inputs":{"title":"Capacity","value":"93","suffix":"/ 100"},"width":440,"height":80},{"label":"Custom separators","inputs":{"title":"Account balance","value":"112893.56","precision":2,"decimalSeparator":",","groupSeparator":"."},"width":440,"height":80}]}],defaults={"Statistic":{"title":"Active Users","value":"112893","prefix":"","suffix":"","precision":0,"decimalSeparator":".","groupSeparator":",","loading":false,"styles":"{}","valueStyle":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Table",groups=[{"title":"Size × Border × Header","cols":2,"samples":[{"label":"small · border false · header false","inputs":{"size":"small","bordered":false,"showHeader":false,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"small · border false · header true","inputs":{"size":"small","bordered":false,"showHeader":true,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"small · border true · header false","inputs":{"size":"small","bordered":true,"showHeader":false,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"small · border true · header true","inputs":{"size":"small","bordered":true,"showHeader":true,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"middle · border false · header false","inputs":{"size":"middle","bordered":false,"showHeader":false,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"middle · border false · header true","inputs":{"size":"middle","bordered":false,"showHeader":true,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"middle · border true · header false","inputs":{"size":"middle","bordered":true,"showHeader":false,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"middle · border true · header true","inputs":{"size":"middle","bordered":true,"showHeader":true,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"large · border false · header false","inputs":{"size":"large","bordered":false,"showHeader":false,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"large · border false · header true","inputs":{"size":"large","bordered":false,"showHeader":true,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"large · border true · header false","inputs":{"size":"large","bordered":true,"showHeader":false,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240},{"label":"large · border true · header true","inputs":{"size":"large","bordered":true,"showHeader":true,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","pagination":false},"width":740,"height":240}]},{"title":"Loading × Pagination","cols":2,"samples":[{"label":"loading false · pagination false","inputs":{"loading":false,"pagination":false,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","size":"middle"},"width":740,"height":260},{"label":"loading false · pagination true","inputs":{"loading":false,"pagination":true,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","size":"middle"},"width":740,"height":260},{"label":"loading true · pagination false","inputs":{"loading":true,"pagination":false,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","size":"middle"},"width":740,"height":260},{"label":"loading true · pagination true","inputs":{"loading":true,"pagination":true,"columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"},{\"key\":\"2\",\"name\":\"Jim Green\",\"age\":42,\"address\":\"London\"},{\"key\":\"3\",\"name\":\"Joe Black\",\"age\":28,\"address\":\"Sydney\"}]","size":"middle"},"width":740,"height":260}]}],defaults={"Table":{"dataSource":"[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"}]","columns":"[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]","bordered":false,"size":"large","showHeader":true,"loading":false,"pagination":true,"virtual":false,"rowSelection":"{}","scroll":"{}","locale":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Tag",groups=[{"title":"Color × Variant × Closable","cols":6,"samples":[{"label":"default · outlined · plain","inputs":{"color":"default","variant":"outlined","closable":false,"children":"default"},"width":63,"height":22},{"label":"default · outlined · close","inputs":{"color":"default","variant":"outlined","closable":true,"children":"default"},"width":79,"height":22},{"label":"default · filled · plain","inputs":{"color":"default","variant":"filled","closable":false,"children":"default"},"width":63,"height":22},{"label":"default · filled · close","inputs":{"color":"default","variant":"filled","closable":true,"children":"default"},"width":79,"height":22},{"label":"default · solid · plain","inputs":{"color":"default","variant":"solid","closable":false,"children":"default"},"width":63,"height":22},{"label":"default · solid · close","inputs":{"color":"default","variant":"solid","closable":true,"children":"default"},"width":79,"height":22},{"label":"success · outlined · plain","inputs":{"color":"success","variant":"outlined","closable":false,"children":"success"},"width":63,"height":22},{"label":"success · outlined · close","inputs":{"color":"success","variant":"outlined","closable":true,"children":"success"},"width":79,"height":22},{"label":"success · filled · plain","inputs":{"color":"success","variant":"filled","closable":false,"children":"success"},"width":63,"height":22},{"label":"success · filled · close","inputs":{"color":"success","variant":"filled","closable":true,"children":"success"},"width":79,"height":22},{"label":"success · solid · plain","inputs":{"color":"success","variant":"solid","closable":false,"children":"success"},"width":63,"height":22},{"label":"success · solid · close","inputs":{"color":"success","variant":"solid","closable":true,"children":"success"},"width":79,"height":22},{"label":"processing · outlined · plain","inputs":{"color":"processing","variant":"outlined","closable":false,"children":"processing"},"width":84,"height":22},{"label":"processing · outlined · close","inputs":{"color":"processing","variant":"outlined","closable":true,"children":"processing"},"width":100,"height":22},{"label":"processing · filled · plain","inputs":{"color":"processing","variant":"filled","closable":false,"children":"processing"},"width":84,"height":22},{"label":"processing · filled · close","inputs":{"color":"processing","variant":"filled","closable":true,"children":"processing"},"width":100,"height":22},{"label":"processing · solid · plain","inputs":{"color":"processing","variant":"solid","closable":false,"children":"processing"},"width":84,"height":22},{"label":"processing · solid · close","inputs":{"color":"processing","variant":"solid","closable":true,"children":"processing"},"width":100,"height":22},{"label":"warning · outlined · plain","inputs":{"color":"warning","variant":"outlined","closable":false,"children":"warning"},"width":63,"height":22},{"label":"warning · outlined · close","inputs":{"color":"warning","variant":"outlined","closable":true,"children":"warning"},"width":79,"height":22},{"label":"warning · filled · plain","inputs":{"color":"warning","variant":"filled","closable":false,"children":"warning"},"width":63,"height":22},{"label":"warning · filled · close","inputs":{"color":"warning","variant":"filled","closable":true,"children":"warning"},"width":79,"height":22},{"label":"warning · solid · plain","inputs":{"color":"warning","variant":"solid","closable":false,"children":"warning"},"width":63,"height":22},{"label":"warning · solid · close","inputs":{"color":"warning","variant":"solid","closable":true,"children":"warning"},"width":79,"height":22},{"label":"error · outlined · plain","inputs":{"color":"error","variant":"outlined","closable":false,"children":"error"},"width":49,"height":22},{"label":"error · outlined · close","inputs":{"color":"error","variant":"outlined","closable":true,"children":"error"},"width":65,"height":22},{"label":"error · filled · plain","inputs":{"color":"error","variant":"filled","closable":false,"children":"error"},"width":49,"height":22},{"label":"error · filled · close","inputs":{"color":"error","variant":"filled","closable":true,"children":"error"},"width":65,"height":22},{"label":"error · solid · plain","inputs":{"color":"error","variant":"solid","closable":false,"children":"error"},"width":49,"height":22},{"label":"error · solid · close","inputs":{"color":"error","variant":"solid","closable":true,"children":"error"},"width":65,"height":22},{"label":"purple · outlined · plain","inputs":{"color":"purple","variant":"outlined","closable":false,"children":"purple"},"width":56,"height":22},{"label":"purple · outlined · close","inputs":{"color":"purple","variant":"outlined","closable":true,"children":"purple"},"width":72,"height":22},{"label":"purple · filled · plain","inputs":{"color":"purple","variant":"filled","closable":false,"children":"purple"},"width":56,"height":22},{"label":"purple · filled · close","inputs":{"color":"purple","variant":"filled","closable":true,"children":"purple"},"width":72,"height":22},{"label":"purple · solid · plain","inputs":{"color":"purple","variant":"solid","closable":false,"children":"purple"},"width":56,"height":22},{"label":"purple · solid · close","inputs":{"color":"purple","variant":"solid","closable":true,"children":"purple"},"width":72,"height":22}]},{"title":"Tag.CheckableTag · Checked × Label","cols":4,"samples":[{"label":"Movies · checked false","inputs":{"checked":false,"children":"Movies"},"width":120,"height":32,"component":"Tag.CheckableTag"},{"label":"Books · checked false","inputs":{"checked":false,"children":"Books"},"width":120,"height":32,"component":"Tag.CheckableTag"},{"label":"Movies · checked true","inputs":{"checked":true,"children":"Movies"},"width":120,"height":32,"component":"Tag.CheckableTag"},{"label":"Books · checked true","inputs":{"checked":true,"children":"Books"},"width":120,"height":32,"component":"Tag.CheckableTag"}]}],defaults={"Tag":{"children":"Tag","color":"default","bordered":true,"closable":false,"disabled":false,"icon":"","closeIcon":"CloseOutlined","variant":"filled","styles":"{}"},"Tag.CheckableTag":{"children":"Tag 1","checked":false,"disabled":false,"icon":"","styles":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Timeline",groups=[{"title":"Orientation × Mode × Variant","cols":2,"samples":[{"label":"horizontal · start · outlined","inputs":{"orientation":"horizontal","mode":"start","variant":"outlined","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":120},{"label":"horizontal · start · filled","inputs":{"orientation":"horizontal","mode":"start","variant":"filled","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":120},{"label":"horizontal · alternate · outlined","inputs":{"orientation":"horizontal","mode":"alternate","variant":"outlined","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":120},{"label":"horizontal · alternate · filled","inputs":{"orientation":"horizontal","mode":"alternate","variant":"filled","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":120},{"label":"horizontal · end · outlined","inputs":{"orientation":"horizontal","mode":"end","variant":"outlined","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":120},{"label":"horizontal · end · filled","inputs":{"orientation":"horizontal","mode":"end","variant":"filled","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":120},{"label":"vertical · start · outlined","inputs":{"orientation":"vertical","mode":"start","variant":"outlined","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":180},{"label":"vertical · start · filled","inputs":{"orientation":"vertical","mode":"start","variant":"filled","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":180},{"label":"vertical · alternate · outlined","inputs":{"orientation":"vertical","mode":"alternate","variant":"outlined","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":180},{"label":"vertical · alternate · filled","inputs":{"orientation":"vertical","mode":"alternate","variant":"filled","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":180},{"label":"vertical · end · outlined","inputs":{"orientation":"vertical","mode":"end","variant":"outlined","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":180},{"label":"vertical · end · filled","inputs":{"orientation":"vertical","mode":"end","variant":"filled","items":"[{\"content\":\"Create\",\"color\":\"green\"},{\"content\":\"Review\"},{\"content\":\"Release\",\"color\":\"red\"}]"},"width":740,"height":180}]},{"title":"Order × Mode","cols":2,"samples":[{"label":"forward · start","inputs":{"reverse":false,"mode":"start"},"width":740,"height":240},{"label":"forward · alternate","inputs":{"reverse":false,"mode":"alternate"},"width":740,"height":240},{"label":"reverse · start","inputs":{"reverse":true,"mode":"start"},"width":740,"height":240},{"label":"reverse · alternate","inputs":{"reverse":true,"mode":"alternate"},"width":740,"height":240}]}],defaults={"Timeline":{"items":"Create a services site|Solve initial network problems|Technical testing|Network problems being solved","mode":"start","orientation":"vertical","reverse":false,"variant":"outlined","titleSpan":"50%","styles":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Tooltip",groups=[{"title":"Placement × Arrow","cols":3,"samples":[{"label":"top · arrow false","inputs":{"placement":"top","arrow":false,"open":true,"title":"Prompt text"},"width":480,"height":180},{"label":"top · arrow true","inputs":{"placement":"top","arrow":true,"open":true,"title":"Prompt text"},"width":480,"height":180},{"label":"bottom · arrow false","inputs":{"placement":"bottom","arrow":false,"open":true,"title":"Prompt text"},"width":480,"height":180},{"label":"bottom · arrow true","inputs":{"placement":"bottom","arrow":true,"open":true,"title":"Prompt text"},"width":480,"height":180},{"label":"left · arrow false","inputs":{"placement":"left","arrow":false,"open":true,"title":"Prompt text"},"width":480,"height":180},{"label":"left · arrow true","inputs":{"placement":"left","arrow":true,"open":true,"title":"Prompt text"},"width":480,"height":180},{"label":"right · arrow false","inputs":{"placement":"right","arrow":false,"open":true,"title":"Prompt text"},"width":480,"height":180},{"label":"right · arrow true","inputs":{"placement":"right","arrow":true,"open":true,"title":"Prompt text"},"width":480,"height":180}]},{"title":"Color × Content","cols":3,"samples":[{"label":"#000000D9 · Prompt text","inputs":{"color":"#000000D9","title":"Prompt text","open":true},"width":480,"height":180},{"label":"#000000D9 · Additional information","inputs":{"color":"#000000D9","title":"Additional information","open":true},"width":480,"height":180},{"label":"#1677FF · Prompt text","inputs":{"color":"#1677FF","title":"Prompt text","open":true},"width":480,"height":180},{"label":"#1677FF · Additional information","inputs":{"color":"#1677FF","title":"Additional information","open":true},"width":480,"height":180},{"label":"#722ED1 · Prompt text","inputs":{"color":"#722ED1","title":"Prompt text","open":true},"width":480,"height":180},{"label":"#722ED1 · Additional information","inputs":{"color":"#722ED1","title":"Additional information","open":true},"width":480,"height":180}]}],defaults={"Tooltip":{"title":"Prompt text","color":"#000000D9","placement":"top","open":false,"defaultOpen":false,"arrow":true,"styles":"{}"},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Tour",groups=[{"title":"Step × Type","cols":2,"samples":[{"label":"step 1 · default","inputs":{"current":0,"type":"default","open":true},"width":620,"height":210},{"label":"step 1 · primary","inputs":{"current":0,"type":"primary","open":true},"width":620,"height":210},{"label":"step 2 · default","inputs":{"current":1,"type":"default","open":true},"width":620,"height":210},{"label":"step 2 · primary","inputs":{"current":1,"type":"primary","open":true},"width":620,"height":210},{"label":"step 3 · default","inputs":{"current":2,"type":"default","open":true},"width":620,"height":210},{"label":"step 3 · primary","inputs":{"current":2,"type":"primary","open":true},"width":620,"height":210}]}],defaults={"Tour":{"steps":"[{\"title\":\"Upload File\",\"description\":\"Put your files here.\"},{\"title\":\"Save\",\"description\":\"Save your changes.\"},{\"title\":\"Other Actions\",\"description\":\"Click to see other actions.\"}]","current":0,"open":false,"defaultOpen":false,"placement":"bottom","type":"default","arrow":true,"indicatorsRender":""},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}
{
const name="Tree",groups=[{"title":"Checkable × Lines × Disabled","cols":2,"samples":[{"label":"check false · lines false · disabled false","inputs":{"checkable":false,"showLine":false,"disabled":false,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]","checkedKeys":"[\"0-0-0\"]","defaultExpandAll":true},"width":720,"height":180},{"label":"check false · lines false · disabled true","inputs":{"checkable":false,"showLine":false,"disabled":true,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]","checkedKeys":"[\"0-0-0\"]","defaultExpandAll":true},"width":720,"height":180},{"label":"check false · lines true · disabled false","inputs":{"checkable":false,"showLine":true,"disabled":false,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]","checkedKeys":"[\"0-0-0\"]","defaultExpandAll":true},"width":720,"height":180},{"label":"check false · lines true · disabled true","inputs":{"checkable":false,"showLine":true,"disabled":true,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]","checkedKeys":"[\"0-0-0\"]","defaultExpandAll":true},"width":720,"height":180},{"label":"check true · lines false · disabled false","inputs":{"checkable":true,"showLine":false,"disabled":false,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]","checkedKeys":"[\"0-0-0\"]","defaultExpandAll":true},"width":720,"height":180},{"label":"check true · lines false · disabled true","inputs":{"checkable":true,"showLine":false,"disabled":true,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]","checkedKeys":"[\"0-0-0\"]","defaultExpandAll":true},"width":720,"height":180},{"label":"check true · lines true · disabled false","inputs":{"checkable":true,"showLine":true,"disabled":false,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]","checkedKeys":"[\"0-0-0\"]","defaultExpandAll":true},"width":720,"height":180},{"label":"check true · lines true · disabled true","inputs":{"checkable":true,"showLine":true,"disabled":true,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]","checkedKeys":"[\"0-0-0\"]","defaultExpandAll":true},"width":720,"height":180}]},{"title":"Block selection × Icons","cols":2,"samples":[{"label":"block false · icons false","inputs":{"blockNode":false,"showIcon":false,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]"},"width":720,"height":180},{"label":"block false · icons true","inputs":{"blockNode":false,"showIcon":true,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]"},"width":720,"height":180},{"label":"block true · icons false","inputs":{"blockNode":true,"showIcon":false,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]"},"width":720,"height":180},{"label":"block true · icons true","inputs":{"blockNode":true,"showIcon":true,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","selectedKeys":"[\"0-0\"]"},"width":720,"height":180}]},{"title":"Tree.DirectoryTree · Selection × Disabled","cols":2,"samples":[{"label":"[\"0-0\"] · disabled false","inputs":{"selectedKeys":"[\"0-0\"]","disabled":false,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","defaultExpandAll":true},"width":720,"height":180,"component":"Tree.DirectoryTree"},{"label":"[\"0-0\"] · disabled true","inputs":{"selectedKeys":"[\"0-0\"]","disabled":true,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","defaultExpandAll":true},"width":720,"height":180,"component":"Tree.DirectoryTree"},{"label":"[\"0-1\"] · disabled false","inputs":{"selectedKeys":"[\"0-1\"]","disabled":false,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","defaultExpandAll":true},"width":720,"height":180,"component":"Tree.DirectoryTree"},{"label":"[\"0-1\"] · disabled true","inputs":{"selectedKeys":"[\"0-1\"]","disabled":true,"treeData":"[{\"key\":\"0\",\"title\":\"Workspace\",\"children\":[{\"key\":\"0-0\",\"title\":\"Design\",\"children\":[{\"key\":\"0-0-0\",\"title\":\"Components\"}]},{\"key\":\"0-1\",\"title\":\"Engineering\"},{\"key\":\"0-2\",\"title\":\"Archive\",\"disabled\":true}]}]","defaultExpandAll":true},"width":720,"height":180,"component":"Tree.DirectoryTree"}]}],defaults={"Tree":{"treeData":"[{\"key\":\"0\",\"title\":\"parent 1\",\"children\":[{\"key\":\"0-0\",\"title\":\"leaf\"}]}]","expandedKeys":"[]","selectedKeys":"[]","checkedKeys":"[]","defaultExpandAll":true,"checkable":false,"disabled":false,"blockNode":false,"switcherIcon":"","showIcon":false,"showLine":false,"height":0,"styles":"{}"},"Tree.DirectoryTree":{"treeData":"[{\"key\":\"0\",\"title\":\"parent 0\",\"children\":[{\"key\":\"0-0\",\"title\":\"leaf 0-0\"}]}]","selectedKeys":"[]","expandedKeys":"[]","defaultExpandAll":true,"multiple":false,"disabled":false},"Button":{"children":"Button","type":"default","color":"default","variant":"outlined","size":"middle","shape":"default","danger":false,"ghost":false,"block":false,"loading":false,"disabled":false,"autoInsertSpace":true,"href":"","htmlType":"button","iconPlacement":"start","iconPosition":"start","compactOrientation":"horizontal","compactPlacement":"none","state":"normal","linearGradient":false,"disabledBg":""},"Avatar":{"text":"A","icon":"","src":"","alt":"","shape":"circle","size":"default","customSize":0,"color":"gray","backgroundColor":"#00000000","textColor":"#FFFFFF","gap":4,"primaryColor":"#1677FF"}};
const all=Get(n=>n.reusable?{id:n.id,name:n.name}:undefined),byName=Object.fromEntries(all.map(d=>[d.name.replace('Antd/',''),d.id]));
const master=byName[name];
const located=Get((n,c)=>n.id===master?(()=>{let a=c;while(a&&!/^Components/.test(a.node.name))a=a.parentCtx;return a?{id:a.node.id,section:a.parentCtx.node.id,layer:a.parentCtx.parentCtx.node.id}:null})():undefined)[0];
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
}