/**
 * @schema 2.18
 * @input children: string = "1|2|3|4"
 * @input arrows: boolean = false
 * @input dots: boolean = true
 * @input dotPlacement: enum("bottom", "top", "start", "end") = "bottom"
 * @input initialSlide: number = 0
 * @input effect: enum("scrollx", "fade") = "scrollx"
 * @input autoplay: string = "false"
 */
const i=pencil.input||{},W=Math.max(40,pencil.width),H=Math.max(24,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content),content:String(content),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,lineHeight:height/size,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});

const slides=String(i.children||'1|2|3|4').split('|'),active=Math.min(slides.length-1,Math.max(0,Number(i.initialSlide)||0));nodes.push(box(0,0,W,H,'#364D79'));nodes.push(text(slides[active],32,(H-28)/2,W-64,28,14,'#FFFFFF','500','center'));
if(i.arrows){const vertical=['start','end'].includes(i.dotPlacement);for(const [n,name] of (vertical?['UpOutlined','DownOutlined']:['LeftOutlined','RightOutlined']).entries())nodes.push({type:'ref',ref:'antd-icon-live-origin',x:vertical?(W-16)/2:n?W-28:12,y:vertical?(n?H-28:12):(H-16)/2,width:16,height:16,inputs:{name,fontSize:16,color:'#FFFFFF73'}});}
if(i.dots!==false){const vertical=['start','end'].includes(i.dotPlacement),length=24+(slides.length-1)*16+(slides.length-1)*8;let cursor=(vertical?H:W)/2-length/2;slides.forEach((_,n)=>{const len=n===active?24:16;nodes.push(box(vertical?(i.dotPlacement==='start'?12:W-15):cursor,vertical?cursor:(i.dotPlacement==='top'?12:H-15),vertical?3:len,vertical?len:3,n===active?'#FFFFFF':'#FFFFFF4D',2));cursor+=len+8;});}

return nodes;
