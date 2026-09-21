/**
 * @schema 2.18
 * @input placeholder: string = "Please select"
 * @input value: string = "[]"
 * @input displayValue: string = ""
 * @input displayLinkText: string = ""
 * @input options: string = "[{\"value\":\"zhejiang\",\"label\":\"Zhejiang\",\"children\":[{\"value\":\"hangzhou\",\"label\":\"Hangzhou\",\"children\":[{\"value\":\"west-lake\",\"label\":\"West Lake\"},{\"value\":\"xiaoshan\",\"label\":\"Xiaoshan\"}]}]},{\"value\":\"jiangsu\",\"label\":\"Jiangsu\",\"children\":[{\"value\":\"nanjing\",\"label\":\"Nanjing\"},{\"value\":\"suzhou\",\"label\":\"Suzhou\"}]}]"
 * @input size: enum("small", "medium", "large") = "medium"
 * @input status: enum("default", "error", "warning") = "default"
 * @input variant: enum("outlined", "borderless", "filled", "underlined") = "outlined"
 * @input disabled: boolean = false
 * @input open: boolean = false
 * @input multiple: boolean = false
 * @input allowClear: boolean = true
 * @input hovered: boolean = false
 * @input showSearch: boolean = false
 * @input searchValue: string = ""
 * @input prefix: string = ""
 * @input suffixIcon: string = ""
 * @input loading: boolean = false
 * @input maxTagCount: number = 2
 * @input maxTagTextLength: number = 0
 * @input placement: enum("bottomLeft", "bottomRight", "topLeft", "topRight") = "bottomLeft"
 * @input changeOnSelect: boolean = false
 * @input expandTrigger: enum("click", "hover") = "click"
 * @input showCheckedStrategy: enum("SHOW_PARENT", "SHOW_CHILD") = "SHOW_PARENT"
 * @input fieldNames: string = "{}"
 * @input expandIcon: string = ""
 * @input loadingIcon: string = ""
 * @input notFoundContent: string = "No data"
 * @input popupRender: string = ""
 * @input styles: string = "{}"
 * @input direction: enum("ltr", "rtl") = "ltr"
 * @input primaryColor: color = #1677FF
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 */

