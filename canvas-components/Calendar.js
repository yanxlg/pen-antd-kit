/**
 * @schema 2.18
 * @input fullscreen: boolean = true
 * @input mode: enum("month", "year") = "month"
 * @input showWeek: boolean = false
 * @input value: string = "2026-09-14"
 * @input cellRender: string = "{}"
 * @input fullCellRender: string = "{}"
 * @input headerRender: string = ""
 * @input styles: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),parse=(s,d)=>{try{return JSON.parse(s)}catch{return d}},styles=parse(i.styles,{}),root=styles.root||{},cells=parse(i.cellRender,{}),fullCells=parse(i.fullCellRender,{}),customHeader=parse(i.headerRender,null),nodes=[],date=new Date(i.value),year=date.getUTCFullYear(),month=date.getUTCMonth(),selected=date.getUTCDate(),full=i.fullscreen,pad=Number(root.padding)||0,headerH=customHeader?.height||(full?56:48);
const box=(x,y,width,height,fill,r=0)=>({type:'rectangle',x,y,width,height,fill,cornerRadius:r}),text=(s,x,y,w,h,color='#000000E0',align='center',size=14)=>({type:'text',content:String(s),x,y,width:Math.max(1,w),height:h,textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:size,lineHeight:1.57,textAlign:align,fill:color});
nodes.push({...box(0,0,W,H,root.background||'#FFFFFF',root.borderRadius||0),...(root.borderColor?{stroke:root.borderColor,strokeWidth:1}:{})});
if(customHeader)nodes.push({...customHeader,x:pad,y:pad,width:W-pad*2});else {
  const isYear=i.mode==='year',ctrlH=full?32:24,ctrlY=pad+(headerH-ctrlH)/2,padRight=full?16:8,radioW=full?112:102,selectSize=full?'middle':'small';
  if(isYear){
    const hw=80+8+radioW,x=Math.max(pad,W-pad-padRight-hw);
    nodes.push({type:'ref',ref:'VoQE7',x,y:ctrlY,width:80,height:ctrlH,inputs:{value:String(year),allowClear:false,showArrow:true,bordered:true,size:selectSize}});
    nodes.push({type:'ref',ref:'H0DThz',x:x+88,y:ctrlY,width:radioW,height:ctrlH,inputs:{optionType:'button',options:'["Month","Year"]',value:'Year',size:selectSize}});
  }else{
    const hw=80+8+80+8+radioW,x=Math.max(pad,W-pad-padRight-hw);
    nodes.push({type:'ref',ref:'VoQE7',x,y:ctrlY,width:80,height:ctrlH,inputs:{value:String(year),allowClear:false,showArrow:true,bordered:true,size:selectSize}});
    nodes.push({type:'ref',ref:'VoQE7',x:x+88,y:ctrlY,width:80,height:ctrlH,inputs:{value:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month],allowClear:false,showArrow:true,bordered:true,size:selectSize}});
    nodes.push({type:'ref',ref:'H0DThz',x:x+176,y:ctrlY,width:radioW,height:ctrlH,inputs:{optionType:'button',options:'["Month","Year"]',value:'Month',size:selectSize}});
  }
}
nodes.push(box(pad,pad+headerH,W-pad*2,1,'#F0F0F0'));
const top=pad+headerH+1;
if(i.mode==='year'){
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],bodyH=H-top-pad,h=bodyH/4,w=(W-pad*2)/3;
  months.forEach((m,n)=>{
    const col=n%3,row=Math.floor(n/3),x=pad+col*w,y=top+row*h,isCurrent=n===month,key=`${year}-${String(n+1).padStart(2,'0')}`,custom=fullCells[key];
    if(custom){nodes.push({...custom,x,y,width:w,height:h});return;}
    if(full){
      nodes.push(box(x+4,y+4,w-8,h-8,isCurrent?'#E6F4FF':'#FFFFFF',4));
      nodes.push(box(x+4,y+4,w-8,2,isCurrent?'#1677FF':'#F0F0F0'));
      nodes.push(text(m,x+8,y+9,w-20,22,isCurrent?'#1677FF':'#000000E0','right'));
    }else{
      const itemW=Math.min(w-16,60),itemH=24,itemX=x+(w-itemW)/2,itemY=y+(h-itemH)/2;
      if(isCurrent)nodes.push(box(itemX,itemY,itemW,itemH,'#1677FF',4));
      nodes.push(text(m,x,itemY+1,w,22,isCurrent?'#FFFFFF':'#000000E0','center'));
    }
    const child=cells[key];
    if(child){
      const prepared=JSON.parse(JSON.stringify(child));
      for(const badge of prepared.children||[]){if(badge.ref==='bYmfX'){badge.width=w-16;Object.assign(badge.descendants?.n6rSDv||{},{width:w-16,height:22,x:0,y:0});}}
      nodes.push({...prepared,x:x+8,y:y+(full?34:8),width:w-16,height:Math.max(1,h-38)});
    }
  });
  return nodes;
}
const cols=i.showWeek?8:7,cw=(W-pad*2)/cols,rowH=(H-top-pad-30)/6;
const week=i.showWeek?['Week','Su','Mo','Tu','We','Th','Fr','Sa']:['Su','Mo','Tu','We','Th','Fr','Sa'];
week.forEach((d,n)=>nodes.push(text(d,pad+n*cw,top+4,cw,22,'#000000A6','center',14)));
const offset=new Date(Date.UTC(year,month,1)).getUTCDay();
for(let r=0;r<6;r++)for(let col=0;col<cols;col++){
  const x=pad+col*cw,y=top+30+r*rowH;
  if(i.showWeek&&col===0){const d=new Date(Date.UTC(year,month,1-offset+r*7));nodes.push(text(Math.ceil((d-new Date(Date.UTC(year,0,1)))/604800000)+1,x,y+8,cw,22,'#00000073'));continue;}
  const n=r*7+col-(i.showWeek?1:0),d=new Date(Date.UTC(year,month,1-offset+n)),key=d.toISOString().slice(0,10),active=d.getUTCMonth()===month&&d.getUTCDate()===selected,current=d.getUTCMonth()===month,custom=fullCells[key];
  if(custom){nodes.push({...custom,x,y,width:cw,height:rowH});continue;}
  if(full){
    nodes.push(box(x+4,y+4,cw-8,rowH-8,active?'#E6F4FF':'#FFFFFF'));
    nodes.push(box(x+4,y+4,cw-8,2,active?'#1677FF':'#F0F0F0'));
    nodes.push(text(String(d.getUTCDate()).padStart(2,'0'),x+8,y+9,cw-20,22,active?'#1677FF':current?'#000000E0':'#00000040','right'));
  }else{
    if(active)nodes.push(box(x+cw/2-12,y+8,24,24,'#1677FF',4));
    nodes.push(text(String(d.getUTCDate()).padStart(2,'0'),x,y+9,cw,22,active?'#FFFFFF':current?'#000000E0':'#00000040'));
  }
  const child=cells[key];
  if(child){
    const prepared=JSON.parse(JSON.stringify(child));
    for(const badge of prepared.children||[]){if(badge.ref==='bYmfX'){badge.width=cw-16;Object.assign(badge.descendants.n6rSDv,{width:cw-16,height:22,x:0,y:0});}}
    nodes.push({...prepared,x:x+8,y:y+(full?34:8),width:cw-16,height:Math.max(1,rowH-38)});
  }
}
return nodes;
