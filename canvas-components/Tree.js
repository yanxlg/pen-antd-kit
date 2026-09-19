/**
 * @schema 2.18
 * @input items: string = "0-0|├── 0-0-0|│   ├── 0-0-0-0|│   └── 0-0-0-1|└── 0-0-1"
 * @input showLine: boolean = false
 * @input autoExpandParent: boolean = false
 * @input blockNode: boolean = false
 * @input checkable: boolean = false
 * @input checkStrictly: boolean = false
 * @input defaultExpandAll: boolean = true
 * @input defaultExpandParent: boolean = false
 * @input disabled: boolean = false
 * @input focusable: boolean = false
 * @input height: number = 0
 * @input itemHeight: number = 24
 * @input itemScrollOffset: number = 0
 * @input multiple: boolean = false
 * @input scrollWidth: number = 0
 * @input selectable: boolean = true
 * @input showIcon: boolean = false
 * @input virtual: boolean = false
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(120,pencil.width),nodes=[],rowH=i.itemHeight>0?Math.max(24,i.itemHeight):24,primary=i.primaryColor||'#1677FF',muted=i.disabled?'#00000040':'#000000E0';
const raw=String(i.items||'0-0|├── 0-0-0|│   ├── 0-0-0-0|│   └── 0-0-0-1|└── 0-0-1').split('|');
const rows=raw.map(s=>{const lead=(s.match(/^(?:(?:│   |    ))*/)||[''])[0].length/4;const branch=/[├└]──/.test(s);return {level:lead+(branch?1:0),label:s.replace(/^[│\s├└─]+/,'')};});
const text=(content,x,y,width,color=muted,size=14,align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height:rowH,textGrowth:'fixed-width-height',textAlign:align,fontFamily:'Inter',fontSize:size,fontWeight:'400',lineHeight:rowH/size,fill:color});
for(let n=0;n<rows.length;n++){
  const r=rows[n],y=n*rowH,base=8+r.level*24,expandable=n+1<rows.length&&rows[n+1].level>r.level;
  if(i.blockNode&&n===0)nodes.push({type:'rectangle',name:'Selected row',x:0,y,width:W,height:rowH,cornerRadius:4,fill:'#E6F4FF'});
  if(i.showLine&&r.level>0){for(let l=1;l<=r.level;l++)nodes.push({type:'rectangle',name:'Tree guide',x:8+l*24-13,y:y-(n?rowH:0),width:1,height:rowH+(n?rowH:0),fill:'#D9D9D9'});nodes.push({type:'rectangle',name:'Tree branch',x:base-13,y:y+rowH/2,width:10,height:1,fill:'#D9D9D9'});}
  if(expandable)nodes.push(text('⌄',base-18,y,16,'#00000073',14,'center'));
  let x=base;
  if(i.checkable){nodes.push({type:'rectangle',name:'Checkbox',x,y:y+4,width:16,height:16,cornerRadius:2,fill:n===2?primary:'#FFFFFF',stroke:n===2?primary:'#D9D9D9',strokeWidth:1,strokeAlignment:'inner'});if(n===2)nodes.push(text('✓',x,y,16,'#FFFFFF',11,'center'));x+=24;}
  if(i.showIcon){nodes.push({type:'rectangle',name:expandable?'Folder icon':'File icon',x,y:y+6,width:15,height:12,cornerRadius:2,fill:expandable?'#E6F4FF':'#FAFAFA',stroke:'#91CAFF',strokeWidth:1,strokeAlignment:'inner'});x+=22;}
  nodes.push(text(r.label,x,y,Math.max(40,W-x-8),i.blockNode&&n===0?primary:muted,14));
}
return nodes;
