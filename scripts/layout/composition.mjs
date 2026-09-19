import {registry,groups} from './catalog.mjs';
export function layoutInstance(name,props={},placement={}){
 const group=groups[name]||Object.values(groups).find(g=>g.component===name),component=group?.component||name;
 if(!registry.components[component])throw Error('Unknown component '+component);
 const defaults=registry.values[registry.components[component]]?.inputs||{},[width,height]=group?.masterSize||[240,120];
 return{type:'script',name:component,scriptUri:'../canvas-components/'+component+'.js',inputs:{...defaults,...props},width,height,...placement};
}
export function reactModel(node){
 const native=registry.nativeValues?.[node.ref];
 if(native){const resolve=c=>c?.ref?reactModel(c):c&&typeof c==='object'?{...c,children:(c.children||[]).map(resolve)}:c;return resolve(native);}
 const binding=registry.values[node.ref],script=node.scriptUri||binding?.scriptUri;
 if(!script)throw Error('Unregistered component reference '+node.ref);
 const name=script.split('/').at(-1).replace('.js',''),p=node.inputs!==undefined?node.inputs:(binding?.inputs||{});
 const ref=(id,inputs,size={})=>reactModel({ref:id,...(inputs?{inputs:{...(registry.values[id]?.inputs||{}),...inputs}}:{}),...size});
 const model=(component,props={},children=[])=>({component,props,children});
 const slotChildren=()=>Array.from({length:24},(_,n)=>n+1).filter(k=>p['child'+k]).map(k=>{const child=ref(p['child'+k]);child.props.style={...child.props.style,width:p['child'+k+'Width']??80,height:p['child'+k+'Height']??32};return child;});
 if(name==='Flex'||name==='Space'||name==='Space.Compact'){
  const props={orientation:p.orientation||(p.vertical?'vertical':'horizontal')};
  if(name==='Flex'){Object.assign(props,{justify:p.justify,align:p.align,wrap:p.wrap,gap:/^\d/.test(p.gap)?Number(p.gap):p.gap});if(p.rowGap>=0)props.style={rowGap:p.rowGap};}
  else{props.size=/^\d/.test(p.size)?Number(p.size):p.size;if(name==='Space'){props.align=p.align;props.wrap=p.wrap;if(p.rowGap>=0)props.size=[props.size,p.rowGap];if(p.separator)props.separator=ref(p.separator);}else props.block=p.block;}
  return model(name,props,slotChildren());
 }
 if(name==='Row')return model('Row',{gutter:[p.gutter||0,p.verticalGutter||0],justify:p.justify,align:p.align,wrap:p.wrap},Array.from({length:24},(_,n)=>n+1).filter(k=>p['col'+k]).map(k=>ref(p['col'+k],{span:p['span'+k]??6,offset:p['offset'+k]||0,order:p['order'+k]??k,gutter:p.gutter||0,children:p['children'+k]||'',childrenContent:p['childrenContent'+k]||'',background:p['background'+k]||'#00000000',color:p['color'+k]||'#FFFFFF',cornerRadius:p['cornerRadius'+k]||0})));
 if(name==='Col')return model('Col',{span:p.span,offset:p.offset,order:p.order,push:p.push,pull:p.pull},p.childrenContent?[ref(p.childrenContent)]:p.children?[model('div',{style:{background:p.background,color:p.color,borderRadius:p.cornerRadius,height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}},[p.children])]:[]);
 if(name==='Layout'){
  const head=p.header?ref(p.header):null,foot=p.footer?ref(p.footer):null,body=p.content?ref(p.content):null,sider=p.hasSider&&p.sider?ref(p.sider,{width:p.siderWidth,collapsedWidth:p.collapsedWidth,collapsed:p.collapsed}):null;
  if(head)head.props.style={...head.props.style,height:p.headerHeight??64};if(foot)foot.props.style={...foot.props.style,height:p.footerHeight??70};
  if(!sider)return model('Layout',{},[head,body,foot].filter(Boolean));
  if(p.siderOverlay)sider.props.style={...sider.props.style,position:'absolute',insetBlock:0,[p.siderPlacement==='end'?'right':'left']:0,zIndex:1};
  const pair=content=>p.siderPlacement==='end'?[content,sider]:[sider,content];
  return p.siderOutside?model('Layout',{hasSider:true,...(p.siderOverlay?{style:{position:'relative'}}:{})},pair(model('Layout',{},[head,body,foot].filter(Boolean)))):model('Layout',{},[head,model('Layout',{hasSider:true,...(p.siderOverlay?{style:{position:'relative'}}:{})},pair(body)),foot].filter(Boolean));
 }
 if(name.startsWith('Layout.')&&name!=='Layout.DemoItem'){
  const props=name==='Layout.Sider'?{width:p.width,collapsedWidth:p.collapsedWidth,collapsed:p.collapsed,collapsible:p.collapsible,theme:p.theme,reverseArrow:p.reverseArrow,trigger:p.trigger?ref(p.trigger):undefined}:{style:{background:p.background,paddingInline:p.paddingInline,paddingBlock:p.paddingBlock}};
  return model(name,props,p.children?[ref(p.children)]:[]);
 }
 if(name==='Splitter'){
  const ks=[1,2,3].filter(k=>p['panel'+k]),sizes=ks.map(k=>p['size'+k]||0);if(p.collapsed&&sizes.length>1){sizes[1]+=sizes[0];sizes[0]=0;}
  return model('Splitter',{orientation:p.orientation||(p.vertical?'vertical':'horizontal'),lazy:p.lazy},ks.map((k,n)=>ref(p['panel'+k],{size:sizes[n]+'%',resizable:p.resizable,collapsible:p.collapsible})));
 }
 if(name==='Splitter.Panel')return model(name,{size:p.size,min:p.min,max:p.max,resizable:p.resizable,collapsible:p.collapsible},p.children?[ref(p.children)]:[]);
 if(name==='Masonry')return model(name,{columns:p.columns||3,gutter:[p.gutter||0,p.verticalGutter??p.gutter??0],fresh:p.fresh,items:Array.from({length:24},(_,n)=>n+1).filter(k=>p['item'+k]).map(k=>({key:k,column:p['column'+k]>=0?p['column'+k]:undefined,height:p['height'+k],data:{},children:ref(p['item'+k])}))});
 if(name==='Layout.DemoItem')return model('div',{style:{background:p.background,color:p.color,display:'flex',alignItems:'center',justifyContent:'center'}},[p.children??'Content']);
 if(name==='Divider')return model(name,{orientation:p.orientation,vertical:p.vertical,titlePlacement:p.titlePlacement,variant:p.variant,dashed:p.dashed,plain:p.plain,size:p.size,style:{...(p.marginBlock>=0?{marginBlock:p.marginBlock}:{})}},p.children?[p.children]:[]);
 if(name==='Card.content')return model('Card',{variant:p.variant,styles:{body:{padding:p.padding??24}}},p.children?[ref(p.children)]:[]);
 if(name==='Typography'){const {component,content,level,...props}=p;return model('Typography.'+(component||'Text'),{...props,...(component==='Title'?{level:Number(level||1)}:{})},[content||'']);}
 if(name==='Input.control')return model('Input',p);
 if(name==='Button'){const {children,...props}=p;return model(name,props,children?[children]:[]);}
 if(name==='Icon')return model(p.name||'SearchOutlined',{style:{fontSize:p.fontSize,color:p.color},rotate:p.rotate});
 if(name==='Space.Addon'){const{children,size,compactPlacement,...props}=p;return model(name,props,children?[children]:[]);}
 throw Error('Missing React composition mapping: '+name);
}