const i = pencil.input || {};
const W = Math.max(80, Number(pencil.width) || 184);
const size = i.size === "middle" ? "medium" : (i.size || "medium");
const h = size === "small" ? 24 : size === "large" ? 40 : 32;
const pad = size === "small" ? 8 : size === "large" ? 16 : 12;
const primary = i.primaryColor || "#1677FF";
const textColor = i.disabled ? "#00000040" : "#000000E0";
const borderColor = i.disabled ? "#D9D9D9" : i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : i.open ? primary : "#D9D9D9";
const text = (content,x,y,width,color="#000000E0",fontSize=14,weight="normal",align="left") => ({type:"text",content:String(content),x,y,width,height:Math.max(16,fontSize+4),textGrowth:"fixed-width-height",fill:color,fontFamily:"Inter",fontSize,fontWeight:weight,textAlign:align});
const textWidth=(value,fontSize=14)=>[...String(value)].reduce((total,char)=>total+(char===" "?fontSize*.25:char==="/"?fontSize*.36:/[A-Z]/.test(char)?fontSize*.6:/[ilI1]/.test(char)?fontSize*.28:fontSize*.5),0);
const ellipsize=(value,maxWidth,fontSize=14)=>{const source=String(value);if(textWidth(source,fontSize)<=maxWidth)return source;const ellipsis="…",limit=Math.max(0,maxWidth-textWidth(ellipsis,fontSize));let result="";for(const char of source){if(textWidth(result+char,fontSize)>limit)break;result+=char;}return result.trimEnd().replace(/\/$/,"").trimEnd()+ellipsis;};
const box = (x,y,width,height,fill="#FFFFFF",cornerRadius=6,stroke="#D9D9D9",strokeWidth=1) => ({type:"rectangle",x,y,width,height,fill,cornerRadius,stroke,strokeWidth,strokeAlignment:"inner"});
const path = (geometry,viewBox,x,y,width,height,fill,stroke,strokeWidth=0) => ({type:"path",geometry,viewBox,x,y,width,height,fill,stroke,strokeWidth});
const parse = (value,fallback) => { if(Array.isArray(value)) return value; try { const result=JSON.parse(value); return result ?? fallback; } catch { return fallback; } };
const fieldNames=parse(i.fieldNames,{})||{},labelField=fieldNames.label||"label",valueField=fieldNames.value||"value",childrenField=fieldNames.children||"children";
const labelOf=option=>option?.[labelField]??option?.label??option?.[valueField]??option?.value;
const valueOf=option=>option?.[valueField]??option?.value??labelOf(option);
const childrenOf=option=>Array.isArray(option?.[childrenField])?option[childrenField]:(Array.isArray(option?.children)?option.children:[]);
const semanticStyles=parse(i.styles,{})||{},rootStyle=semanticStyles.root||{},prefixStyle=semanticStyles.prefix||{},suffixStyle=semanticStyles.suffix||{},contentStyle=semanticStyles.content||{},placeholderStyle=semanticStyles.placeholder||{},itemStyle=semanticStyles.item||{},itemContentStyle=semanticStyles.itemContent||{},itemRemoveStyle=semanticStyles.itemRemove||{},popupStyle=semanticStyles.popup?.root||semanticStyles.popup||{},popupListStyle=semanticStyles.popup?.list||{},popupListItemStyle=semanticStyles.popup?.listItem||{};
const normalizeOptions = value => {
  const parsed=parse(value,null);
  if(Array.isArray(parsed)) return parsed.map((option,index)=>typeof option==="object"?option:{[labelField]:String(option),[valueField]:String(option??index)});
  return String(value||"").split("|").filter(Boolean).map(label=>({label,value:label}));
};
const options=normalizeOptions(i.options);
const parsePath = value => {
  const parsed=parse(value,null);
  if(Array.isArray(parsed) && !Array.isArray(parsed[0])) return parsed;
  if(typeof value==="string" && value.trim() && value.trim()!=="[]") return value.split("/").map(part=>part.trim()).filter(Boolean);
  return [];
};
const parsePaths = value => {
  const parsed=parse(value,null);
  if(Array.isArray(parsed) && Array.isArray(parsed[0])) return parsed;
  const one=parsePath(value); return one.length?[one]:[];
};
const selectedPaths=i.multiple?parsePaths(i.value):[parsePath(i.value)];
const selectedPath=selectedPaths[0]||[];
const findOption=(list,key)=>list.find(option=>String(valueOf(option))===String(key)||String(labelOf(option))===String(key));
const resolveLabels = selected => {
  let list=options; const labels=[];
  for(const key of selected){const option=findOption(list,key);labels.push(labelOf(option)??key);list=childrenOf(option);}
  return labels;
};
const displayLabels=resolveLabels(selectedPath);
const hasValue=selectedPaths.some(selected=>selected.length>0);
const radius=size==="small"?4:size==="large"?8:6;
const compactRadius=()=>i.compactPlacement==="middle"?0:i.compactPlacement==="start"?(i.compactOrientation==="vertical"?[radius,radius,0,0]:[radius,0,0,radius]):i.compactPlacement==="end"?(i.compactOrientation==="vertical"?[0,0,radius,radius]:[0,radius,radius,0]):radius;
const nodes=[];

let surfaceFill=rootStyle.backgroundColor||rootStyle.background||"#FFFFFF",surfaceStroke=rootStyle.borderColor||borderColor,surfaceStrokeWidth=Number(rootStyle.borderWidth??1);
if(i.variant==="filled"){surfaceFill="#F5F5F5";surfaceStroke="transparent";surfaceStrokeWidth=0;}
if(i.variant==="borderless"||i.variant==="underlined"){surfaceStroke="transparent";surfaceStrokeWidth=0;}
if(i.disabled)surfaceFill="#F5F5F5";
const surface=box(0,0,W,h,surfaceFill,i.variant==="underlined"?0:Number(rootStyle.borderRadius??compactRadius()),surfaceStroke,surfaceStrokeWidth);
if(i.open&&i.variant!=="filled"&&i.variant!=="borderless"&&i.variant!=="underlined"&&!i.disabled)surface.effect={type:"shadow",shadowType:"outer",blur:0,spread:2,offset:{x:0,y:0},color:"#1677FF1A"};
nodes.push(surface);
if(i.variant==="underlined")nodes.push(box(0,h-1,W,1,borderColor,0,borderColor,0));

