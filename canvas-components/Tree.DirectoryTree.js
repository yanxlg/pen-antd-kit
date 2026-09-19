/**
 * @schema 2.18
 * @input items: string = "src|components|index.ts"
 * @input selectedKey: string = "index.ts"
 * @input defaultExpandAll: boolean = true
 * @input multiple: boolean = false
 * @input disabled: boolean = false
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(180,pencil.width),lines=String(i.items||'src|components|index.ts').split('|'),primary=i.primaryColor||'#1677FF';
const nodes=[];
lines.forEach((raw,index)=>{const label=raw.replace(/^\s*[├└│─]+\s*/,'')||raw,level=(raw.match(/^\s*/)??[''])[0].length+(raw.includes('──')?1:0),y=index*28,selected=label===i.selectedKey;if(selected)nodes.push({type:'rectangle',name:'Selected row',x:0,y,width:W,height:28,cornerRadius:4,fill:'#E6F4FF'});nodes.push({type:'text',name:'Expand icon',content:index<Math.max(1,lines.length-1)?'⌄':'',x:8+level*16,y:4,width:14,height:20,fontFamily:'Inter',fontSize:12,fill:'#00000073'});nodes.push({type:'text',name:'Folder icon',content:index<lines.length-1?'▣':'▤',x:24+level*16,y:4,width:16,height:20,fontFamily:'Inter',fontSize:13,fill:selected?primary:'#FAAD14'});nodes.push({type:'text',name:'Node title',content:label,x:46+level*16,y:4,width:W-54-level*16,height:20,fontFamily:'Inter',fontSize:14,fill:i.disabled?'#00000040':selected?primary:'#000000E0'});});
return nodes;
