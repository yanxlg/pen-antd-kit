/**
 * @schema 2.18
 * @input dataSource: string = ""
 * @input targetKeys: string = "[\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\"]"
 * @input selectedKeys: string = "[]"
 * @input locale: string = "{}"
 * @input titles: string = "Source|Target"
 * @input operations: string = ">|<"
 * @input operationIcons: string = "RightOutlined|LeftOutlined"
 * @input showSearch: boolean = false
 * @input oneWay: boolean = false
 * @input disabled: boolean = false
 * @input disabledEveryThird: boolean = false
 * @input itemCount: number = 20
 * @input itemPrefix: string = "content"
 * @input descriptionSeparator: string = "-"
 * @input sectionWidth: number = 180
 * @input showSelectAll: boolean = true
 * @input pagination: boolean = false
 * @input renderMode: enum("default", "description", "table", "tree") = "default"
 * @input footer: string = ""
 * @input semanticStyle: enum("default", "errorStyle", "warningStyle") = "default"
 * @input status: enum("", "error", "warning", "success", "validating") = ""
 * @input primaryColor: color = #1677FF
 */

const i = pencil.input;
const W = Math.max(320, pencil.width);
const H = Math.max(160, pencil.height);
const primary = i.primaryColor || "#1677FF";
const textColor = i.disabled ? "#00000040" : "#000000E0";
const muted = i.disabled ? "#00000026" : "#00000073";
const statusColor = i.status === "error" ? "#FF4D4F" : i.status === "warning" ? "#FAAD14" : "#D9D9D9";
const nodes = [];

const text = (content, x, y, width, height=22, color=textColor, fontSize=14, weight="normal", align="left") => ({
  type:"text", content:String(content), x, y, width:Math.max(1,width), height, fill:color,
  textGrowth:"fixed-width-height", fontFamily:"Alibaba Sans", fontSize, lineHeight:1.5714,
  fontWeight:weight, textAlign:align, textAlignVertical:"middle",
});
const box = (x,y,width,height,fill="#FFFFFF",radius=6,stroke="#D9D9D9",strokeWidth=1) => ({
  type:"rectangle", x,y,width,height,fill,cornerRadius:radius,stroke,strokeWidth,strokeAlignment:"inner",
});
const line = (x,y,width,color="#F0F0F0") => box(x,y,width,1,color,0,color,0);
const checkbox = (x,y,checked=false,disabled=false) => ({
  type:"ref", ref:"cpj9Y", name:"Checkbox", x,y,width:16,height:16,
  inputs:{checked,disabled,children:""},
});
const icon = (name,x,y,size=14,color=textColor) => ({
  type:"ref",ref:"antd-icon-live-origin",name:`Icon.${name}`,x,y,width:size,height:size,
  inputs:{name,fontSize:size,color},
});
const button = (label,x,y,width=28,disabled=false,type="default",icon="") => ({
  type:"ref", ref:"DQZzq", scriptUri:"../canvas-components/Button.js", name:"Button", x,y,width,height:24,
  inputs:{children:label,size:"small",type,disabled,...(icon?{icon}:{})},
});
const json = (value,fallback) => { try { return JSON.parse(value); } catch { return fallback; } };
const truncate = (value,width,fontSize=14) => {
  const raw=String(value),limit=Math.max(1,Math.floor(width/(fontSize*0.52)));
  return raw.length>limit ? raw.slice(0,Math.max(1,limit-1))+"…" : raw;
};
const fallbackData = Array.from({length:Math.max(0,Number(i.itemCount)||20)},(_,n)=>({
  key:String(n),title:`${i.itemPrefix||"content"}${n+1}`,description:`description of content${n+1}`
}));
const parsedSource = json(i.dataSource,null);
const source = Array.isArray(parsedSource) ? parsedSource : fallbackData;
const parsedTargets = json(i.targetKeys,[]);
const targetKeys = new Set(i.targetKeys === "even"
  ? fallbackData.filter((_,index)=>index%2===0).map(item=>item.key)
  : Array.isArray(parsedTargets) ? parsedTargets.map(String) : []);
