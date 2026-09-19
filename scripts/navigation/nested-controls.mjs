import fs from 'node:fs';
// Navigation demos use the same Radio/Switch definitions as the rest of the library.
// Add the missing visual props without creating duplicate component definitions.
for(const name of ['Radio','Switch']){
 const path=new URL('../../canvas-components/'+name+'.js',import.meta.url);let source=fs.readFileSync(path,'utf8');
 if(source.includes('// Navigation nested controls'))continue;
 const extra=name==='Radio'?' * @input optionType: enum("default", "button") = "default"\n * @input buttonStyle: enum("outline", "solid") = "outline"\n':' * @input checkedChildren: string = ""\n * @input unCheckedChildren: string = ""\n';
 source=source.replace(' */',extra+' */');
 const at=source.indexOf(name==='Radio'?'  const s = 16;':'  const sw =');
 const head=source.slice(0,at),tail=name==='Radio'?`// Navigation nested controls
if(i.optionType==='button'){
 const selected=!!i.checked,solid=i.buttonStyle==='solid',color=i.disabled?'#00000040':selected?(solid?'#fff':primary):'#000000e0';
 nodes.push({type:'rectangle',x:0,y:0,width:pencil.width,height:pencil.height,fill:selected&&solid?primary:'#fff',stroke:selected?primary:'#d9d9d9',strokeWidth:1});
 nodes.push({type:'text',name:'Radio label',content:i.label||'',x:0,y:0,width:pencil.width,height:pencil.height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,lineHeight:1.5714,textAlign:'center',textAlignVertical:'middle',fill:color});
 return nodes;
}
`+source.slice(at):`// Navigation nested controls
const sh=i.size==='small'?16:22,dot=sh-4,label=i.checked?i.checkedChildren:i.unCheckedChildren,sw=Math.max(i.size==='small'?28:44,label?pencil.width:0),y=(pencil.height-sh)/2;
nodes.push({type:'rectangle',name:'Switch track',x:0,y,width:sw,height:sh,cornerRadius:sh/2,fill:i.checked?primary:'#00000040',opacity:i.disabled?.65:1});
nodes.push({type:'ellipse',name:'Switch handle',x:i.checked?sw-dot-2:2,y:y+2,width:dot,height:dot,fill:'#fff'});
if(label)nodes.push({type:'text',name:'Switch label',content:label,x:i.checked?7:dot+7,y,width:sw-dot-14,height:sh,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:12,lineHeight:1,textAlign:'center',textAlignVertical:'middle',fill:'#fff'});
if(i.label)nodes.push(text(i.label,sw+8,(pencil.height-18)/2,Math.max(0,pencil.width-sw-8),disabled));
return nodes;
`;
 fs.writeFileSync(path,head+tail);
}

{const p=new URL('../../canvas-components/Checkbox.js',import.meta.url);let s=fs.readFileSync(p,'utf8');s=s.replace('Math.max(80, pencil.width)','Math.max(16, pencil.width)').replaceAll('(h-s)/2','(pencil.height-s)/2').replaceAll('(h-2)/2','(pencil.height-2)/2').replaceAll('(h-18)/2','(pencil.height-18)/2');fs.writeFileSync(p,s);}
