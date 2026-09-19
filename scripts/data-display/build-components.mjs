import {writeFileSync} from 'node:fs';
import {plan} from './components-plan.mjs';
const source=`const plan=${JSON.stringify(plan)};
const definitions=Get('layer-data-display',(n)=>n.reusable?{id:n.id,name:n.name,width:n.width,height:n.height}:undefined);
const byName=Object.fromEntries(definitions.map(d=>[d.name.replace('Antd/',''),d]));
const used=new Set(),report=[];
for(const [name,variants] of Object.entries(plan)){
 const board=name==='Listy'?'N8Aega':'artboard-'+name.toLowerCase()+'-components';
 const before=Get(board,{depth:1});
 Update(board,{placeholder:true,name:'Components',layout:'none'});
 const oldChildren=before.children.map(n=>n.id);
 const heading=before.children.find(n=>n.type==='text');
 if(heading)Update(heading.id,{x:32,y:32,name:'Components',content:'Components',fontSize:80,fontWeight:'700',textGrowth:'auto'});
 let y=152;
 for(let index=0;index<variants.length;index+=2){
  const pair=variants.slice(index,index+2),rowH=Math.max(...pair.map(v=>Math.max(160,v.height+104)));
  pair.forEach((v,col)=>{
   const component=v.component||name,definition=byName[component];
   if(!definition)throw new Error('Missing definition '+component);
   const card=Insert(board,{type:'frame',name:v.title,x:32+col*844,y,width:820,height:rowH,layout:'none',fill:'#FFFFFF',stroke:'#F0F0F0',strokeWidth:1,cornerRadius:8});
   Insert(card,{type:'text',name:'State title',content:v.title,x:24,y:20,fontFamily:'Inter',fontSize:20,fontWeight:'600',fill:'#1F1F1F',textGrowth:'auto'});
   let node;
   if(!used.has(component)){Move(definition.id,card);node=definition.id;used.add(component);Update(node,{x:24,y:72,width:v.width,height:v.height});}
   else node=Insert(card,{type:'ref',name:component+' · '+v.title,ref:definition.id,x:24,y:72,width:v.width,height:v.height});
   if(name==='Badge'&&component==='Badge'){
    Update(node+'/n6rSDv',{inputs:{count:5,dot:false,showZero:false,overflowCount:99,color:'#FF4D4F',...v.inputs},x:v.inputs.dot?37:v.inputs.count>=100?24:30,y:v.inputs.dot?-3:-10,width:40,height:20});
    Update(node+'/qQ3I2',{enabled:false});
   }else if(['Popover','Tooltip','Tour'].includes(name)){
    const child={Popover:'esabY',Tooltip:'kPvKP',Tour:'p0HlBD'}[name];
    Update(node+'/'+child,{inputs:{...(Get(definition.id+'/'+child).inputs||{}),...v.inputs}});
   }else if(component!=='Avatar.Group')Update(node,{inputs:{...(Get(definition.id).inputs||{}),...v.inputs}});
  });
  y+=rowH+24;
 }
 Update(board,{height:y+8});
 for(const id of oldChildren){if(id===heading?.id||definitions.some(d=>d.id===id))continue;const remaining=Get(id,(n)=>n.reusable?n.id:undefined);if(!remaining.length)Delete(id);}
 report.push({component:name,states:variants.length,height:y+8});
}
Print(report);`;
writeFileSync('scripts/data-display/update-components.pencil.js',source);