const selectedKeys = new Set(Array.isArray(json(i.selectedKeys,[])) ? json(i.selectedKeys,[]).map(String) : []);
const normalize = (item,index) => typeof item === "string" ? {key:String(index),title:item,description:"",tag:["cat","dog","bird"][index%3]} : {
  key:String(item && item.key != null ? item.key : index),
  title:String(item && (item.title ?? item.name) != null ? (item.title ?? item.name) : `content${index+1}`),
  description:String(item && item.description != null ? item.description : `description of content${index+1}`),
  tag:String(item && item.tag != null ? item.tag : ["cat","dog","bird"][index%3]),
  disabled:Boolean(item && item.disabled),
};
const all = source.map(normalize);
const left = all.filter(item=>!targetKeys.has(item.key));
const right = all.filter(item=>targetKeys.has(item.key));
const titles = String(i.titles || "Source|Target").split("|");
const operations = String(i.operations || ">|<").split("|");
const operationIcons = String(i.operationIcons || "RightOutlined|LeftOutlined").split("|");
const customOps = operations.some(label=>label.length>2);
const operationWidth = i.footer ? 84 : customOps ? 144 : 24;
const gap = i.footer ? 100 : customOps ? 160 : 40;
const stretchSections = i.renderMode === "table" || i.renderMode === "tree";
const requestedPanelWidth = Math.max(120,Number(i.sectionWidth)||180);
const panelWidth = stretchSections ? (W-gap)/2 : Math.min(requestedPanelWidth,(W-gap)/2);
const rightX = panelWidth+gap;
const headerHeight = 40;
const searchHeight = i.showSearch ? (i.renderMode==="table"?56:44) : 0;
const footerHeight = i.footer ? 40 : 0;
const paginationHeight = i.pagination ? 40 : 0;
const bodyTop = headerHeight + searchHeight;
const bodyBottom = H-footerHeight-paginationHeight;
const bodyHeight = Math.max(0,bodyBottom-bodyTop);
const itemHeight = i.renderMode === "table" ? 38 : 32;
const semantic = i.semanticStyle || "default";
const panelFill = semantic === "errorStyle" ? "#FAFAFA99" : semantic === "warningStyle" ? "#F6FFED99" : "#FFFFFF";
const semanticBorder = semantic === "warningStyle" ? "#B7EB8F" : statusColor;
const headerColor = semantic === "warningStyle" ? "#8DBCC7" : semantic === "errorStyle" ? primary : textColor;
const headerWeight = semantic === "errorStyle" ? "600" : "normal";

