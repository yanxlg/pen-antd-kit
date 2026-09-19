/**
 * @schema 2.18
 * @input title: string = "浮层卡片标题"
 * @input content: string = "这里是浮层内部承载的详细内容"
 * @input open: boolean = false
 * @input defaultOpen: boolean = false
 * @input destroyOnHidden: boolean = false
 * @input disabled: boolean = false
 * @input forceRender: boolean = false
 * @input fresh: boolean = false
 * @input mouseEnterDelay: number = 0
 * @input mouseLeaveDelay: number = 0
 * @input openClassName: string = ""
 * @input overlayClassName: string = ""
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight", "left", "right", "bottom", "top", "leftTop", "leftBottom", "rightTop", "rightBottom") = "bottomLeft"
 * @input popupVisible: boolean = false
 * @input unique: boolean = false
 * @input zIndex: number = 0
 * @input primaryColor: color = #1677FF
 */

const i=pencil.input||{},W=Math.max(160,pencil.width),H=Math.max(72,pencil.height),nodes=[];
const text=(content,x,y,width,height,color="#000000E0",fontSize=14,weight="400")=>({type:"text",name:String(content),content:String(content),x,y,width,height,textGrowth:"fixed-width-height",fill:color,fontFamily:"Inter",fontSize,fontWeight:weight,lineHeight:1.5});
nodes.push({type:"rectangle",name:"Popover surface",x:4,y:8,width:W-8,height:H-12,cornerRadius:8,fill:"#FFFFFF",effect:{type:"shadow",shadowType:"outer",color:"#00000026",blur:14,offset:{x:0,y:5}}});
nodes.push({type:"path",name:"Popover arrow",x:W/2-6,y:2,width:12,height:8,geometry:"M 0 8 L 6 0 L 12 8 Z",fill:"#FFFFFF"});
const hasTitle=String(i.title||"").length>0;
if(hasTitle)nodes.push(text(i.title,16,18,W-32,24,"#000000E0",14,"600"));
nodes.push(text(i.content||"Content",16,hasTitle?44:24,W-32,Math.max(22,H-(hasTitle?52:32)),"#000000E0",14,"400"));
return nodes;
