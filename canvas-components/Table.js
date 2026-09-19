/**
 * @schema 2.18
 * @input columns: string = "Name|Age|Address|Action"
 * @input rows: string = "John Brown,32,New York,Invite|Jim Green,42,London,Delete|Joe Black,32,Sydney,View"
 * @input bordered: boolean = false
 * @input size: enum("small", "middle", "large") = "large"
 * @input showHeader: boolean = true
 * @input loading: boolean = false
 * @input pagination: boolean = true
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});

const cols=String(i.columns||'Name|Age|Address|Action').split('|'),rows=String(i.rows??'').split('|').filter(Boolean).map(r=>r.split(',')),rh=i.size==='small'?39:i.size==='middle'?47:55,cw=W/cols.length,head=i.showHeader!==false?rh:0;
const cell=(label,n,y,header)=>{nodes.push({...box(n*cw,y,cw,rh,header?'#FAFAFA':'#FFFFFF',0,'#F0F0F0'),strokeWidth:i.bordered?1:{bottom:1}});nodes.push(text(label,n*cw+16,y,cw-32,rh,14,header?'#000000E0':n===cols.length-1?'#1677FF':'#000000E0',header?'600':'400'));};
if(head)cols.forEach((c,n)=>cell(c,n,0,true));rows.forEach((r,j)=>cols.forEach((_,n)=>cell(r[n]||'—',n,head+j*rh,false)));
if(i.loading){nodes.push(box(0,0,W,head+Math.max(1,rows.length)*rh,'#FFFFFFB3'));nodes.push(text('•••',W/2-24,(head+rows.length*rh)/2-16,48,32,24,'#1677FF','600','center'));}

if(i.pagination)nodes.push({type:'ref',name:'pagination · Pagination',ref:'Y9L6l',x:Math.max(0,W-260),y:head+rows.length*rh+16,width:260,height:32,inputs:{total:rows.length,pageSize:10,current:1,showSizeChanger:false,showQuickJumper:false}});
return nodes;