const drawEmpty = (x) => {
  const ew=Math.min(120,panelWidth-24),eh=70;
  nodes.push({type:"ref",ref:"b0w4Mx",name:"Empty",x:x+(panelWidth-ew)/2,y:bodyTop+Math.max(8,(bodyHeight-eh)/2),width:ew,height:eh,inputs:{image:"simple",description:"No data"}});
};
const drawSearch = (x) => {
  if(!i.showSearch) return;
  const sy=i.renderMode==="table"?52:48,sh=i.renderMode==="table"?32:28;
  nodes.push(box(x+12,sy,panelWidth-24,sh,"#FFFFFF",6,"#D9D9D9"));
  nodes.push(icon("SearchOutlined",x+20,sy+(sh-14)/2,14,"#00000040"));
  nodes.push(text("Search here",x+42,sy+(sh-22)/2,panelWidth-58,22,"#00000040",14));
};
const drawHeader = (x,title,count) => {
  if(i.showSelectAll !== false){
    nodes.push(checkbox(x+12,12,false,i.disabled));
    nodes.push(icon("DownOutlined",x+32,13,14,textColor));
  }
  const countX = i.showSelectAll === false ? x+12 : x+50;
  const countLabel = `${count} item${count<=1?"":"s"}`;
  const countWidth = Math.min(Math.ceil(countLabel.length*7.4),Math.floor(panelWidth*0.38));
  const titleX = countX+countWidth+12;
  const titleWidth = Math.max(24,x+panelWidth-12-titleX);
  nodes.push(text(truncate(countLabel,countWidth),countX,9,countWidth,22,textColor,14));
  if(title) nodes.push(text(truncate(title,titleWidth),titleX,9,titleWidth,22,headerColor,14,headerWeight,"right"));
  nodes.push(line(x,39,panelWidth));
};
const drawDefaultRows = (x,items) => {
  if(!items.length){ drawEmpty(x); return; }
  const visible = Math.max(0,Math.floor(bodyHeight/itemHeight));
  items.slice(0,visible).forEach((item,index)=>{
    const y=bodyTop+index*itemHeight;
    const itemDisabled=i.disabled || item.disabled || (i.disabledEveryThird && Number(item.key)%3===0);
    nodes.push(checkbox(x+12,y+8,false,itemDisabled));
    const label=i.renderMode === "description" ? `${item.title}${i.descriptionSeparator||"-"}${item.description}` : item.title;
    nodes.push(text(truncate(label,panelWidth-48),x+36,y+5,panelWidth-48,22,itemDisabled?"#00000040":textColor,14));
  });
};
const drawTable = (x,items) => {
  const col1=Math.max(150,panelWidth*0.29), col2=Math.max(90,panelWidth*0.17), tableHead=39, rowHeight=39, pageHeight=x===0?40:0;
  nodes.push(box(x,bodyTop,panelWidth,tableHead,"#FAFAFA",0,"#F0F0F0"));
  nodes.push(checkbox(x+12,bodyTop+12,false,i.disabled));
  nodes.push(icon("DownOutlined",x+32,bodyTop+13,14,textColor));
  nodes.push(text("Name",x+52,bodyTop+8,col1-52,22,textColor,14,"600"));
  nodes.push(text("Tag",x+col1,bodyTop+8,col2,22,textColor,14,"600"));
  nodes.push(text("Description",x+col1+col2,bodyTop+8,panelWidth-col1-col2-12,22,textColor,14,"600"));
  const room=Math.max(0,Math.floor((bodyHeight-tableHead-pageHeight)/rowHeight));
  if(!items.length){
    const ew=Math.min(120,panelWidth-24),eh=70;
    nodes.push({type:"ref",ref:"b0w4Mx",name:"Empty",x:x+(panelWidth-ew)/2,y:bodyTop+tableHead+Math.max(12,(bodyHeight-tableHead-eh)/2),width:ew,height:eh,inputs:{image:"simple",description:"No data"}});
    return;
  }
  items.slice(0,room).forEach((item,index)=>{
    const y=bodyTop+tableHead+index*rowHeight;
    nodes.push(line(x,y+rowHeight-1,panelWidth)); nodes.push(checkbox(x+12,y+12,false,i.disabled));
    nodes.push(text(item.title,x+44,y+8,col1-52,22,textColor,14));
    nodes.push(box(x+col1,y+8,38,22,"#E6FFFB",4,"#87E8DE"));
    nodes.push(text(item.tag.toUpperCase(),x+col1+4,y+8,30,22,"#08979C",12,"normal","center"));
    const descriptionWidth=panelWidth-col1-col2-12;
    nodes.push(text(truncate(item.description,descriptionWidth),x+col1+col2,y+8,descriptionWidth,22,textColor,14));
  });
  if(x===0){
    const py=H-34;
    nodes.push(line(x,H-40,panelWidth));
    nodes.push(icon("LeftOutlined",x+panelWidth-98,py+7,12,"#00000040"));
    nodes.push(box(x+panelWidth-72,py,24,24,"#FFFFFF",6,primary));
    nodes.push(text("1",x+panelWidth-72,py,24,24,primary,14,"normal","center"));
    nodes.push(text("2",x+panelWidth-42,py,20,24,textColor,14,"normal","center"));
    nodes.push(icon("RightOutlined",x+panelWidth-18,py+7,12,textColor));
  }
};
const drawTree = (x,items) => {
  if(!items.length){drawEmpty(x);return;}
  const rows=[
    {label:"0-0",level:0},{label:"0-1",level:0,open:true},{label:"0-1-0",level:1},{label:"0-1-1",level:1},
    {label:"0-2",level:0},{label:"0-3",level:0},{label:"0-4",level:0},
  ];
  const treeRowHeight=28,visible=Math.max(0,Math.floor(bodyHeight/treeRowHeight));
  rows.slice(0,visible).forEach((row,index)=>{
    const y=bodyTop+index*treeRowHeight, indent=row.level*22;
    if(row.open)nodes.push(icon("DownOutlined",x+12+indent,y+7,12,textColor));
    else if(!row.level)nodes.push(icon("RightOutlined",x+12+indent,y+7,12,textColor));
    nodes.push(checkbox(x+34+indent,y+6,false,i.disabled));
    nodes.push(text(row.label,x+58+indent,y+3,panelWidth-70-indent,22,textColor,14));
  });
};
const drawPanel = (x,title,items) => {
  nodes.push({...box(x,0,panelWidth,H,panelFill,8,semanticBorder),opacity:i.disabled?0.55:1});
  const visualCount=i.renderMode==="tree"&&x===0?7:items.length;
  drawHeader(x,title,visualCount); drawSearch(x);
  if(i.renderMode === "table") drawTable(x,items);
  else if(i.renderMode === "tree") drawTree(x,items);
  else drawDefaultRows(x,items);
  if(i.pagination){
    nodes.push(line(x,H-paginationHeight-footerHeight,panelWidth));
    const py=H-paginationHeight-footerHeight+8;
    nodes.push(icon("LeftOutlined",x+16,py+6,12,"#00000040"));
    nodes.push(box(x+36,py,40,24,"#FFFFFF",6,"#D9D9D9"));
    nodes.push(text("1",x+36,py,40,24,textColor,14,"normal","center"));
    nodes.push(text("/",x+88,py,12,24,muted,14,"normal","center"));
    nodes.push(text("100",x+108,py,34,24,textColor,14,"normal","center"));
    nodes.push(icon("RightOutlined",x+panelWidth-28,py+6,12,textColor));
  }
  if(i.footer){
    const label=x===0?String(i.footer).split("|")[0]:String(i.footer).split("|")[1];
    nodes.push(line(x,H-footerHeight,panelWidth));
    if(label) nodes.push(button(label,x+8,H-footerHeight+8,Math.min(panelWidth-16,150),false,"default"));
  }
};

