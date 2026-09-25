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
const ARROWS = {
  LeftOutlined: 'M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z',
  RightOutlined: 'M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z',
  UpOutlined: 'M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z',
  DownOutlined: 'M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.5 486.1c12.8 17.6 39 17.6 51.7 0l352.5-486.1c3.9-5.3.1-12.7-6.4-12.7z'
};
if(i.arrows){
  const vertical=['start','end'].includes(i.dotPlacement);
  for(const [n,name] of (vertical?['UpOutlined','DownOutlined']:['LeftOutlined','RightOutlined']).entries()) {
    nodes.push({
      type: 'path',
      name: 'Icon · ' + name,
      x: vertical ? (W-16)/2 : (n ? W-28 : 12),
      y: vertical ? (n ? H-28 : 12) : (H-16)/2,
      width: 16,
      height: 16,
      viewBox: [64, 64, 896, 896],
      geometry: ARROWS[name],
      fill: '#FFFFFF73'
    });
  }
}
if(i.dots!==false){const vertical=['start','end'].includes(i.dotPlacement),length=24+(slides.length-1)*16+(slides.length-1)*8;let cursor=(vertical?H:W)/2-length/2;slides.forEach((_,n)=>{const len=n===active?24:16;nodes.push(box(vertical?(i.dotPlacement==='start'?12:W-15):cursor,vertical?cursor:(i.dotPlacement==='top'?12:H-15),vertical?3:len,vertical?len:3,n===active?'#FFFFFF':'#FFFFFF4D',2));cursor+=len+8;});}

return nodes;
