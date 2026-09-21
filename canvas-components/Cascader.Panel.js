/**
 * @schema 2.18
 * @input options: string = "[{\"value\":\"zhejiang\",\"label\":\"Zhejiang\",\"children\":[{\"value\":\"hangzhou\",\"label\":\"Hangzhou\",\"children\":[{\"value\":\"west-lake\",\"label\":\"West Lake\"},{\"value\":\"xiaoshan\",\"label\":\"Xiaoshan\"}]}]},{\"value\":\"jiangsu\",\"label\":\"Jiangsu\",\"children\":[{\"value\":\"nanjing\",\"label\":\"Nanjing\"},{\"value\":\"suzhou\",\"label\":\"Suzhou\"}]}]"
 * @input value: string = "[]"
 * @input multiple: boolean = false
 * @input disabled: boolean = false
 * @input direction: enum("ltr", "rtl") = "ltr"
 * @input primaryColor: color = #1677FF
 */

const i=pencil.input||{},W=Math.max(111,Number(pencil.width)||333),H=Math.max(180,Number(pencil.height)||180),primary=i.primaryColor||"#1677FF";
const text=(content,x,y,width,color="#000000E0",fontSize=13,weight="normal",align="left")=>({type:"text",content:String(content),x,y,width,height:Math.max(16,fontSize+4),fill:color,fontFamily:"Inter",fontSize,fontWeight:weight,textAlign:align});
const box=(x,y,width,height,fill="#FFFFFF",cornerRadius=0,stroke="#F0F0F0",strokeWidth=1)=>({type:"rectangle",x,y,width,height,fill,cornerRadius,stroke,strokeWidth,strokeAlignment:"inner"});
const parse=(value,fallback)=>{try{const parsed=JSON.parse(value);return parsed??fallback}catch{return fallback}};
const options=parse(i.options,[]),selected=parse(i.value,[]),menus=[options];let list=options;
const findOption=(items,key)=>items.find(option=>String(option.value)===String(key)||String(option.label)===String(key));
for(const key of selected){const option=findOption(list,key);if(!option?.children?.length)break;list=option.children;menus.push(list);}
const menuWidth=Math.max(111,Math.floor(W/Math.max(1,menus.length))),nodes=[];
nodes.push({type:"rectangle",name:"Cascader panel",x:0,y:0,width:Math.min(W,menuWidth*menus.length),height:H,cornerRadius:6,fill:"#FFFFFF",stroke:"#F0F0F0",strokeWidth:1,effect:{type:"shadow",shadowType:"outer",blur:8,offset:{x:0,y:4},color:"#00000015"}});
if(!options.length){
 const emptyWidth=80,emptyHeight=70,panelWidth=Math.min(W,menuWidth);
 nodes.push({type:"ref",ref:"b0w4Mx",name:"Empty",x:(panelWidth-emptyWidth)/2,y:(H-emptyHeight)/2,width:emptyWidth,height:emptyHeight,inputs:{image:"simple",description:"No data",styles:'{"description":{"color":"#00000040"}}'}});
 return nodes;
}
menus.forEach((menu,column)=>{const x=column*menuWidth;if(column>0)nodes.push(box(x,0,1,H,"#F0F0F0",0,"#F0F0F0",0));menu.slice(0,Math.floor((H-8)/32)).forEach((option,row)=>{const key=option.value??option.label,isSelected=String(selected[column])===String(key),y=4+row*32;if(isSelected)nodes.push(box(x+4,y,menuWidth-8,32,"#E6F4FF",4,"transparent",0));let labelX=x+12;if(i.multiple){const checked=String(selected.at(-1))===String(key);nodes.push(box(labelX,y+8,16,16,checked?primary:"#FFFFFF",4,checked?primary:"#D9D9D9",1));if(checked)nodes.push(text("✓",labelX,y+7,16,"#FFFFFF",12,"600","center"));labelX+=22;}nodes.push(text(option.label??key,labelX,y+7,menuWidth-(labelX-x)-24,i.disabled||option.disabled?"#00000040":"#000000E0",13,isSelected?"600":"normal"));if(option.children?.length)nodes.push(text(i.direction==="rtl"?"‹":"›",x+menuWidth-22,y+7,14,"#00000073",14,"normal","center"));});});
return nodes;