drawPanel(0,titles[0] === undefined ? "Source" : titles[0],left);
drawPanel(rightX,titles[1] === undefined ? "Target" : titles[1],right);
const labels=i.oneWay?[operations[0]||">"]:operations.slice(0,2);
const buttonY=H/2-(labels.length===1?12:30);
labels.forEach((label,index)=>{
  const canMove=index===0
    ? Array.from(selectedKeys).some(key=>!targetKeys.has(key))
    : Array.from(selectedKeys).some(key=>targetKeys.has(key));
  const disabledAction=i.disabled || !canMove;
  const bx=panelWidth+(gap-operationWidth)/2,by=buttonY+index*36;
  const actionFill=semantic!=="default"?"#FFF2E899":disabledAction?"#F5F5F5":index===0?primary:"#FFFFFF";
  nodes.push(box(bx,by,operationWidth,24,actionFill,6,disabledAction?"#D9D9D9":index===0?primary:"#D9D9D9"));
  const iconName=operationIcons[index]|| (index===0?"RightOutlined":"LeftOutlined");
  if(customOps){
    const labelWidth=Math.min(operationWidth-32,Math.ceil(String(label).length*7.2));
    const contentWidth=14+4+labelWidth;
    const contentX=bx+(operationWidth-contentWidth)/2;
    nodes.push(icon(iconName,contentX,by+5,14,disabledAction?"#00000040":index===0?"#FFFFFF":textColor));
    nodes.push(text(label,contentX+18,by+1,labelWidth+1,22,disabledAction?"#00000040":index===0?"#FFFFFF":textColor,14,"normal","left"));
  }else nodes.push(icon(iconName,bx+5,by+5,14,disabledAction?"#00000040":index===0?"#FFFFFF":textColor));
});

return nodes;
