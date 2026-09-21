/**
 * @schema 2.11
 * @input value: string = ""
 * @input placeholder: string = "Input"
 * @input size: enum("small", "middle", "large") = "middle"
 * @input disabled: boolean = false
 * @input status: enum("default", "error", "warning") = "default"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 */
const i=pencil.input||{},h=i.size==='small'?24:i.size==='large'?40:32,fs=i.size==='large'?16:14,w=pencil.width||143;
const r=i.size==='small'?4:i.size==='large'?8:6;
const radius=i.compactPlacement==='middle'?0:i.compactPlacement==='start'?(i.compactOrientation==='vertical'?[r,r,0,0]:[r,0,0,r]):i.compactPlacement==='end'?(i.compactOrientation==='vertical'?[0,0,r,r]:[0,r,r,0]):r;
return [{type:'rectangle',name:'Input surface',width:w,height:h,cornerRadius:radius,fill:i.disabled?'#F5F5F5':'#FFFFFF',stroke:i.status==='error'?'#FF4D4F':i.status==='warning'?'#FAAD14':'#D9D9D9',strokeWidth:1},
{type:'text',name:i.value?'value':'placeholder',context:i.value?'prop:value':'prop:placeholder',content:i.value||i.placeholder||'',x:11,y:(h-fs*1.5714)/2-1,width:Math.max(0,w-22),height:fs*1.5714,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:fs,lineHeight:1.5714,fill:i.disabled||!i.value?'#00000040':'#000000E0'}];
