/**
 * @schema 2.18
 * @input shape: enum("square", "circle") = "square"
 * @input type: enum("default", "primary") = "default"
 * @input visibilityHeight: number = 400
 * @input duration: number = 450
 * @input icon: string = ""
 * @input disabled: boolean = false
 */
const i=pencil.input||{};
return [{type:'ref',name:'FloatButton',ref:'AhZRS',x:0,y:0,width:40,height:40,inputs:{shape:i.shape||'square',type:i.type||'default',disabled:!!i.disabled,content:'',icon:i.icon||JSON.stringify({type:'ref',ref:'antd-icon-live-origin',inputs:{name:'VerticalAlignTopOutlined',fontSize:18,color:i.type==='primary'?'#FFFFFF':'#000000E0'}})}}];
