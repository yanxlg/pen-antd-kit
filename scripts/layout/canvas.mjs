import {groups,registry} from './catalog.mjs';
const name=process.argv[2],mode=process.argv[3]||'components',g=groups[name],slug=name.toLowerCase(),C=registry.components;
if(!g)throw Error('Unknown Layout section');
if(mode!=='components')throw Error('Usage must retain official browser-imported cards; replace demo controls in place.');
const text=(name,content,size=14)=>({type:'text',name,content,fontFamily:'Inter',fontSize:size,fontWeight:size>=18?'600':'normal',fill:'#000000E0',textGrowth:'fixed-width',width:'fill_container',lineHeight:1.6});
const instance=d=>({type:'script',scriptUri:'../canvas-components/'+d.component+'.js',name:d.component+(d.label?' · '+d.label:''),width:d.width,height:d.height,inputs:d.props,metadata:{type:'antd-component-instance',antd:{component:d.component,category:'Layout',props:d.props}}});
export const tile=d=>({type:'frame',name:d.label||d.component,width:792,height:d.height+56,layout:'vertical',gap:12,padding:[8,16],children:[text('State',d.label||d.component,13),instance(d)]});
export const card=(title,demos,matrix)=>{
 const children=[text('Example title',title,20)];
 if(matrix)for(let k=0;k<demos.length;k+=2){const row=demos.slice(k,k+2);children.push({type:'frame',name:title+' · row '+(k/2+1),width:1616,height:Math.max(...row.map(d=>d.height))+56,layout:'horizontal',gap:32,children:row.map(tile)});}
 else for(const d of demos){if(d.label)children.push(text('State',d.label,13));children.push(instance(d));}
 return{type:'frame',name:(matrix?'Matrix · ':'Example · ')+title,width:matrix?1664:824,layout:'vertical',gap:matrix?16:20,padding:24,fill:'#FFFFFF',cornerRadius:8,stroke:'#F0F0F0',strokeWidth:1,children};
};
let code=`const board='artboard-${slug}-${mode}';Update(board,{placeholder:true,width:1728});`;
if(mode==='components'){
 code+=`for(const id of Get(board,n=>n.type==='script'&&n.reusable&&(n.name==='Antd/${name}'||n.name.startsWith('Antd/${name}.')||('${name}'==='Grid'&&['Antd/Row','Antd/Col'].includes(n.name)))?n.id:undefined))Move(id,board);for(const n of Get(board,{depth:1}).children||[]){if(n.type!=='script')Delete(n.id);}Insert(board,${JSON.stringify({...text('Components','Components',80),x:32,y:32,width:1600,fontWeight:'700'})});`;
 const masters=Object.entries(C).filter(([key])=>['Divider','Flex','Grid','Layout','Masonry','Space','Splitter'].includes(name)&&((name==='Grid'&&['Row','Col'].includes(key))||(key===name||key.startsWith(name+'.'))));
 const sizes={'Layout.Header':[740,64],'Layout.Content':[740,120],'Layout.Footer':[740,70],'Layout.Sider':[200,240],'Splitter.Panel':[740,160],'Space.Compact':[740,32],'Space.Addon':[120,32],Col:[370,40]};
 code+=`const masters=Insert(board,{type:'frame',name:'Reusable components',x:32,y:160,width:1664,layout:'vertical',gap:24,padding:24,stroke:'#F0F0F0',strokeWidth:1,cornerRadius:8});Insert(masters,${JSON.stringify(text('Reusable components','Reusable components',20))});`;
 for(const[key,id]of masters){const [w,h]=sizes[key]||g.masterSize;code+=`Insert(masters,${JSON.stringify(text(key+' label',key,14))});Move('${id}',masters);Update('${id}',{width:${w},height:${h}${key===(g.component||name)?',inputs:'+JSON.stringify(g.defaults):''}});`;}
 code+=`let y=160+Get(masters,(n,c)=>c.depth===0?c.bounds.height:undefined)[0]+24;`;
 for(const[title,demos]of g.matrix)code+=`{const id=Insert(board,${JSON.stringify(card(title,demos,true))});Update(id,{x:32,y});y+=Get(id,(n,c)=>c.depth===0?c.bounds.height:undefined)[0]+24;}`;

 code+=`Update(board,{height:y+8,placeholder:false});Print({section:'${name}',height:y+8});`;
}
console.log(code);
