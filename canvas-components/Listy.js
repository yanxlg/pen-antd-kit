/**
 * @schema 2.18
 * @input items: string = "List item 1|List item 2|List item 3|List item 4|List item 5"
 * @input rowKey: string = "key"
 * @input height: number = 320
 * @input virtual: boolean = true
 * @input sticky: boolean = false
 * @input styles: string = "{}"
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
let items;try{items=JSON.parse(i.items)}catch{items=String(i.items||'List item 1|List item 2|List item 3').split('|')}if(!Array.isArray(items))items=[];let styles;try{styles=JSON.parse(i.styles||'{}')}catch{styles={}}const rowHeight=Math.max(32,Number(styles.item?.height)||48);items.forEach((item,n)=>{if(n*rowHeight+rowHeight>H)return;nodes.push({type:'ref',name:'itemRender · List.Item',ref:'p2ooj3',x:0,y:n*rowHeight,width:W,height:rowHeight,inputs:{children:typeof item==='string'?item:item.label||item.title||String(item.key)}});});
return nodes;