let contentX=pad;
if(i.prefix){nodes.push(text(i.prefix,contentX,(h-18)/2,18,prefixStyle.color||textColor,14));contentX+=22;}
if(i.multiple&&hasValue){
  const labels=selectedPaths.map(resolveLabels).map(labels=>labels.at(-1)||"");
  const limit=Math.max(1,Number(i.maxTagCount)||2),availableRight=W-30;let x=contentX,visibleCount=0;
  for(const labelValue of labels.slice(0,limit)){
    const short=Number(i.maxTagTextLength)>0&&labelValue.length>Number(i.maxTagTextLength)?labelValue.slice(0,Number(i.maxTagTextLength))+"…":labelValue;
    const tagWidth=Math.min(120,Math.max(42,short.length*7+28));
    if(x+tagWidth+(labels.length-visibleCount>1?32:0)>availableRight)break;
    nodes.push(box(x,(h-24)/2,tagWidth,24,"#F5F5F5",4,"transparent",0));
    nodes.push(text(short,x+8,(h-18)/2,tagWidth-24,itemContentStyle.color||textColor,12));
    if(!i.disabled)nodes.push(text("×",x+tagWidth-17,(h-18)/2,12,itemRemoveStyle.color||"#00000073",13,"normal","center"));
    x+=tagWidth+4;visibleCount++;
  }
  const hidden=labels.length-visibleCount;
  if(hidden>0)nodes.push(text("+"+hidden,x,(h-18)/2,28,itemStyle.color||"#00000073",12));
}else{
  const display=i.searchValue||(hasValue?(i.displayValue||displayLabels.length&&displayLabels.join(" / ")||String(i.value)):i.placeholder||"Please select");
  const displayWidth=W-contentX-32;
  const displayLinkText=hasValue&&!i.searchValue?String(i.displayLinkText||""):"";
  const linkStart=displayLinkText?String(display).indexOf(displayLinkText):-1;
  const canRenderLink=linkStart>=0&&textWidth(display,14)<=displayWidth;
  if(canRenderLink){
    const before=String(display).slice(0,linkStart),after=String(display).slice(linkStart+displayLinkText.length);
    const displayFrame={type:"frame",name:"Selected value",x:contentX,y:(h-22)/2,width:displayWidth,height:22,layout:"horizontal",alignItems:"center",clip:true,opacity:i.open&&!i.disabled?.25:1,children:[]};
    if(before)displayFrame.children.push({type:"text",name:"Selected value text",content:before,fill:contentStyle.color||textColor,fontFamily:"Inter",fontSize:14,fontWeight:"normal",lineHeight:1.5714,textGrowth:"auto"});
    displayFrame.children.push({type:"text",name:"Selected value link",content:displayLinkText,fill:i.disabled?"#00000040":primary,fontFamily:"Inter",fontSize:14,fontWeight:"normal",lineHeight:1.5714,textGrowth:"auto"});
    if(after)displayFrame.children.push({type:"text",name:"Selected value suffix",content:after,fill:contentStyle.color||textColor,fontFamily:"Inter",fontSize:14,fontWeight:"normal",lineHeight:1.5714,textGrowth:"auto"});
    nodes.push(displayFrame);
  }else{
    const displayNode=text(hasValue||i.searchValue?ellipsize(display,displayWidth,14):display,contentX,(h-22)/2,displayWidth,hasValue||i.searchValue?(contentStyle.color||textColor):(placeholderStyle.color||"#00000040"),14);
    displayNode.height=22;
    displayNode.lineHeight=1.5714;
    displayNode.textGrowth="auto";
    if(hasValue&&i.open&&!i.disabled)displayNode.opacity=.25;
    nodes.push(displayNode);
  }
}

const suffixX=i.direction==="rtl"?10:W-24;
if(i.loading&&i.loadingIcon){nodes.push(text(i.loadingIcon,suffixX,(h-18)/2,16,suffixStyle.color||"#00000073",14,"normal","center"));}
else if(i.loading){nodes.push(path("M12 2 A10 10 0 1 1 2 12",[0,0,24,24],suffixX,(h-14)/2,14,14,"transparent",suffixStyle.color||"#00000073",2));}
else if(i.allowClear!==false&&i.hovered&&hasValue){nodes.push({type:"ellipse",x:suffixX,y:(h-14)/2,width:14,height:14,fill:"#00000040"});nodes.push(text("×",suffixX,(h-17)/2,14,"#FFFFFF",11,"normal","center"));}
else if(i.suffixIcon)nodes.push(text(i.suffixIcon,suffixX,(h-18)/2,16,suffixStyle.color||"#00000073",14,"normal","center"));
else nodes.push(path("M884 256H809L512 654.2L215 256H140L486.1 754.8C498.9 772.4 525.1 772.4 537.8 754.8Z",[64,64,896,896],suffixX,(h-12)/2,12,12,"#00000040"));

