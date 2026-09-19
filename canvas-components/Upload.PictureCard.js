/**
 * @schema 2.18
 * @input children: string = "Upload"
 * @input listType: enum("picture-card", "picture-circle") = "picture-card"
 * @input disabled: boolean = false
 */
const i=pencil.input||{},circle=i.listType==='picture-circle',color=i.disabled?'#00000040':'#00000073';
return [
 {type:'rectangle',name:'Picture trigger',x:0,y:0,width:pencil.width,height:pencil.height,fill:'#FAFAFA',stroke:'#D9D9D9',strokeWidth:1,strokeAlignment:'inner',cornerRadius:circle?Math.min(pencil.width,pencil.height)/2:8},
 {type:'script',name:'Icon',scriptUri:'../canvas-components/Icon.js',x:(pencil.width-20)/2,y:28,width:20,height:20,inputs:{name:'PlusOutlined',fontSize:20,color}},
 {type:'text',name:'children',content:i.children||'Upload',x:8,y:60,width:Math.max(1,pencil.width-16),height:22,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,lineHeight:1.5714,textAlign:'center',fill:color}
];
