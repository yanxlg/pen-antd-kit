/**
 * @schema 2.18
 * @input itemRender: string = "[]"
 * @input group: string = "{}"
 * @input items: string = "List item 1|List item 2|List item 3|List item 4|List item 5"
 * @input rowKey: string = "key"
 * @input height: number = 320
 * @input virtual: boolean = true
 * @input sticky: boolean = false
 * @input styles: string = "{}"
 */
const i=pencil.input||{};let rendered;try{rendered=JSON.parse(i.itemRender)}catch{};
if(Array.isArray(rendered)&&rendered.length){
  const cleanItem=(n,idx)=>{
    if(n.ref==='LSKNJ'||(n.inputs&&(n.inputs.title||n.inputs.children))){
      const title=n.inputs?.title||('Item '+(idx+1)),content=n.inputs?.children||'Item content';
      return {
        type:'frame',name:'Card · '+title,width:'fill_container',height:Number(n.height)||88,
        fill:'#FFFFFF',stroke:'#F0F0F0',strokeWidth:1,strokeAlignment:'inner',cornerRadius:8,
        layout:'vertical',padding:[12,16],gap:6,
        children:[
          {type:'text',name:'Card title',content:String(title),fontFamily:'Inter',fontSize:14,fontWeight:'600',fill:'#000000E0',lineHeight:1.5},
          {type:'text',name:'Card content',content:String(content),fontFamily:'Inter',fontSize:13,fill:'#000000A6',lineHeight:1.5}
        ]
      };
    }
    const {inputs,...rest}=n;
    return {...rest,width:'fill_container'};
  };
  return [{type:'frame',x:0,y:0,width:pencil.width,height:pencil.height,layout:'vertical',gap:8,clip:true,children:rendered.map((n,idx)=>cleanItem(n,idx))}];
}
const W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
let items;try{items=JSON.parse(i.items)}catch{items=String(i.items||'List item 1|List item 2|List item 3').split('|')}if(!Array.isArray(items))items=[];let styles;try{styles=JSON.parse(i.styles||'{}')}catch{styles={}}const rowHeight=Math.max(32,Number(styles.item?.height)||48);items.forEach((item,n)=>{if(n*rowHeight+rowHeight>H)return;nodes.push({type:'ref',name:'itemRender · Typography.Text',ref:'LG38Z',x:0,y:n*rowHeight+12,width:W,height:22,inputs:{content:typeof item==='string'?item:item.label||item.title||String(item.key),component:'Text',editable:false,copyable:false}});});
return nodes;
