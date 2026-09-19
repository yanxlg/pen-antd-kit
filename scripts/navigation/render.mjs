// Canvas renderers use the public Ant Design 6 props. Events remain React behavior.
export function renderNavigation(component, i, W, H, metrics) {
  const nodes = [], primary=i.primaryColor||'#1677ff', fg='#000000e0', muted='#00000073', disabled='#00000040', border='#f0f0f0';
  const parse=(v,f)=>{if(typeof v!=='string')return v??f;try{return JSON.parse(v)}catch{return f}};
  const measure=(s,size=14)=>{let w=0,p='';for(const c of String(s??'')){w+=(metrics.widths[c]??(c.codePointAt(0)>255?1:.6))+(metrics.pairs[p+c]||0);p=c;}return Math.ceil(w*size)};
  const measureExact=(s,size=14)=>{let w=0,p='';for(const c of String(s??'')){w+=(metrics.widths[c]??(c.codePointAt(0)>255?1:.6))+(metrics.pairs[p+c]||0);p=c;}return w*size};
  const text=(name,s,x,y,w,h=22,color=fg,size=14,weight='normal',align='left')=>({type:'text',name,content:String(s??''),x,y,width:Math.max(1,w),height:h,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,lineHeight:1.5714286,fontWeight:weight,fill:color,textAlign:align,textAlignVertical:'middle'});
  const rect=(name,x,y,w,h,fill,r=0,stroke)=>({type:'rectangle',name,x,y,width:Math.max(0,w),height:Math.max(0,h),fill,cornerRadius:r,...(stroke?{stroke,strokeWidth:1,strokeAlignment:'inner'}:{})});
  const script=(name,inputs,x,y,w,h)=>({type:'script',name,scriptUri:'../canvas-components/'+name+'.js',inputs,x,y,width:w,height:h});
  const icon=(value,x,y,size=14,color=fg)=>{const d=parse(value,null);return d?.type?{...d,name:d.name||'Icon',x,y,width:size,height:size,inputs:{...d.inputs,fontSize:size,color}}:script('Icon',{name:typeof value==='string'?value:'DownOutlined',fontSize:size,color},x,y,size,size)};
  const content=(value,x,y,w,h,color=fg)=>{const d=parse(value,null);return d?.type?{...d,name:d.name||'Content',x,y,width:w,height:h}:text('Content',value,x,y,w,h,color)};
  const items=parse(i.items,[]);
  if(component==='Anchor'){
    const horizontal=i.direction==='horizontal',styles=parse(i.styles,{})||{},rootStyle=styles.root||{},itemStyle=styles.item||{},titleStyle=styles.itemTitle||{},indicatorStyle=styles.indicator||{};
    const verticalHeight=(list,depth=0)=>(list||[]).reduce((sum,item)=>sum+(item.children?29+verticalHeight(item.children,depth+1):(depth?26:30)),0);
    if(Object.keys(rootStyle).length)nodes.push(rect('Anchor root',0,0,W,H,rootStyle.backgroundColor||rootStyle.background||'#00000000',Number(rootStyle.borderRadius??0),rootStyle.borderColor));
    nodes.push(rect('Anchor rail',0,horizontal?H-1:4,horizontal?W:2,horizontal?1:Math.min(Math.max(0,H-4),verticalHeight(items)),border));
    let x=horizontal?2:0,y=4;
    const activeHref=i.activeHref||items[0]?.href||'';
    function links(list,depth=0){for(const item of list){const title=item.title??'',w=measureExact(title),active=activeHref===item.href,tx=horizontal?x:18+depth*16,ty=horizontal?8:y+(depth?2:4),tw=horizontal?w:Math.max(1,W-tx),color=titleStyle.color||(active?primary:fg);
      if(itemStyle.backgroundColor||itemStyle.background)nodes.push(rect('Anchor item',horizontal?x:2,horizontal?4:y,horizontal?w+(x>2?16:0):W-2,depth?26:30,itemStyle.backgroundColor||itemStyle.background,Number(itemStyle.borderRadius??0)));
      nodes.push(content(title,tx,ty,tw,22,color));
      if(active)nodes.push(rect('Active anchor indicator',horizontal?x:0,horizontal?H-2:ty,horizontal?Math.ceil(w):2,horizontal?2:22,indicatorStyle.backgroundColor||indicatorStyle.background||indicatorStyle.color||primary));
      if(horizontal)x+=w+16;else if(item.children){y+=29;links(item.children,depth+1);}else y+=depth?26:30;
    }}links(items);return nodes;
  }
  if(component==='Breadcrumb'){
    const styles=parse(i.styles,{})||{},rootStyle=styles.root||{},itemStyle=styles.item||{},separatorStyle=styles.separator||{};
    const padding=Number(rootStyle.padding??0),borderValue=String(rootStyle.border??''),rootStroke=rootStyle.borderColor||(borderValue.match(/#[0-9a-f]{3,8}|rgba?\([^)]+\)/i)||[])[0],inset=rootStroke?1:0,separatorColor=separatorStyle.color||muted;
    if(Object.keys(rootStyle).length)nodes.push(rect('Breadcrumb root',0,0,W,H,rootStyle.backgroundColor||rootStyle.background||'#00000000',Number(rootStyle.borderRadius??0),rootStroke));
    let x=padding+inset,y=padding+inset;items.forEach((item,k)=>{const itemColor=item.href!==undefined?muted:itemStyle.color||(k===items.length-1?fg:muted);if(item.type==='separator'){const s=item.separator??'/',sw=measureExact(s);nodes.push(content(s,x+8,y,sw,22,separatorColor));x+=sw+16;return;}
      const label=item.title??'';if(item.icon){nodes.push(icon(item.icon,x,y+4,14,itemColor));x+=14+(label?4:0);}
      const w=item.width??measureExact(label);nodes.push(content(label,x,y,w,22,itemColor));x+=w;
      if(item.menu){nodes.push(icon('DownOutlined',x+4,y+6,10,itemColor));x+=18;}
      if(k<items.length-1&&items[k+1].type!=='separator'){const sep=i.separator??'/',sw=measureExact(sep);nodes.push(content(sep,x+8,y,sw,22,separatorColor));x+=16+sw;}
    });return nodes;
  }
  if(component==='Menu'){
    const horizontal=i.mode==='horizontal',dark=i.theme==='dark',collapsed=!!i.inlineCollapsed,selected=parse(i.selectedKeys,[]),open=parse(i.openKeys,[]),base=dark?'#ffffffa6':fg;
    nodes.push(rect('Menu surface',0,0,W,H,dark?'#001529':'#ffffff'));
    if(horizontal)nodes.push(rect('Menu border',0,45,W,1,border));else if(!dark&&!i.dropdownMenu)nodes.push(rect('Menu border',W-1,0,1,H,border));
    let x=0,y=i.dropdownMenu?4:0;
    const containsSelected=item=>selected.includes(String(item.key))||(item.children||[]).some(containsSelected);
    const visibleHeight=list=>(list||[]).reduce((sum,item)=>sum+(item.type==='divider'?5:item.type==='group'?42+visibleHeight(item.children):44+(item.children&&open.includes(String(item.key))?visibleHeight(item.children)+4:0)),0);
    function draw(list,depth=0){for(const item of list){
      if(item.type==='divider'){nodes.push(rect('Menu divider',i.dropdownMenu?4:0,y+4,i.dropdownMenu?W-8:W-1,1,border));y+=i.dropdownMenu?9:5;continue;}
      if(item.type==='group'){if(i.dropdownMenu){nodes.push(text('Group label',item.label,12,y,W-24,32,dark?'#ffffff73':muted));y+=32;}else{nodes.push(text('Group label',item.label,16+depth*16,y+12,W-32-depth*16,22,dark?'#ffffff73':muted));y+=42;}draw(item.children||[],depth);continue;}
      const active=selected.includes(String(item.key)),selectedBranch=containsSelected(item),isOpen=open.includes(String(item.key)),color=item.disabled?disabled:(active||item.children&&selectedBranch)?(dark?'#ffffff':primary):item.danger?'#ff4d4f':base;
      const title=item.label??'',hasIcon=!!item.icon,labelWidth=horizontal?measureExact(title):measure(title)+1,iconSpace=hasIcon?24:0,left=collapsed?(W-16)/2:horizontal?16:(i.dropdownMenu?12:24)+depth*(i.inlineIndent??24),height=horizontal?46:i.dropdownMenu?32:40,width=horizontal?32+iconSpace+labelWidth:W-(i.dropdownMenu||dark?8:9),px=horizontal?x:4,py=horizontal?0:y+(i.dropdownMenu?0:4);
      if(active&&!horizontal)nodes.push(rect('Selected menu item',px,py,width,height,dark?primary:'#e6f4ff',8));
      if(hasIcon)nodes.push(icon(item.icon,px+left,py+(height-14)/2,14,color));
      if(!collapsed){
        const tx=px+left+iconSpace,tw=horizontal?labelWidth:Math.max(1,width-left-iconSpace-(item.children?34:i.dropdownMenu?12:16));
        nodes.push(content(title,tx,py+(height-22)/2,tw,22,color));
        if(item.children&&!horizontal)nodes.push(icon(isOpen?'UpOutlined':'DownOutlined',W-30,py+(height-10)/2,10,color));
      }
      if(active&&horizontal)nodes.push(rect('Selected menu underline',x+16,44,width-32,2,primary));
      if(horizontal)x+=width;else{y+=height+(i.dropdownMenu?0:4);if(item.children&&isOpen&&!collapsed){nodes.push(rect('Inline submenu surface',0,y+4,W-1,visibleHeight(item.children),dark?'#000c17':'#00000005'));draw(item.children,depth+1);y+=4;}}
    }}draw(items);return nodes;
  }
  if(component==='Pagination'){
    const size=i.size==='small'?24:i.size==='large'?40:32,gap=i.size==='small'?4:i.size==='large'?12:8,total=Math.max(0,i.total??50),pageSize=Math.max(1,i.pageSize??10),pages=Math.max(1,Math.ceil(total/pageSize)),current=Math.min(pages,Math.max(1,i.current??1));let x=0;
    const color=i.disabled?disabled:fg;
    if(i.hideOnSinglePage&&pages===1)return nodes;
    if(i.showTotal){const label=i.showTotal==='range'?`${(current-1)*pageSize+1}-${Math.min(current*pageSize,total)} of ${total} items`:`Total ${total} items`;nodes.push(text('Total',label,x,0,measure(label),size,color));x+=measure(label)+8;}
    function arrow(name,inactive,label){const w=label?measure(label)+8:size;if(label)nodes.push(text(name,label,x,0,w,size,inactive||i.disabled?disabled:color));else nodes.push(icon(name,x+(size-12)/2,(size-12)/2,12,inactive||i.disabled?disabled:color));x+=w+gap;}
    arrow('LeftOutlined',current===1,i.previousLabel);
    if(i.simple){const slashWidth=measureExact('/'),pageWidth=measureExact(String(pages));if(i.readOnly){const currentWidth=measureExact(String(current));nodes.push(text('Current page',current,x,0,currentWidth,size,color,14,'normal','center'));nodes.push(text('Simple slash','/',x+currentWidth+12,0,slashWidth,size,color));nodes.push(text('Page count',pages,x+currentWidth+24+slashWidth,0,pageWidth,size,color));x+=currentWidth+slashWidth+pageWidth+44;}else{nodes.push(script('Input',{value:String(current),placeholder:'',disabled:!!i.disabled,size:i.size==='small'?'small':i.size==='large'?'large':'middle',allowClear:false,textAlign:'center'},x,0,50,size));nodes.push(text('Simple slash','/',x+62,0,slashWidth,size,color));nodes.push(text('Page count',pages,x+74+slashWidth,0,pageWidth,size,color));x+=82+slashWidth+pageWidth;}}
    else{let list=[];const buffer=i.showLessItems?1:2;if(pages<=5+buffer*2)list=Array.from({length:pages},(_,k)=>k+1);else{let left=Math.max(1,current-buffer),right=Math.min(pages,current+buffer);if(current<=1+buffer)right=1+buffer*2;if(current>=pages-buffer)left=pages-buffer*2;list=[...Array.from({length:right-left+1},(_,k)=>left+k)];if(left>1)list.unshift(...(left>2?[1,'previous']:[1]));if(right<pages)list.push(...(right<pages-1?['next',pages]:[pages]));}
      for(const p of list){if(typeof p!=='number')nodes.push({...icon('EllipsisOutlined',x+(size-Math.min(24,size))/2,(size-Math.min(24,size))/2,Math.min(24,size),disabled),name:'Jump '+p});else{const active=p===current;nodes.push(rect('Page '+p,x,0,size,size,i.disabled&&active?'#0000000f':'#fff',i.size==='small'?4:6,active&&!i.disabled?primary:undefined));nodes.push(text('Page label',p,x,0,size,size,i.disabled?disabled:active?primary:fg,14,active?'600':'normal','center'));}x+=size+gap;}}
    arrow('RightOutlined',current===pages,i.nextLabel);
    if(i.showSizeChanger){x+=8;const label=pageSize+' / page',w=measureExact(label)+42;nodes.push(script('Select',{value:label,options:'10 / page|20 / page|50 / page|100 / page',disabled:!!i.disabled,size:i.size||'middle',allowClear:false},x,0,w,size));x+=w+8;}
    if(i.showQuickJumper){const prefix='Go to',prefixWidth=measureExact(prefix),prefixX=x+(i.showSizeChanger?0:8);nodes.push(text('Jump prompt',prefix,prefixX,0,prefixWidth,size,color));x=prefixX+prefixWidth+8;nodes.push(script('Input',{value:'',placeholder:'',disabled:!!i.disabled,size:i.size==='small'?'small':i.size==='large'?'large':'middle',allowClear:false},x,0,50,size));x+=58;nodes.push(text('Jump suffix','Page',x,0,measureExact('Page'),size,color));x+=measureExact('Page');}
    const used=Math.max(0,...nodes.map(n=>n.x+n.width)),offset=i.align==='center'?(W-used)/2:i.align==='end'?W-used:0;if(offset>0)for(const n of nodes)n.x+=offset;
    return nodes;
  }
  if(component==='Tabs'){
    const placement=i.tabPlacement||'top',vertical=placement==='start'||placement==='end',card=i.type==='card'||i.type==='editable-card',editable=i.type==='editable-card',fs=i.size==='large'?16:14,lh=i.size==='large'?24:22,activeKey=String(i.activeKey??items[0]?.key??''),styles=parse(i.styles,{})||{},rootStyle=styles.root||{},headerStyle=styles.header||{},itemStyle=styles.item||{},indicatorStyle=styles.indicator||{},bodyStyle=styles.body||{},contentStyle=styles.content||{},classNames=parse(i.classNames,{})||{};
    const customPad=String(itemStyle.padding||'').match(/([\d.]+)px(?:\s+([\d.]+)px)?/),padY=customPad?Number(customPad[1]):vertical?8:card?(i.size==='small'?4:i.size==='large'?11:8):(i.size==='small'?8:i.size==='large'?16:12),padX=customPad?Number(customPad[2]??customPad[1]):vertical?24:card?(i.size==='small'?8:16):0;
    const bar=vertical?0:lh+padY*2+(card?2:0),tabH=vertical?(card?lh+padY*2+2:38):bar,gap=vertical?(card?2:16):card?2:(i.tabBarGutter??32),radius=i.size==='small'?6:8,rootPad=Number(rootStyle.padding??0),rootBorder=Number(rootStyle.borderWidth??(classNames.root?2:0)),inset=rootPad+rootBorder;
    const labelWidths=items.map(it=>measureExact(it.label,fs)),customLinePad=customPad&&!card?padX*2:0,widths=items.map((it,k)=>labelWidths[k]+(it.icon?fs+8:0)+customLinePad+(card?padX*2+2:0)+(editable&&it.closable!==false?28:0)),sum=widths.reduce((a,b)=>a+b,0)+gap*Math.max(0,items.length-1),side=vertical?Math.max(40,...widths.map((w,k)=>card?w:labelWidths[k]+(items[k].icon?fs+8:0)+48)):0;
    const extraStart=parse(i.extraStart,null),extraEnd=parse(i.extraEnd,null),swButton=extraStart?Math.max(i.extraStartWidth||0,measureExact(extraStart.inputs?.children||'')+32):0,ewButton=extraEnd?Math.max(i.extraEndWidth||0,measureExact(extraEnd.inputs?.children||'')+32):0,sw=swButton+(extraStart?Number(i.extraStartMargin??0):0),ew=ewButton+(extraEnd?Number(i.extraEndMargin??0):0),innerW=W-inset*2,innerH=H-inset*2;
    const dashed=rootStyle.borderStyle==='dashed'||!!classNames.root,rootColor=rootStyle.borderColor||fg;if(rootStyle.backgroundColor||rootStyle.background||rootBorder)nodes.push(rect('Tabs root',0,0,W,H,rootStyle.backgroundColor||rootStyle.background||'#00000000',0,dashed?undefined:rootColor));if(rootBorder&&dashed){const dash=6,gapDash=4;for(let q=0;q<W;q+=dash+gapDash){nodes.push(rect('Root border top',q,0,Math.min(dash,W-q),rootBorder,rootColor));nodes.push(rect('Root border bottom',q,H-rootBorder,Math.min(dash,W-q),rootBorder,rootColor));}for(let q=0;q<H;q+=dash+gapDash){nodes.push(rect('Root border start',0,q,rootBorder,Math.min(dash,H-q),rootColor));nodes.push(rect('Root border end',W-rootBorder,q,rootBorder,Math.min(dash,H-q),rootColor));}}
    let x=vertical?(placement==='end'?W-inset-side:inset):(i.centered?inset+Math.max(sw,(innerW-sum)/2):inset+sw),y=placement==='bottom'?H-inset-bar:inset;
    if(headerStyle.backgroundColor||headerStyle.background)nodes.push(rect('Tabs header',vertical?(placement==='end'?W-inset-side:inset):inset,vertical?inset:y,vertical?side:innerW,vertical?innerH:bar,headerStyle.backgroundColor||headerStyle.background));
    nodes.push(rect('Tab bar divider',vertical?(placement==='end'?W-inset-side:inset+side-1):inset,vertical?inset:placement==='bottom'?y:y+bar-1,vertical?1:innerW,vertical?innerH:1,border));
    items.forEach((it,k)=>{const active=String(it.key)===activeKey,w=vertical?side:widths[k],h=tabH,color=it.disabled?disabled:active?primary:(itemStyle.color||fg),limit=vertical?H-inset:W-inset-ew;
      if((!vertical&&x+w>limit)||(vertical&&y+h>limit)){if(!nodes.some(n=>n.name==='Tab overflow'))nodes.push({...icon('EllipsisOutlined',vertical?x+side-20:W-inset-20,vertical?H-inset-20:y+(bar-14)/2),name:'Tab overflow'});return;}
      if(card){const corners=vertical?(placement==='end'?[0,radius,radius,0]:[radius,0,0,radius]):placement==='bottom'?[0,0,radius,radius]:[radius,radius,0,0];nodes.push(rect('Tab '+it.key,x,y,w,h,active?'#fff':'#00000005',corners,border));}
      let tx=x+(card?padX+1:vertical?24:customPad?padX:0);if(it.icon){nodes.push(icon(it.icon,tx,y+(h-fs)/2,fs,color));tx+=fs+8;}
      nodes.push({...content(it.label,tx,y+(h-lh)/2,labelWidths[k],lh,color),fontSize:fs,fontWeight:itemStyle.fontWeight||'normal'});
      if(editable&&it.closable!==false)nodes.push(icon('CloseOutlined',x+w-padX-12,y+(h-12)/2,12,muted));
      if(active&&!card){const iw=i.indicatorSize>0?Math.min(i.indicatorSize,w):w,offset=i.indicatorAlign==='end'?w-iw:i.indicatorAlign==='start'?0:(w-iw)/2,th=Number(indicatorStyle.height??2),indicatorColor=indicatorStyle.backgroundColor||indicatorStyle.background||primary;nodes.push(rect('Active tab indicator',vertical?(placement==='end'?x:x+w-th):x+offset,vertical?y:placement==='bottom'?y:y+h-th,vertical?th:iw,vertical?h:th,indicatorColor));}
      if(vertical)y+=h+gap;else x+=w+gap;
    });
    if(editable&&!i.hideAdd&&!vertical){const addX=Math.min(W-inset-bar,x),corners=placement==='bottom'?[0,0,radius,radius]:[radius,radius,0,0];nodes.push(rect('Add tab',addX,y,bar,bar,'#00000005',corners,border));nodes.push(icon(i.addIcon||'PlusOutlined',addX+(bar-14)/2,y+(bar-14)/2,14,fg));}
    if(extraStart)nodes.push({...extraStart,x:inset,y:inset+Math.max(0,(bar-32)/2),width:swButton,height:32});if(extraEnd)nodes.push({...extraEnd,x:W-inset-ewButton,y:inset+Math.max(0,(bar-32)/2),width:ewButton,height:32});
    const contentPad=Number(contentStyle.padding??0),selected=items.find(it=>String(it.key)===activeKey),cx=placement==='start'?inset+side+24+contentPad:inset+contentPad,cy=placement==='top'?inset+bar+16+contentPad:inset+contentPad,cw=Math.max(1,innerW-(vertical?side+24:0)-contentPad*2);
    if(bodyStyle.backgroundColor||bodyStyle.background)nodes.push(rect('Tabs body',vertical?inset+side+24:inset,vertical?inset:placement==='top'?inset+bar+16:inset,vertical?Math.max(1,innerW-side-24):innerW,vertical?innerH:Math.max(1,innerH-bar-16),bodyStyle.backgroundColor||bodyStyle.background));
    if(selected?.children)nodes.push(content(selected.children,cx,cy,cw,22));
    return nodes;
  }
  if(component==='Steps'){
    const vertical=i.orientation==='vertical',small=i.size==='small',inline=i.type==='inline',dot=i.type==='dot'||inline,panel=i.type==='panel',navigation=i.type==='navigation',under=(i.titlePlacement==='vertical'||dot)&&!vertical,current=i.current??0,diameter=inline?6:dot?8:small?24:32,fs=inline?12:small?14:16;
    let visible=items;
    if(i.maxCount>=3&&items.length>i.maxCount){const start=Math.max(1,Math.min(current-1,items.length-i.maxCount+1));visible=[items[0],...items.slice(start,start+i.maxCount-2),items.at(-1)];}
    const headerWidths=visible.map(it=>measure(it.title,fs)+(it.subTitle?measure(it.subTitle)+8:0));
    const bases=visible.map((it,k)=>diameter+8+Math.max(measure(it.content??it.description??''),headerWidths[k]+(k<visible.length-1?(small?8:16):0)));
    const gap=small?12:16,extra=Math.max(0,W-bases.reduce((a,b)=>a+b,0)-gap*(visible.length-1))/Math.max(1,visible.length-1);let cursor=0;
    visible.forEach((it,k)=>{const index=items.indexOf(it),status=it.status||(index<current?'finish':index===current?(i.status||'process'):'wait'),active=status==='process',done=status==='finish',error=status==='error',color=it.disabled?disabled:error?'#ff4d4f':done||active?primary:disabled;
      const width=vertical?W:under||panel||navigation?W/visible.length:bases[k]+(k<visible.length-1?extra:0),x=vertical?0:cursor,y=vertical?cursor:0,d=dot&&!inline&&active?10:diameter,heading=Math.max(d,24),detail=it.content??it.description;
      let ix=x+(under?(width-d)/2:navigation?(width-bases[k])/2:0),iy=y+(inline?11:dot&&!vertical?(active?0:1):navigation?12:0);
      const tx=under?x:panel?x+14:ix+d+(vertical?16:8),ty=under?(inline?25:22):panel?y+14:iy,tw=under?width:Math.max(1,x+width-tx),tc=it.disabled?disabled:error?'#ff4d4f':active||done?fg:muted;
      if(panel){nodes.push(rect('Step panel',x,y,width-2,Math.min(H,74),active?'#e6f4ff':'#fafafa',0));if(k<visible.length-1)nodes.push(icon('RightOutlined',x+width-18,30,14,muted));}
      else{
        if(k<visible.length-1&&!navigation){const rx=vertical?ix+d/2:under?ix+d+4:tx+headerWidths[k]+(small?8:16),ry=vertical?iy+d+6:iy+d/2-.5;
          nodes.push(rect('Step rail',rx,ry,vertical?1:under?Math.max(0,width-d-8):Math.max(0,x+width-rx),vertical?Math.max(0,(detail?heading+22+12:48)-d-12):dot&&!inline?2:1,done?primary:border));}
        if(it.icon)nodes.push(icon(it.icon,ix,iy,d,color));else{nodes.push({...rect('Step icon',ix,iy,d,d,dot?(done||active?primary:disabled):active?primary:done?'#e6f4ff':error?'#fff2f0':'#0000000f',d/2),...(i.variant==='outlined'&&!dot?{fill:'#fff',stroke:color,strokeWidth:1}:{})});if(!dot){if(done||error)nodes.push(icon(done?'CheckOutlined':'CloseOutlined',ix+(d-14)/2,iy+(d-14)/2,14,color));else nodes.push(text('Step number',index+1+(i.initial||0),ix,iy,d,d,active&&i.variant!=='outlined'?'#fff':color,14,'normal','center'));}}
      }
      nodes.push(text('Step title',it.title,tx,ty,under?tw:Math.min(tw,measure(it.title,fs)+1),inline?20:heading,tc,fs,'normal',under?'center':'left'));
      if(it.subTitle)nodes.push(text('Step subtitle',it.subTitle,under?tx:tx+measure(it.title,fs)+8,under?ty+(inline?20:24):ty,under?tw:Math.min(measure(it.subTitle)+1,Math.max(1,tw-measure(it.title,fs)-8)),inline?20:heading,muted,inline?12:14,'normal',under?'center':'left'));
      if(detail&&!inline)nodes.push({...content(detail,tx,ty+heading+(under&&it.subTitle?22:0),tw,22,muted),textAlign:under?'center':'left'});
      if(navigation){nodes.push(rect('Navigation baseline',x,H-2,width,2,active?primary:border));if(k<visible.length-1)nodes.push(icon('RightOutlined',x+width-8,24,16,disabled));}
      if(active&&i.percent>0&&!dot&&!panel)nodes.push(script('Progress',{type:'circle',percent:i.percent,showInfo:false},ix-4,iy-4,d+8,d+8));
      cursor+=vertical?Math.max(48,heading+(detail?22:0)+12):width+(under||panel||navigation?0:gap);
    });return nodes;
  }
  if(component==='Dropdown'){
    const trigger=parse(i.children,null),tw=i.triggerWidth??120,th=i.triggerHeight??32;
    const compactInputs=i.compactPlacement&&i.compactPlacement!=='none'?{compactPlacement:i.compactPlacement,compactOrientation:i.compactOrientation||'horizontal',size:i.size||'middle'}:{};
    const triggerNode=trigger?.type?{...trigger,name:trigger.name||'Dropdown trigger',x:0,y:0,width:tw,height:th}:script('Button',{children:i.label||'Hover me',type:'text',disabled:!!i.disabled,icon:JSON.stringify(icon('DownOutlined',0,0,12)),iconPlacement:'end'},0,0,tw,th);
    if(triggerNode.type==='script'&&triggerNode.scriptUri?.endsWith('/Button.js'))triggerNode.inputs={...(triggerNode.inputs||{}),...compactInputs};
    nodes.push(triggerNode);
    if(i.open&&!i.disabled){const menu=parse(i.menu,{items:[]}),naturalWidth=Math.max(tw,...(menu.items||[]).filter(x=>x.type!=='divider').map(x=>measure(x.label??'')+(x.icon?22:0)+32)),mw=Math.max(i.popupWidth??0,naturalWidth),mh=i.popupHeight??Math.max(40,(menu.items||[]).length*32+8),placement=i.placement||'bottomLeft',top=placement.startsWith('top'),right=placement.endsWith('Right'),side=placement.startsWith('left')||placement.startsWith('right'),px=side?(placement.startsWith('left')?-mw-8:tw+8):right?tw-mw:placement==='top'||placement==='bottom'?(tw-mw)/2:0,py=side?(placement.endsWith('Top')?0:placement.endsWith('Bottom')?th-mh:(th-mh)/2):top?-(mh+8):th+8;
      nodes.push({...rect('Dropdown popup',px,py,mw,mh,'#fff',8),effect:{type:'shadow',shadowType:'outer',color:'#00000026',offset:{x:0,y:6},blur:16}});
      nodes.push(script('Menu',{...menu,items:JSON.stringify(menu.items||[]),selectedKeys:JSON.stringify(menu.selectedKeys||[]),mode:'vertical',dropdownMenu:true},px,py,mw,mh));
      if(i.arrow)nodes.push({...rect('Popup arrow',Math.min(mw-16,tw/2)-4,top?py+mh-4:py-4,8,8,'#fff'),rotation:45});
    }return nodes;
  }
  return nodes;
}
