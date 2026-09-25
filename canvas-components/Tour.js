/**
 * @schema 2.18
 * @input steps: string = "[{\"title\":\"Upload File\",\"description\":\"Put your files here.\"},{\"title\":\"Save\",\"description\":\"Save your changes.\"},{\"title\":\"Other Actions\",\"description\":\"Click to see other actions.\"}]"
 * @input current: number = 0
 * @input open: boolean = false
 * @input defaultOpen: boolean = false
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight", "center", "left", "right", "bottom", "top", "leftTop", "leftBottom", "rightTop", "rightBottom") = "bottom"
 * @input type: enum("default", "primary") = "default"
 * @input arrow: boolean = true
 * @input indicatorsRender: string = ""
 */
const i=pencil.input||{},parse=(s,d)=>{try{return JSON.parse(s)}catch{return d}},steps=parse(i.steps,[]),current=Math.max(0,Math.min(steps.length-1,Number(i.current)||0)),step=steps[current]||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),primary=i.type==='primary',fg=primary?'#FFFFFF':'#000000E0',nodes=[];if(!i.open&&!i.defaultOpen)return nodes;
nodes.push({type:'rectangle',x:0,y:0,width:W,height:H,fill:primary?'#1677FF':'#FFFFFF',cornerRadius:8,effect:{type:'shadow',shadowType:'outer',color:'#00000026',blur:16,offset:{x:0,y:5}}});
const add=(v,x,y,w,h,weight='400')=>{const node=parse(v,null);nodes.push(node?.type?{...node,x,y,width:w,height:h}:{type:'text',content:v??'',x,y,width:w,height:h,textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:14,fontWeight:weight,lineHeight:1.57,fill:fg});};
const cover=parse(step.cover,null),coverH=cover?.type?Math.min(Number(cover.height)||120,H-110):0;if(coverH)nodes.push({...cover,x:12,y:12,width:W-24,height:coverH});add(step.title,12,12+coverH,W-48,22,'600');add(step.description,12,42+coverH,W-24,Math.max(22,H-90-coverH));nodes.push({type:'ref',ref:'antd-icon-live-origin',x:W-26,y:14,width:14,height:14,inputs:{type:'CloseOutlined',name:'CloseOutlined',fontSize:14,color:fg}});
const indicator=parse(i.indicatorsRender,null);if(indicator?.type)nodes.push({...indicator,x:12,y:H-34,width:Math.max(30,W-160),height:22});else for(let n=0;n<steps.length;n++)nodes.push({type:'ellipse',x:12+n*12,y:H-25,width:6,height:6,fill:n===current?(primary?'#FFFFFF':'#1677FF'):(primary?'#FFFFFF66':'#00000026')});
if(current>0)nodes.push({type:'ref',ref:'DQZzq',x:W-136,y:H-36,width:68,height:24,inputs:{children:'Previous',size:'small'}});nodes.push({type:'ref',ref:'DQZzq',x:W-60,y:H-36,width:48,height:24,inputs:{children:current===steps.length-1?'Finish':'Next',size:'small',type:primary?'default':'primary'}});return nodes;
