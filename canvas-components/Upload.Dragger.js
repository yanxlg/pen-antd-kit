/**
 * @schema 2.18
 * @input children: string = "Click or drag file to this area to upload"
 * @input hint: string = "Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files."
 * @input disabled: boolean = false
 * @input multiple: boolean = false
 */
const i=pencil.input||{},W=pencil.width,H=pencil.height,color=i.disabled?'#00000040':'#1677FF';
return [
 {type:'rectangle',name:'Dragger surface',x:0,y:0,width:W,height:H,fill:i.disabled?'#FAFAFA':'#FFFFFF',stroke:'#D9D9D9',strokeWidth:1,strokeAlignment:'inner',cornerRadius:8},
 {type:'script',name:'Icon',scriptUri:'../canvas-components/Icon.js',x:(W-48)/2,y:Math.max(20,H/2-54),width:48,height:48,inputs:{name:'InboxOutlined',fontSize:48,color}},
 {type:'text',name:'children',content:i.children||'Click or drag file to this area to upload',x:24,y:Math.max(76,H/2+4),width:Math.max(1,W-48),height:24,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:16,lineHeight:1.5,textAlign:'center',fill:i.disabled?'#00000040':'#000000E0'},
 {type:'text',name:'hint',content:i.hint||'',x:24,y:Math.max(104,H/2+36),width:Math.max(1,W-48),height:22,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,lineHeight:1.5714,textAlign:'center',fill:'#00000073'}
];
