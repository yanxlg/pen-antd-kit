/**
 * @schema 2.18
 * @input treeData: string = "[{\"key\":\"0\",\"title\":\"parent 1\",\"children\":[{\"key\":\"0-0\",\"title\":\"leaf\"}]}]"
 * @input expandedKeys: string = "[]"
 * @input selectedKeys: string = "[]"
 * @input checkedKeys: string = "[]"
 * @input defaultExpandAll: boolean = true
 * @input checkable: boolean = false
 * @input disabled: boolean = false
 * @input blockNode: boolean = false
 * @input switcherIcon: string = ""
 * @input showIcon: boolean = false
 * @input showLine: boolean = false
 * @input height: number = 0
 * @input styles: string = "{}"
 */
const i=pencil.input||{},parse=(s,d)=>{try{return JSON.parse(s)}catch{return d}},data=parse(i.treeData,[]),expanded=parse(i.expandedKeys,[]),selected=parse(i.selectedKeys,[]),checked=parse(i.checkedKeys,[]),styles=parse(i.styles,{}),W=Math.max(1,pencil.width),rows=[],nodes=[];
const walk=(items,level)=>items.forEach(o=>{rows.push({...o,level});if(o.children&&(i.defaultExpandAll||expanded.includes(o.key)))walk(o.children,level+1)});walk(data,0);
const bg=styles.root?.background||'#FFFFFF',padding=styles.root?.padding||0;nodes.push({type:'rectangle',x:0,y:0,width:W,height:pencil.height,fill:bg,cornerRadius:styles.root?.borderRadius||0});
for(let n=0;n<rows.length;n++){const o=rows[n],h=28,y=padding+n*h,disabled=i.disabled||o.disabled,color=disabled?'#00000040':styles.title?.color||'#000000E0',isSelected=selected.includes(o.key),base=padding+o.level*24;let x=base+24;const icon=(name,x,color)=>{const custom=parse(name,null);nodes.push(custom?.type?{...custom,x,y:y+5,width:14,height:14}:{type:'ref',ref:'antd-icon-live-origin',x,y:y+5,width:14,height:14,inputs:{name,fontSize:14,color}});};
if(i.height>0&&y>=i.height)break;if(i.showLine&&o.level)nodes.push({type:'rectangle',x:base-12,y,width:1,height:h,fill:'#D9D9D9'});if(o.children?.length||o.isLeaf===false)icon(i.switcherIcon||(o.children?.length&&(i.defaultExpandAll||expanded.includes(o.key))?'CaretDownOutlined':'CaretRightOutlined'),base+5,color);else if(i.showLine)icon('FileOutlined',base+5,color);
if(i.checkable&&o.checkable!==false){nodes.push({type:'ref',ref:'cpj9Y',x,y:y+4,width:16,height:16,inputs:{children:'',checked:checked.includes(o.key),indeterminate:!!o.indeterminate,disabled:!!(disabled||o.disableCheckbox)}});x+=24;}
if(isSelected)nodes.push({type:'rectangle',x:i.blockNode?0:x,y,width:i.blockNode?W:Math.min(W-x,String(o.title).length*8+8),height:24,cornerRadius:4,fill:styles.node?.background||'#E6F4FF'});
if(i.showIcon){const name=o.icon||((o.children?.length||o.isLeaf===false)?'FolderOpenOutlined':'FileOutlined');icon(name,x,disabled?'#00000040':isSelected&&styles.node?.color?styles.node.color:color);x+=22;}
const title=parse(o.title,null);nodes.push(title?.type?{...title,x:x+4,y,width:W-x-4,height:24}:{type:'text',content:o.title??'',x:x+4,y,width:Math.max(1,W-x-4),height:24,textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:14,lineHeight:1.71,fill:isSelected&&styles.node?.color?styles.node.color:color});}
return nodes;
