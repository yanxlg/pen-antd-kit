/**
 * @schema 2.18
 * @input fullscreen: boolean = false
 * @input mode: enum("month", "year") = "month"
 * @input showWeek: boolean = false
 * @input value: string = "2026-09-16"
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(280,pencil.width),H=Math.max(240,pencil.height),primary=i.primaryColor||'#1677FF';
const nodes=[];
const text=(content,x,y,width,height,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',textAlign:align,fontFamily:'Inter',fontSize:size,fontWeight:weight,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Calendar surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
nodes.push(box(0,0,W,H,'#FFF',8,i.fullscreen?'#00000000':'#F0F0F0'));
const date=new Date(i.value||'2026-09-16'),year=date.getUTCFullYear(),month=date.getUTCMonth(),selected=date.getUTCDate(),days=new Date(Date.UTC(year,month+1,0)).getUTCDate(),prevDays=new Date(Date.UTC(year,month,0)).getUTCDate(),offset=(new Date(Date.UTC(year,month,1)).getUTCDay()+6)%7;const headerH=i.fullscreen?64:48;
nodes.push({type:'rectangle',name:'Header divider',x:0,y:headerH,width:W,height:1,fill:'#F0F0F0'});
nodes.push(text(String(year),16,14,56,28,14,'#000000E0','500'));
nodes.push(text(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month],78,14,52,28,14,'#000000E0','500'));
const tabW=58;nodes.push(box(W-tabW*2-16,14,tabW,28,i.mode==='month'?'#1677FF':'#FFF',6,'#D9D9D9'));
nodes.push(text('Month',W-tabW*2-16,14,tabW,28,12,i.mode==='month'?'#FFF':'#000000E0','400','center'));
nodes.push(box(W-tabW-16,14,tabW,28,i.mode==='year'?'#1677FF':'#FFF',6,'#D9D9D9'));
nodes.push(text('Year',W-tabW-16,14,tabW,28,12,i.mode==='year'?'#FFF':'#000000E0','400','center'));
if(i.mode==='year'){
 const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 const cw=W/3,rh=(H-headerH)/4;
 months.forEach((m,n)=>{const x=(n%3)*cw,y=headerH+Math.floor(n/3)*rh; if(n===month)nodes.push(box(x+cw/2-28,y+rh/2-14,56,28,'#1677FF',6));nodes.push(text(m,x,y,cw,rh,13,n===month?'#FFF':'#000000E0','400','center'));});
}else{
 const week=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],left=i.showWeek?42:0,cw=(W-left)/7;
 if(i.showWeek)nodes.push(text('Wk',0,headerH+4,left,28,12,'#00000073','400','center'));
 week.forEach((d,n)=>nodes.push(text(d,left+n*cw,headerH+4,cw,28,12,'#00000073','500','center')));
 const top=headerH+32,rh=(H-top)/6;if(i.showWeek)for(let r=0;r<6;r++)nodes.push(text(String(Math.ceil((Date.UTC(year,month,1)-Date.UTC(year,0,1))/86400000/7)+r+1),0,top+r*rh,left,rh,12,'#00000073','400','center'));
 for(let n=0;n<42;n++){const day=n-offset+1;const x=left+(n%7)*cw,y=top+Math.floor(n/7)*rh;const active=day===selected;if(active)nodes.push(box(x+cw/2-14,y+rh/2-14,28,28,primary,14));nodes.push(text(day<1?String(prevDays+day):day>days?String(day-days):String(day),x,y,cw,rh,12,active?'#FFF':(day<1||day>days?'#00000040':'#000000E0'),active?'600':'400','center'));}
 }
return nodes;
