/**
 * @schema 2.18
 * @input items: string = "This is panel header 1|This is panel header 2|This is panel header 3"
 * @input activeKey: string = "1"
 * @input accordion: boolean = false
 * @input bordered: boolean = true
 * @input collapsible: enum("icon", "disabled", "header") = "header"
 * @input expandIconPlacement: enum("end", "start") = "start"
 * @input expandIcon: string = ""
 * @input ghost: boolean = false
 * @input size: enum("middle", "large", "small") = "middle"
 * @input styles: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),parse=(v,d)=>{try{return typeof v==='string'?JSON.parse(v):v??d}catch{return d}},styles=parse(i.styles,{}),root=styles.root||{},nodes=[];
let items=parse(i.items,null);if(!Array.isArray(items))items=String(i.items||'').split('|').map((label,n)=>({key:String(n+1),label,children:'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'}));
let active=parse(i.activeKey,i.activeKey);active=(Array.isArray(active)?active:[active]).map(String);if(i.accordion)active=active.slice(0,1);
const box=(x,y,width,height,fill,r=0)=>({type:'rectangle',x,y,width,height,fill,cornerRadius:r});
const transparent=i.ghost?'#00000000':'#00000005',border=i.bordered!==false&&!i.ghost;
nodes.push({...box(0,0,W,H,root.backgroundColor||transparent,root.borderRadius??(i.ghost?0:8)),stroke:border?root.borderColor||'#D9D9D9':'#00000000',strokeWidth:border?1:0,strokeAlignment:'inner'});
let y=border?1:0;
items.forEach((item,n)=>{const hs={...styles.header,...item.styles?.header},bs={...styles.body,...item.styles?.body},is=item.style||{},hh=Number(hs.height)||(i.size==='large'?57:i.size==='small'?38:46),open=active.includes(String(item.key)),disabled=i.collapsible==='disabled'||item.collapsible==='disabled',fg=disabled?'#00000040':hs.color||'#000000E0',show=item.showArrow!==false,px=i.size==='large'?24:i.size==='small'?12:16;
 nodes.push(box(1,y,W-2,hh,hs.backgroundColor||is.backgroundColor||transparent,is.borderRadius||0));
 if(show){const iconName=open?'DownOutlined':'RightOutlined',custom=parse(i.expandIcon,null);nodes.push(custom?.type?{...custom,inputs:{...custom.inputs,rotate:open?90:0},x:i.expandIconPlacement==='end'?W-px-12:px,y:y+(hh-12)/2,width:12,height:12}:{type:'ref',ref:'antd-icon-live-origin',x:i.expandIconPlacement==='end'?W-px-12:px,y:y+(hh-12)/2,width:12,height:12,inputs:{type:iconName,name:iconName,fontSize:12,color:fg}});}
 const label=parse(item.label,null),tx=px+(show&&i.expandIconPlacement!=='end'?24:0);if(label?.type)nodes.push({...label,x:tx,y:y+(hh-Number(label.height||22))/2});else nodes.push({type:'text',name:'Panel title',content:String(item.label??''),x:tx,y,width:W-tx-px-(item.extra?24:0),height:hh,textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:Number(hs.fontSize)||14,fontWeight:String(hs.fontWeight||'400'),textAlignVertical:'middle',fill:fg});
 const extra=parse(item.extra,null);if(extra?.type)nodes.push({...extra,x:W-px-16,y:y+(hh-16)/2,width:16,height:16});y+=hh;
 if(open){const child=parse(item.children,null),p=Number(bs.padding??16),bh=Number(bs.height)||(child?.height?Number(child.height)+p*2:54);nodes.push({...box(1,y,W-2,bh,bs.backgroundColor||is.backgroundColor||(i.ghost||i.bordered===false?'#00000000':'#FFFFFF')),name:'Panel content'});if(child?.type)nodes.push({...child,x:p,y:y+p,width:W-p*2});else nodes.push({type:'text',content:String(item.children??''),x:p,y:y+p,width:W-p*2,height:Math.max(22,bh-p*2),textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:Number(bs.fontSize)||14,lineHeight:1.57,fill:bs.color||'#000000E0'});y+=bh;}
 if(n<items.length-1&&!i.ghost&&!is.marginBottom)nodes.push(box(0,y,W,1,'#D9D9D9'));y+=Number(is.marginBottom)||1;
});
return nodes;
