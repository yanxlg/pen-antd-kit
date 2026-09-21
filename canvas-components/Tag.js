/**
 * @schema 2.18
 * @input children: string = "Tag"
 * @input color: string = "default"
 * @input bordered: boolean = true
 * @input closable: boolean = false
 * @input disabled: boolean = false
 * @input icon: string = ""
 * @input closeIcon: string = "CloseOutlined"
 * @input variant: enum("outlined", "filled", "solid") = "filled"
 * @input styles: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height);
let styles={};try{styles=JSON.parse(i.styles||'{}')}catch{}const s=styles.root||{};
const palette={default:['#F5F5F5','#D9D9D9','#000000E0'],success:['#F6FFED','#B7EB8F','#389E0D'],processing:['#E6F4FF','#91CAFF','#0958D9'],error:['#FFF2F0','#FFCCC7','#CF1322'],warning:['#FFFBE6','#FFE58F','#D48806'],magenta:['#FFF0F6','#FFADD2','#C41D7F'],red:['#FFF1F0','#FFA39E','#CF1322'],volcano:['#FFF2E8','#FFBB96','#D4380D'],orange:['#FFF7E6','#FFD591','#D46B08'],gold:['#FFFBE6','#FFE58F','#D48806'],lime:['#FCFFE6','#EAFF8F','#7CB305'],green:['#F6FFED','#B7EB8F','#389E0D'],cyan:['#E6FFFB','#87E8DE','#08979C'],blue:['#E6F4FF','#91CAFF','#0958D9'],geekblue:['#F0F5FF','#ADC6FF','#1D39C4'],purple:['#F9F0FF','#D3ADF7','#531DAB']};
const p=palette[i.color]||[i.color,i.color,'#FFFFFF'],fg=s.color||(i.disabled?'#00000040':i.variant==='solid'?'#FFFFFF':p[2]),bg=s.backgroundColor||(i.variant==='solid'?p[2]:p[0]),border=s.borderColor||p[1],size=s.fontSize||12;
const lineHeight=s.lineHeight||20;
const icon=(name,x,sz,color)=>({type:'ref',ref:'antd-icon-live-origin',name:'Icon · '+name,x,y:(H-sz)/2,width:sz,height:sz,inputs:{name,fontSize:sz,color}});
const left=i.icon?7+size+7:7,right=i.closable?21:7,children=[];
if(i.icon)children.push(icon(i.icon,7,size,fg));
children.push({type:'text',name:'children',content:String(i.children??''),x:left,y:-1.5,width:Math.max(1,W-left-right),height:H,textGrowth:'fixed-width-height',textAlignVertical:'middle',fontFamily:'AlibabaSans',fontSize:size,lineHeight:lineHeight/size,fill:fg});
if(i.closable)children.push(icon(i.closeIcon||'CloseOutlined',W-17,10,s.closeColor||(i.variant==='solid'?'#FFFFFF':'#00000073')));
return [{type:'frame',name:'Tag root',x:0,y:0,width:W,height:H,layout:'none',cornerRadius:s.borderRadius??4,fill:bg,stroke:border,strokeWidth:s.borderWidth??(i.bordered!==false&&i.variant==='outlined'?1:0),strokeAlignment:'inner',children}];
