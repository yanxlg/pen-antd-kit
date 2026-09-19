import fs from 'node:fs';
const root=new URL('../../',import.meta.url),read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const migration=read('registry/navigation-instance-migration.json'),bounds=read('registry/navigation-import-bounds.json');
const names=['Anchor','Breadcrumb','Dropdown','Menu','Pagination','Steps','Tabs'];
const text=(name,content,size=14)=>({type:'text',name,content,fontFamily:'Inter',fontSize:size,fontWeight:size>=18?'600':'normal',fill:'#000000e0',textGrowth:'fixed-width',width:'fill_container',lineHeight:1.5714});
const defaults=Object.fromEntries(names.map(name=>[name,migration.instances.find(x=>x.component===name).props]));
defaults.Dropdown={label:'Hover me',menu:JSON.stringify({items:[{key:'1',label:'1st menu item'},{key:'2',label:'2nd menu item'},{key:'3',label:'3rd menu item'}]})};
const sizes={Anchor:[400,160],Breadcrumb:[740,22],Dropdown:[200,32],Menu:[1200,46],Pagination:[740,32],Steps:[1400,86],Tabs:[740,84]};
let code='const migrated=[];';
for(const j of migration.instances){
 const b=bounds.find(n=>n.id===j.nodeId).bounds;
 const tree=read('artifacts/official-navigation/'+j.component+'.canvas.json');
 function find(n){return n.id===j.nodeId?n:(n.children||[]).map(find).find(Boolean)}
 const n=find(tree),width=typeof n.width==='string'&&n.width.startsWith('fill_container')?'fill_container':Math.min(b.width,j.component==='Breadcrumb'||j.component==='Dropdown'?776:1614);
 const props={...j.props};if(j.component==='Dropdown'){props.triggerWidth=b.width;props.triggerHeight=b.height;props.menu=defaults.Dropdown.menu;}
 const data={type:'script',name:j.component+' · '+j.cardTitle,scriptUri:'../canvas-components/'+j.component+'.js',x:n.x,y:n.y,layoutPosition:n.layoutPosition,width,height:Math.max(1,b.height),inputs:props,metadata:{type:'antd-component-instance',antd:{component:j.component,category:'Navigation',source:'https://ant.design/components/'+j.component.toLowerCase()+'/',example:j.officialId}}};
 code+=`migrated.push({old:${JSON.stringify(j.nodeId)},id:Replace(${JSON.stringify(j.nodeId)},${JSON.stringify(data)}),component:${JSON.stringify(j.component)}});\n`;
}
code+='Print({migrated});';
fs.writeFileSync(new URL('scripts/navigation/migrate.pencil.js',root),code);
code='const canonical={};';
for(const name of names){
 const slug=name.toLowerCase(),board='artboard-'+slug+'-components',def=defaults[name],sz=sizes[name];
 code+=`{const board=${JSON.stringify(board)};for(const n of Get(board,{depth:1}).children||[])Delete(n.id);Update(board,{width:1728,name:'Components',height:1000,layout:'none'});Insert(board,${JSON.stringify({...text('Components','Components',80),x:32,y:32,width:1600,fontWeight:'700'})});const content=Insert(board,{type:'frame',name:'Component definition and configured instances',x:32,y:160,width:1664,layout:'vertical',gap:24});const master=Insert(content,{type:'frame',name:'Canonical ${name}',width:1664,layout:'vertical',gap:16,padding:24,stroke:'#f0f0f0',strokeWidth:1,cornerRadius:8});Insert(master,${JSON.stringify(text(name,name,20))});canonical['${name}']=Insert(master,${JSON.stringify({type:'script',name:'Antd/'+name,reusable:true,scriptUri:'../canvas-components/'+name+'.js',width:sz[0],height:sz[1],inputs:def,metadata:{type:'antd-component',antd:{component:name,category:'Navigation',version:'6.6.4'}}})});`;
 const variants={
 Anchor:[['Vertical',{direction:'vertical',activeHref:'#anchor-demo-basic'}],['Horizontal',{direction:'horizontal',activeHref:'#anchor-demo-basic'}]],
 Breadcrumb:[['Default',{}],['Custom separator',{separator:'>'}],['Icons',{items:JSON.stringify([{title:'Home',icon:'HomeOutlined'},{title:'Application',icon:'UserOutlined'},{title:'Details'}])}]],
 Dropdown:[['Closed',{}],['Open',{open:true}],['Arrow',{open:true,arrow:true}],['Disabled',{disabled:true}]],
 Menu:[['Horizontal',{}],['Inline',{mode:'inline'}],['Vertical',{mode:'vertical'}],['Dark',{mode:'inline',theme:'dark'}],['Collapsed',{mode:'inline',inlineCollapsed:true}]],
 Pagination:[['Default',{}],['More pages',{total:500,current:6,showSizeChanger:true}],['Small',{size:'small',total:50}],['Large',{size:'large'}],['Disabled',{disabled:true,total:500,showSizeChanger:true}],['Simple',{simple:true,current:2}],['Quick jumper',{total:500,showSizeChanger:true,showQuickJumper:true}],['Total',{showTotal:'range',total:85,pageSize:20,showSizeChanger:true}]],
 Steps:[['Default',{}],['Small',{size:'small'}],['Vertical',{orientation:'vertical'}],['Error',{items:JSON.stringify([{title:'Finished',status:'finish'},{title:'In Progress',status:'error'},{title:'Waiting',status:'wait'}])}],['Dot',{type:'dot'}],['Outlined',{variant:'outlined'}]],
 Tabs:[['Line',{}],['Card',{type:'card'}],['Editable card',{type:'editable-card'}],['Centered',{centered:true}],['Small',{size:'small'}],['Large',{size:'large'}],['Bottom',{tabPlacement:'bottom'}],['Start',{tabPlacement:'start'}],['End',{tabPlacement:'end'}]],
 }[name];
 for(const [label,p]of variants){const props={...def,...p};let w=name==='Steps'?1400:740,h=sz[1];if(name==='Menu'&&props.mode!=='horizontal'){w=props.inlineCollapsed?80:256;h=220;}if(name==='Pagination')h=props.size==='small'?24:props.size==='large'?40:32;if(name==='Steps'&&props.orientation==='vertical')h=240;if(name==='Steps'&&props.type==='dot')h=130;if(name==='Dropdown'&&props.open)h=152;if(name==='Tabs'){const vertical=props.tabPlacement==='start'||props.tabPlacement==='end',card=props.type==='card'||props.type==='editable-card';h=vertical?146:card?(props.size==='small'?70:props.size==='large'?86:78):(props.size==='small'?76:props.size==='large'?94:84);}
 code+=`{const card=Insert(content,{type:'frame',name:'${name} · ${label}',width:1664,layout:'vertical',padding:24,gap:16,stroke:'#f0f0f0',strokeWidth:1,cornerRadius:8});Insert(card,${JSON.stringify(text('State',label,18))});Insert(card,${JSON.stringify({type:'script',name:name+' · '+label,scriptUri:'../canvas-components/'+name+'.js',width:w,height:h,inputs:props})});}`;
 }
 code+=`const h=Get(content,(n,c)=>c.depth===0?c.bounds.height:undefined)[0];Update(board,{height:Math.ceil(h+192)});}`;
}
code+='Print({canonical});';fs.writeFileSync(new URL('scripts/navigation/components.pencil.js',root),code);
fs.writeFileSync(new URL('registry/navigation-defaults.json',root),JSON.stringify(defaults,null,2));
console.log('Prepared instance migration and Components installation.');