const flatten=(list,prefix=[],result=[])=>{for(const option of list){const next=[...prefix,option],children=childrenOf(option);if(children.length)flatten(children,next,result);else result.push(next);}return result;};
const buildMenus=()=>{
  if(i.showSearch&&i.searchValue){const query=String(i.searchValue).toLowerCase();return [flatten(options).filter(pathItems=>pathItems.some(option=>String(labelOf(option)).toLowerCase().includes(query))).map(pathItems=>({label:pathItems.map(labelOf).join(" / "),value:pathItems.map(valueOf).join("/"),_searchPath:pathItems}))];}
  const menus=[options];let list=options;
  for(const key of selectedPath){const option=findOption(list,key),children=childrenOf(option);if(!children.length)break;list=children;menus.push(list);}
  return menus;
};
if(i.open){
  const menus=buildMenus(),menuWidth=111,popupFooterHeight=i.popupRender?48:0,popupWidth=Math.max(W,menus.length*menuWidth),popupHeight=180+popupFooterHeight;
  const popupX=i.placement?.endsWith("Right")?W-popupWidth:0;
  const popupY=i.placement?.startsWith("top")?-popupHeight-4:h+4;
  nodes.push({type:"rectangle",name:"Cascader popup",x:popupX,y:popupY,width:popupWidth,height:popupHeight,cornerRadius:Number(popupStyle.borderRadius??6),fill:popupStyle.backgroundColor||popupStyle.background||"#FFFFFF",stroke:popupStyle.borderColor||"#F0F0F0",strokeWidth:Number(popupStyle.borderWidth??1),effect:{type:"shadow",shadowType:"outer",blur:8,offset:{x:0,y:4},color:"#00000015"}});
  menus.forEach((menu,column)=>{
    const columnX=popupX+column*menuWidth;
    if(column>0)nodes.push(box(columnX,popupY,1,180,"#F0F0F0",0,"#F0F0F0",0));
    menu.slice(0,5).forEach((option,row)=>{
      const optionValue=valueOf(option),selected=String(selectedPath[column])===String(optionValue),disabled=!!option.disabled,children=childrenOf(option);
      const itemY=popupY+4+row*32;
      if(selected||popupListItemStyle.backgroundColor)nodes.push(box(columnX+4,itemY,menuWidth-8,32,selected?"#E6F4FF":popupListItemStyle.backgroundColor,Number(popupListItemStyle.borderRadius??4),"transparent",0));
      let labelX=columnX+12;
      if(i.multiple){const checked=selectedPaths.some(pathValue=>String(pathValue.at(-1))===String(optionValue));nodes.push(box(labelX,itemY+8,16,16,checked?primary:"#FFFFFF",4,checked?primary:"#D9D9D9",1));if(checked)nodes.push(text("✓",labelX,itemY+7,16,"#FFFFFF",12,"600","center"));labelX+=22;}
      nodes.push(text(labelOf(option)??optionValue,labelX,itemY+7,menuWidth-(labelX-columnX)-24,disabled?"#00000040":(popupListItemStyle.color||"#000000E0"),13,popupListItemStyle.fontWeight||selected?"600":"normal"));
      if(option.loading)nodes.push(text(i.loadingIcon||"◌",columnX+menuWidth-22,itemY+7,14,"#00000073",13,"normal","center"));
      else if(children.length||option.isLeaf===false)nodes.push(text(i.expandIcon||(i.direction==="rtl"?"‹":"›"),columnX+menuWidth-22,itemY+7,14,"#00000073",14,"normal","center"));
    });
  });
  if(!menus[0]?.length){const emptyWidth=80,emptyHeight=70;nodes.push({type:"ref",ref:"b0w4Mx",name:"Empty",x:popupX+(popupWidth-emptyWidth)/2,y:popupY+(180-emptyHeight)/2,width:emptyWidth,height:emptyHeight,inputs:{image:"simple",description:i.notFoundContent||"No data",styles:'{"description":{"color":"#00000040"}}'}});}
  if(i.popupRender){
    nodes.push(box(popupX,popupY+180,popupWidth,1,popupListStyle.borderColor||"#F0F0F0",0,popupListStyle.borderColor||"#F0F0F0",0));
    const custom=parse(i.popupRender,null);
    if(custom?.type)nodes.push({...custom,name:custom.name||"Popup render",x:popupX+12,y:popupY+188,width:popupWidth-24,height:32});
    else nodes.push(text(i.popupRender,popupX+12,popupY+193,popupWidth-24,popupStyle.color||primary,13,"500"));
  }
}
return nodes;
