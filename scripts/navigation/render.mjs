// Canvas renderers use the public Ant Design 6 props. Events remain React behavior.
export function renderNavigation(component, i, W, H, metrics) {
  const nodes = [], primary=i.primaryColor||'#1677ff', fg='#000000e0', muted='#00000073', disabled='#00000040', border='#f0f0f0';
  const parse=(v,f)=>{if(typeof v!=='string')return v??f;try{return JSON.parse(v)}catch{return f}};
  const measure=(s,size=14)=>{let w=0,p='';for(const c of String(s??'')){w+=(metrics.widths[c]??(c.codePointAt(0)>255?1:.6))+(metrics.pairs[p+c]||0);p=c;}return Math.ceil(w*size)};
  const measureExact=(s,size=14)=>{let w=0,p='';for(const c of String(s??'')){w+=(metrics.widths[c]??(c.codePointAt(0)>255?1:.6))+(metrics.pairs[p+c]||0);p=c;}return w*size};
  const text=(name,s,x,y,w,h=22,color=fg,size=14,weight='normal',align='left')=>({type:'text',name,content:String(s??''),x,y,width:Math.max(1,w),height:h,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,lineHeight:1.5714286,fontWeight:weight,fill:color,textAlign:align,textAlignVertical:'middle'});
  const rect=(name,x,y,w,h,fill,r=0,stroke,sw=1)=>({type:'rectangle',name,x,y,width:Math.max(0,w),height:Math.max(0,h),fill,cornerRadius:r,...(stroke?{stroke,strokeWidth:sw,strokeAlignment:'inner'}:{})});
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
    const horizontal=i.mode==='horizontal',vertical=i.mode==='vertical',dark=i.theme==='dark',collapsed=!!i.inlineCollapsed,selected=parse(i.selectedKeys,[]),open=parse(i.openKeys,[]),styles=parse(i.styles,{})||{},rootStyle=styles.root||{},itemStyle=styles.item||{},itemTitleStyle=styles.itemTitle||{},itemIconStyle=styles.itemIcon||{},itemContentStyle=styles.itemContent||{},classNames=parse(i.classNames,{})||{},base=dark?'#ffffffa6':(itemStyle.color||fg);
    const rootPad=Number(rootStyle.padding??0),rootBorder=Number(rootStyle.borderWidth??(rootStyle.border?1:0)),rootR=Number(rootStyle.borderRadius??0);
    const borderMatch=String(rootStyle.border||'').match(/#[0-9a-f]{3,8}|rgba?\([^)]+\)/i),rootBorderColor=rootStyle.borderColor||(borderMatch?borderMatch[0]:(rootBorder?border:undefined));
    const bg=rootStyle.backgroundColor||rootStyle.background||(dark?'#001529':'#ffffff');
    const openItem=!collapsed?items.find(it=>it.children&&open.includes(String(it.key))):null;
    const submenuW=i.dropdownMenu?(Number(i.submenuWidth)||160):160;
    const rootW=vertical&&openItem?(i.dropdownMenu?Math.min(Number(i.rootWidth)||(W-submenuW+4),W):Math.min(256,W-164)):W;
    const popupPlacement=i.popupPlacement||openItem?.popupPlacement||'rightTop';
    const isRightBottom=vertical&&openItem&&popupPlacement==='rightBottom';
    const popupH=openItem?(openItem.children.length*40+8):0;
    const openIdx=openItem?Math.max(0,items.findIndex(it=>it.key===openItem.key)):0;
    const itemPadding=String(itemStyle.padding||'').match(/([\d.]+)px(?:\s+([\d.]+)px)?/),dropdownPadY=itemPadding?Number(itemPadding[1]):5,dropdownPadX=itemPadding?Number(itemPadding[2]??itemPadding[1]):12,dropdownItemHeight=itemPadding?22+dropdownPadY*2:32;
    const dropdownSpan=item=>item.type==='divider'?9:item.type==='group'?32+(item.children||[]).reduce((sum,child)=>sum+dropdownSpan(child),0):dropdownItemHeight;
    const dropdownOpenY=4+items.slice(0,openIdx).reduce((sum,item)=>sum+dropdownSpan(item),0);
    const triggerY=openIdx*44+4;
    const triggerBottom=triggerY+40;
    const rawPopupY=triggerBottom-popupH;
    const menuOffsetY=isRightBottom?Math.max(0,-rawPopupY):0;
    const menuH=isRightBottom?(H-menuOffsetY):horizontal?46:H;
    const menuSurface=rect('Menu surface',0,menuOffsetY,rootW,menuH,bg,rootR,rootBorderColor,rootBorder||1);
    if(i.dropdownMenu&&openItem)menuSurface.effect={type:'shadow',shadowType:'outer',color:'#00000026',offset:{x:0,y:6},blur:16};
    nodes.push(menuSurface);
    if(horizontal)nodes.push(rect('Menu border',0,45,W,1,dark?'rgba(255,255,255,0.12)':border));else if(!dark&&!i.dropdownMenu&&!rootBorderColor)nodes.push(rect('Menu border',rootW-1,menuOffsetY,1,menuH,border));
    let x=rootPad,y=(i.dropdownMenu?4:rootPad)+menuOffsetY,openItemX=rootPad;
    const containsSelected=item=>selected.includes(String(item.key))||(item.children||[]).some(containsSelected);
    const visibleHeight=list=>(list||[]).reduce((sum,item)=>sum+(item.type==='divider'?5:item.type==='group'?42+visibleHeight(item.children):44+(item.children&&open.includes(String(item.key))&&!vertical?visibleHeight(item.children)+4:0)),0);
    function draw(list,depth=0){for(const item of list){
      if(item.type==='divider'){nodes.push(rect('Menu divider',i.dropdownMenu?4:rootPad,y+4,i.dropdownMenu?rootW-8:rootW-rootPad*2-1,1,dark?'rgba(255,255,255,0.12)':border));y+=i.dropdownMenu?9:5;continue;}
      if(item.type==='group'){if(i.dropdownMenu){nodes.push(text('Group label',item.label,12,y,rootW-24,32,dark?'#ffffff73':muted));y+=32;}else{nodes.push(text('Group label',item.label,16+depth*16+rootPad,y+12,rootW-32-depth*16-rootPad*2,22,dark?'#ffffff73':muted));y+=42;}draw(item.children||[],depth);continue;}
      const active=selected.includes(String(item.key)),selectedBranch=containsSelected(item),isOpen=open.includes(String(item.key)),color=item.disabled?disabled:(active||item.children&&selectedBranch)?(dark?'#ffffff':primary):item.danger?'#ff4d4f':(itemStyle.color||base);
      const title=item.label??item.title??'',hasIcon=!!item.icon,labelWidth=horizontal?measureExact(title):measure(title)+1,iconGap=Number(itemIconStyle.marginInlineEnd??10),iconSpace=hasIcon?14+iconGap:0,left=collapsed?(rootW-16)/2:horizontal?16:(i.dropdownMenu?dropdownPadX:24)+depth*(i.inlineIndent??24),height=horizontal?46:i.dropdownMenu?dropdownItemHeight:40,width=horizontal?32+iconSpace+labelWidth:rootW-rootPad*2-(i.dropdownMenu||dark?8:9),px=horizontal?x:4+rootPad,py=horizontal?0:y+(i.dropdownMenu?0:4);
      if(openItem&&String(item.key)===String(openItem.key))openItemX=x;
      if(active&&!horizontal)nodes.push(rect('Selected menu item',px,py,width,height,dark?primary:'#e6f4ff',8));
      if(hasIcon)nodes.push(icon(item.icon,px+left,py+(height-14)/2,14,itemIconStyle.color||color));
      if(!collapsed){
        const tx=px+left+iconSpace,tw=horizontal?labelWidth:Math.max(1,width-left-iconSpace-(item.children?24:i.dropdownMenu?12:16));
        const titleNode=content(title,tx,py+(height-22)/2,tw,22,color);
        if(titleNode.type==='text'){
          if(itemTitleStyle.fontWeight!==undefined)titleNode.fontWeight=String(itemTitleStyle.fontWeight);
          if(itemStyle.fontSize!==undefined)titleNode.fontSize=Number(String(itemStyle.fontSize).replace('px',''))||14;
          if(itemContentStyle.backgroundColor&&itemContentStyle.backgroundColor!=='transparent')titleNode.fill=itemContentStyle.color||color;
        }
        nodes.push(titleNode);
        if(item.extra&&!horizontal){
          const extraW=measureExact(item.extra,12);
          nodes.push(text('Menu item extra',item.extra,rootW-rootPad-extraW-12,py+(height-20)/2,extraW,20,muted,12,'normal','right'));
        }
        if(item.children&&!horizontal){
          const arrowIcon=vertical?'RightOutlined':(isOpen?'UpOutlined':'DownOutlined');
          nodes.push(icon(arrowIcon,rootW-rootPad-30,py+(height-10)/2,10,color));
        }
      }
      if((active||(isOpen&&!dark))&&horizontal)nodes.push(rect('Selected menu underline',x+16,44,width-32,2,primary));
      if(horizontal)x+=width;else{
        y+=height+(i.dropdownMenu?0:4);
        if(item.children&&isOpen&&!collapsed&&!vertical){
          nodes.push(rect('Inline submenu surface',rootPad,y+4,rootW-rootPad*2-1,visibleHeight(item.children),dark?'#000c17':'#00000005'));
          draw(item.children,depth+1);
          y+=4;
        }
      }
    }}draw(items);
    if(openItem&&vertical){
      const popupTheme=openItem.theme||(dark?'dark':'light');
      const popupDark=popupTheme==='dark';
      const popupW=submenuW;
      const subItemH=i.dropdownMenu?32:40;
      const popupH=openItem?(openItem.children.length*subItemH+8):0;
      const popupY=isRightBottom?(menuOffsetY+rawPopupY):(i.dropdownMenu?dropdownOpenY:openIdx*44+4);
      const popupX=i.dropdownMenu?rootW-4:rootW+4;
      nodes.push({...rect('Vertical popup surface',popupX,popupY,popupW,popupH,popupDark?'#001529':'#ffffff',8,'#0000000f',1),effect:{type:'shadow',shadowType:'outer',color:'#00000026',offset:{x:0,y:6},blur:16}});
      let py=popupY+4;
      for(const sub of openItem.children){
        const subActive=selected.includes(String(sub.key));
        const subColor=sub.disabled?disabled:subActive?(popupDark?'#ffffff':primary):(popupDark?'#ffffffa6':fg);
        const curH=i.dropdownMenu?32:36;
        if(subActive)nodes.push(rect('Selected popup item',popupX+4,py,popupW-8,curH,popupDark?primary:'#e6f4ff',6));
        nodes.push(text('Popup item label',sub.label||sub.title,popupX+12,py+(curH-22)/2,popupW-24,22,subColor));
        py+=subItemH;
      }
    } else if(openItem&&horizontal){
      if(i.popupRender){
        const popupW=Math.min(620,W>100?W:620);
        const popupX=Math.max(0,Math.min(openItemX,W-popupW));
        const popupY=48;
        const colW=Math.floor((popupW-48-24)/2);
        const col1X=popupX+24;
        const col2X=col1X+colW+24;
        const children=openItem.children||[];
        const rowCount=Math.ceil(children.length/2);
        const rowH=42;
        const rowGap=16;
        const customPopupH=200;
        nodes.push({...rect('Custom popup surface',popupX,popupY,popupW,customPopupH,'#ffffff',8,'#0000000f',1),effect:{type:'shadow',shadowType:'outer',color:'#0000001f',offset:{x:0,y:6},blur:16}});
        nodes.push(text('Popup title',openItem.label||openItem.title,popupX+24,popupY+18,popupW-48,26,'#000000e0',18,'700'));
        nodes.push(rect('Popup divider',popupX+24,popupY+52,popupW-48,1,'#0505050f'));
        let curY=popupY+64;
        for(let r=0;r<rowCount;r++){
          const it1=children[r*2],it2=children[r*2+1];
          if(it1){
            const t1=it1.title||it1.label||'',d1=it1.description||'';
            nodes.push(text('Popup item title',t1,col1X,curY,colW,20,'#000000e0',14,'600'));
            if(d1)nodes.push(text('Popup item desc',d1,col1X,curY+22,colW,20,'#00000073',13,'normal'));
          }
          if(it2){
            const t2=it2.title||it2.label||'',d2=it2.description||'';
            nodes.push(text('Popup item title',t2,col2X,curY,colW,20,'#000000e0',14,'600'));
            if(d2)nodes.push(text('Popup item desc',d2,col2X,curY+22,colW,20,'#00000073',13,'normal'));
          }
          curY+=rowH+rowGap;
        }
      } else {
        const popupW=160;
        const popupX=Math.max(0,openItemX);
        const popupY=48;
        const popupH=openItem.children.length*40+8;
        nodes.push({...rect('Horizontal popup surface',popupX,popupY,popupW,popupH,dark?'#001529':'#ffffff',8,'#0000000f',1),effect:{type:'shadow',shadowType:'outer',color:'#00000026',offset:{x:0,y:6},blur:16}});
        let py=popupY+4;
        for(const sub of openItem.children){
          const subActive=selected.includes(String(sub.key));
          const subColor=sub.disabled?disabled:subActive?(dark?'#ffffff':primary):(dark?'#ffffffa6':fg);
          if(subActive)nodes.push(rect('Selected popup item',popupX+4,py,popupW-8,36,dark?primary:'#e6f4ff',6));
          nodes.push(text('Popup item label',sub.label||sub.title,popupX+16,py+7,popupW-32,22,subColor));
          py+=40;
        }
      }
    }
    return nodes;
  }
  if(component==='Pagination'){
    const styles=parse(i.styles,{})||{},rootStyle=styles.root||{},itemStyle=styles.item||{},classNames=parse(i.classNames,{})||{};
    const rootPad=Number(rootStyle.padding??(classNames.root?8:0)),rootBorder=Number(rootStyle.borderWidth??(classNames.root?2:0));
    const dashed=rootStyle.borderStyle==='dashed'||!!classNames.root,rootColor=rootStyle.borderColor||'#d9d9d9';
    if(Object.keys(rootStyle).length||classNames.root){
      if(rootStyle.backgroundColor||rootStyle.background)nodes.push(rect('Pagination root bg',0,0,W,H,rootStyle.backgroundColor||rootStyle.background,Number(rootStyle.borderRadius??6)));
      if(dashed&&rootBorder){
        const dash=6,gapDash=4;
        for(let q=0;q<W;q+=dash+gapDash){nodes.push(rect('Root border top',q,0,Math.min(dash,W-q),rootBorder,rootColor));nodes.push(rect('Root border bottom',q,H-rootBorder,Math.min(dash,W-q),rootBorder,rootColor));}
        for(let q=0;q<H;q+=dash+gapDash){nodes.push(rect('Root border start',0,q,rootBorder,Math.min(dash,H-q),rootColor));nodes.push(rect('Root border end',W-rootBorder,q,rootBorder,Math.min(dash,H-q),rootColor));}
      }else if(rootBorder)nodes.push(rect('Pagination root',0,0,W,H,'#00000000',Number(rootStyle.borderRadius??6),rootColor));
    }
    const inset=rootPad+rootBorder;
    const size=i.size==='small'?24:i.size==='large'?40:32,gap=i.size==='small'?4:i.size==='large'?12:8,total=Math.max(0,i.total??50),pageSize=Math.max(1,i.pageSize??10),pages=Math.max(1,Math.ceil(total/pageSize)),current=Math.min(pages,Math.max(1,i.current??1));let x=inset;
    const itemY=Math.max(inset,Math.round((H-size)/2));
    const color=i.disabled?disabled:fg;
    if(i.hideOnSinglePage&&pages===1)return nodes;
    if(i.showTotal){const label=i.showTotal==='range'?`${(current-1)*pageSize+1}-${Math.min(current*pageSize,total)} of ${total} items`:`Total ${total} items`;nodes.push(text('Total',label,x,itemY,measure(label),size,color));x+=measure(label)+8;}
    function arrow(name,inactive,label){const w=label?measure(label)+8:size;if(label)nodes.push(text(name,label,x,itemY,w,size,inactive||i.disabled?disabled:primary));else nodes.push(icon(name,x+(size-12)/2,itemY+(size-12)/2,12,inactive||i.disabled?disabled:color));x+=w+gap;}
    arrow('LeftOutlined',current===1,i.previousLabel);
    if(i.simple){
      const slashWidth=measureExact('/'),pageWidth=measureExact(String(pages));
      if(i.readOnly){
        const currentWidth=measureExact(String(current));
        nodes.push(text('Current page',current,x,itemY,currentWidth,size,color,14,'normal','center'));
        nodes.push(text('Simple slash','/',x+currentWidth+12,itemY,slashWidth,size,color));
        nodes.push(text('Page count',pages,x+currentWidth+24+slashWidth,itemY,pageWidth,size,color));
        x+=currentWidth+slashWidth+pageWidth+44;
      }else{
        nodes.push(script('Input',{value:String(current),placeholder:'',disabled:!!i.disabled,size:i.size==='small'?'small':i.size==='large'?'large':'middle',allowClear:false,textAlign:'center'},x,itemY,50,size));
        nodes.push(text('Simple slash','/',x+62,itemY,slashWidth,size,color));
        nodes.push(text('Page count',pages,x+74+slashWidth,itemY,pageWidth,size,color));
        x+=82+slashWidth+pageWidth;
      }
    }else{
      let list=[];const buffer=i.showLessItems?1:2;
      if(pages<=5+buffer*2)list=Array.from({length:pages},(_,k)=>k+1);
      else{let left=Math.max(1,current-buffer),right=Math.min(pages,current+buffer);if(current<=1+buffer)right=1+buffer*2;if(current>=pages-buffer)left=pages-buffer*2;list=[...Array.from({length:right-left+1},(_,k)=>left+k)];if(left>1)list.unshift(...(left>2?[1,'previous']:[1]));if(right<pages)list.push(...(right<pages-1?['next',pages]:[pages]));}
      const itemR=Number(itemStyle.borderRadius??(i.size==='small'?4:6));
      const itemBg=itemStyle.backgroundColor||itemStyle.background;
      for(const p of list){
        if(typeof p!=='number')nodes.push({...icon('EllipsisOutlined',x+(size-Math.min(24,size))/2,itemY+(size-Math.min(24,size))/2,Math.min(24,size),disabled),name:'Jump '+p});
        else{
          const active=p===current;
          nodes.push(rect('Page '+p,x,itemY,size,size,i.disabled&&active?'#0000000f':itemBg||(active?'#fff':'#00000000'),itemR,active&&!i.disabled?primary:undefined));
          nodes.push(text('Page label',p,x,itemY,size,size,i.disabled?disabled:active?primary:fg,14,active?'600':'normal','center'));
        }
        x+=size+gap;
      }
    }
    arrow('RightOutlined',current===pages,i.nextLabel);
    const showSizeChanger = Boolean(i.showSizeChanger || (!i.simple && total > 50));
    if(showSizeChanger){
      x+=8;
      if(i.customSizeChanger==='InputNumber'){
        nodes.push(script('InputNumber',{value:pageSize,min:1,disabled:!!i.disabled,size:i.size||'middle'},x,itemY,100,size));
        x+=108;
      }else{
        const label=pageSize+' / page',w=measureExact(label)+42;
        nodes.push(script('Select',{value:label,options:'10 / page|20 / page|50 / page|100 / page',disabled:!!i.disabled,size:i.size||'middle',allowClear:false},x,itemY,w,size));
        x+=w+8;
      }
    }
    if(i.showQuickJumper){
      const prefix='Go to',prefixWidth=measureExact(prefix),prefixX=x+(showSizeChanger?0:8);
      nodes.push(text('Jump prompt',prefix,prefixX,itemY,prefixWidth,size,color));
      x=prefixX+prefixWidth+8;
      nodes.push(script('Input',{value:'',placeholder:'',disabled:!!i.disabled,size:i.size==='small'?'small':i.size==='large'?'large':'middle',allowClear:false},x,itemY,50,size));
      x+=58;
      nodes.push(text('Jump suffix','Page',x,itemY,measureExact('Page'),size,color));
      x+=measureExact('Page');
    }
    const used=Math.max(0,...nodes.filter(n=>!n.name?.startsWith('Root border')&&n.name!=='Pagination root bg').map(n=>n.x+n.width));
    const offset=i.align==='center'?(W-used)/2:i.align==='end'?W-used-inset:0;
    if(offset>0)for(const n of nodes){if(!n.name?.startsWith('Root border')&&n.name!=='Pagination root bg')n.x+=offset;}
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
    const styles=parse(i.styles,{})||{},rootStyle=styles.root||{},itemIconStyle=styles.itemIcon||{},itemContentStyle=styles.itemContent||{},itemTitleStyle=styles.itemTitle||{},classNames=parse(i.classNames,{})||{};
    const vertical=i.orientation==='vertical',small=i.size==='small',inline=i.type==='inline',dot=i.type==='dot'||inline,panel=i.type==='panel',navigation=i.type==='navigation',under=(i.titlePlacement==='vertical'||(dot&&!vertical))&&!vertical,current=i.current??0,diameter=inline?6:dot?8:small?24:32,fs=inline?12:small?14:16;
    if(Object.keys(rootStyle).length||classNames.root){
      const rootBorder=Number(rootStyle.borderWidth??2),rootColor=rootStyle.borderColor||(classNames.root?'#d9d9d9':'#f0f0f0'),dashed=rootStyle.borderStyle==='dashed'||!!classNames.root;
      if(dashed){const dash=6,gapDash=4;for(let q=0;q<W;q+=dash+gapDash){nodes.push(rect('Root border top',q,0,Math.min(dash,W-q),rootBorder,rootColor));nodes.push(rect('Root border bottom',q,H-rootBorder,Math.min(dash,W-q),rootBorder,rootColor));}for(let q=0;q<H;q+=dash+gapDash){nodes.push(rect('Root border start',0,q,rootBorder,Math.min(dash,H-q),rootColor));nodes.push(rect('Root border end',W-rootBorder,q,rootBorder,Math.min(dash,H-q),rootColor));}}
      else nodes.push(rect('Steps root',0,0,W,H,rootStyle.backgroundColor||'#00000000',Number(rootStyle.borderRadius??6),rootColor));
    }
    let visible=items.map((it,idx)=>({...it,__originIndex:idx}));
    if(i.maxCount>=3&&items.length>i.maxCount){
      const total=items.length;
      const safeCurrent=Math.min(Math.max(current,0),total-1);
      const targetCount=Math.min(i.maxCount,total);
      const indexes=new Set([0,safeCurrent,total-1]);
      for(let distance=1;indexes.size<targetCount&&distance<total;distance+=1){
        const candidates=[safeCurrent-distance,safeCurrent+distance,distance,total-1-distance];
        for(const index of candidates){
          if(indexes.size>=targetCount) break;
          if(index>=0&&index<total) indexes.add(index);
        }
      }
      const sorted=Array.from(indexes).sort((a,b)=>a-b);
      const collapsedIndexes=sorted.flatMap((index,order,sortedIndexes)=>
        order>0&&index-sortedIndexes[order-1]>1?[null,index]:[index]
      );
      visible=collapsedIndexes.map((idx,pos)=>{
        if(idx===null){
          const prevIdx=collapsedIndexes[pos-1];
          const nextIdx=collapsedIndexes[pos+1];
          const hasError=items.slice(prevIdx+1,nextIdx).some(step=>step.status==='error');
          const ellipsisStatus=hasError?'error':(nextIdx-1<current?'finish':'wait');
          return{
            title:'',
            icon:'EllipsisOutlined',
            status:ellipsisStatus,
            disabled:true,
            isEllipsis:true,
            __originIndex:-1
          };
        }
        return{...items[idx],__originIndex:idx};
      });
    }
    const N=visible.length;
    if(!N) return nodes;

    const itemMetrics=visible.map((it,k)=>{
      const index=it.__originIndex!==undefined&&it.__originIndex>=0?it.__originIndex:k;
      const status=it.status||(index<current?'finish':index===current?(i.status||'process'):'wait');
      const active=status==='process',done=status==='finish',error=status==='error',wait=status==='wait';
      const detail=it.content??it.description;
      const tw=it.title?Math.ceil(measure(it.title,fs)*1.08+4):0;
      const stw=it.subTitle?Math.ceil(measure(it.subTitle,14)*1.05+4):0;
      const dw=detail?Math.ceil(measure(detail,14)*1.05+4):0;
      const rawTw=it.title?measureExact(it.title,fs):0,rawStw=it.subTitle?measureExact(it.subTitle,14):0,rawDw=detail?measureExact(detail,14):0;
      return{it,index,status,active,done,error,wait,detail,tw,stw,dw,rawTw,rawStw,rawDw,isEllipsis:!!it.isEllipsis};
    });

    if(panel){
      const isOutlined=i.variant==='outlined';
      const panelH=H;
      const arrowW=small?20:26;
      const r=small?4:6;
      const midY=panelH/2;
      const getX=k=>Math.round(k*(W/N));

      const stepStyles=itemMetrics.map(m=>{
        const active=m.active;
        const error=m.error;
        const done=m.done;
        let bg='#0000000a',borderC='#d9d9d9',titleC=muted,subTitleC=muted,descC=muted;
        if(isOutlined){
          if(error){bg='#ffffff';borderC='#ff4d4f';titleC='#ff4d4f';subTitleC='#ff4d4f';descC='#ff4d4f';}
          else if(active){bg='#e6f4ff';borderC=primary;titleC=primary;subTitleC=primary;descC=primary;}
          else if(done){bg='#ffffff';borderC=primary;titleC=primary;subTitleC=primary;descC=primary;}
          else{bg='#ffffff';borderC='#d9d9d9';titleC=muted;subTitleC=muted;descC=muted;}
        } else {
          if(error){bg='#fff2f0';borderC='#ff4d4f';titleC='#ff4d4f';subTitleC='#ff4d4f';descC='#ff4d4f';}
          else if(active){bg=primary;borderC=primary;titleC='#ffffff';subTitleC='#ffffffa6';descC='#ffffffd9';}
          else if(done){bg='#e6f4ff';borderC=primary;titleC=primary;subTitleC=primary;descC=primary;}
          else{bg='#0000000a';borderC='transparent';titleC=muted;subTitleC=muted;descC=muted;}
        }
        return{active,error,done,bg,borderC,titleC,subTitleC,descC};
      });

      // 1. Draw backgrounds (each step is a single unified closed path: no seams, true rounded corners)
      itemMetrics.forEach((m,k)=>{
        const s=stepStyles[k];
        const x0=getX(k), x1=getX(k+1);
        let geom='';
        if(N===1){
          geom=`M 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 L ${W-r} 0 A ${r} ${r} 0 0 1 ${W} ${r} L ${W} ${panelH-r} A ${r} ${r} 0 0 1 ${W-r} ${panelH} L ${r} ${panelH} A ${r} ${r} 0 0 1 0 ${panelH-r} Z`;
        } else if(k===0){
          geom=`M 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 L ${x1} 0 L ${x1+arrowW} ${midY} L ${x1} ${panelH} L ${r} ${panelH} A ${r} ${r} 0 0 1 0 ${panelH-r} Z`;
        } else if(k===N-1){
          geom=`M ${x0} 0 L ${W-r} 0 A ${r} ${r} 0 0 1 ${W} ${r} L ${W} ${panelH-r} A ${r} ${r} 0 0 1 ${W-r} ${panelH} L ${x0} ${panelH} L ${x0+arrowW} ${midY} Z`;
        } else {
          geom=`M ${x0} 0 L ${x1} 0 L ${x1+arrowW} ${midY} L ${x1} ${panelH} L ${x0} ${panelH} L ${x0+arrowW} ${midY} Z`;
        }
        nodes.push({
          type:'path',
          name:'Step panel bg '+k,
          x:0,
          y:0,
          width:W,
          height:panelH,
          viewBox:[0,0,W,panelH],
          geometry:geom,
          fill:s.bg
        });
      });

      // 2. Draw borders for outlined mode (continuous strokes that never extend past vertices)
      if(isOutlined){
        itemMetrics.forEach((m,k)=>{
          const s=stepStyles[k];
          const x0=getX(k), x1=getX(k+1);
          let strokeGeom='';
          if(N===1){
            strokeGeom=`M 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 L ${W-r} 0 A ${r} ${r} 0 0 1 ${W} ${r} L ${W} ${panelH-r} A ${r} ${r} 0 0 1 ${W-r} ${panelH} L ${r} ${panelH} A ${r} ${r} 0 0 1 0 ${panelH-r} Z`;
          } else if(k===0){
            strokeGeom=`M 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 L ${x1} 0 L ${x1+arrowW} ${midY} L ${x1} ${panelH} L ${r} ${panelH} A ${r} ${r} 0 0 1 0 ${panelH-r} Z`;
          } else if(k===N-1){
            strokeGeom=`M ${x0} 0 L ${W-r} 0 A ${r} ${r} 0 0 1 ${W} ${r} L ${W} ${panelH-r} A ${r} ${r} 0 0 1 ${W-r} ${panelH} L ${x0} ${panelH}`;
          } else {
            strokeGeom=`M ${x0} 0 L ${x1} 0 L ${x1+arrowW} ${midY} L ${x1} ${panelH} L ${x0} ${panelH}`;
          }
          nodes.push({
            type:'path',
            name:'Step panel border '+k,
            x:0,
            y:0,
            width:W,
            height:panelH,
            viewBox:[0,0,W,panelH],
            geometry:strokeGeom,
            fill:'transparent',
            stroke:s.borderC,
            strokeWidth:1
          });
        });
      }

      // 3. Draw texts
      itemMetrics.forEach((m,k)=>{
        const x0=getX(k), x1=getX(k+1);
        const itemW=x1-x0;
        const it=m.it;
        const s=stepStyles[k];
        const detail=m.detail;
        const tx=k===0?x0+(small?12:16):x0+arrowW+(small?12:16);
        const maxTw=Math.max(1,itemW-(k===0?0:arrowW)-(small?16:24));
        const ty=(panelH-(detail?(small?36:42):22))/2;
        const titleWeight=itemTitleStyle.fontWeight||(s.active?'600':'normal');

        nodes.push(text('Step title',it.title,tx,ty,Math.min(m.tw,maxTw),small?22:24,s.titleC,small?14:16,titleWeight,'left'));
        if(it.subTitle){
          nodes.push(text('Step subtitle',it.subTitle,tx+m.tw+8,ty,m.stw,small?22:24,s.subTitleC,small?12:14,'normal','left'));
        }
        if(detail){
          nodes.push(text('Step content',detail,tx,ty+(small?18:22),maxTw,20,s.descC,small?12:14,'normal','left'));
        }
      });

      return nodes;
    }

    let itemWidths=[];
    if(vertical){
      itemWidths=visible.map(()=>W);
    } else if(under||navigation){
      itemWidths=visible.map(()=>W/Math.max(1,N));
    } else {
      const itemGap=small?12:16,titleRailGap=small?8:16;
      const intrinsicWidth=(m,isLast)=>diameter+8+Math.max(m.rawTw+(m.rawStw?8+m.rawStw:0)+(isLast?0:titleRailGap),m.rawDw);
      const lastW=intrinsicWidth(itemMetrics[N-1],true);
      const avail=Math.max(0,W-lastW-itemGap*Math.max(0,N-1));
      if(N>1){
        const flexBasis=itemMetrics.slice(0,N-1).map(m=>intrinsicWidth(m,false)),sumBasis=flexBasis.reduce((a,b)=>a+b,0);
        const extraW=Math.max(0,avail-sumBasis)/(N-1);
        itemWidths=[...flexBasis.map(basis=>basis+extraW),lastW];
      } else {
        itemWidths=[W];
      }
    }

    let cursor=0;
    itemMetrics.forEach((m,k)=>{
      const it=m.it,isLast=k===N-1;
      const index=m.index,status=m.status,active=m.active,done=m.done,error=m.error,wait=m.wait;
      const color=m.isEllipsis?(error?'#ff4d4f':done?primary:disabled):(it.disabled?disabled:error?'#ff4d4f':done||active?primary:disabled);
      const width=itemWidths[k];
      const x=vertical?0:under||panel||navigation?k*(W/N):cursor;
      const y=vertical?cursor:0;
      const d=dot&&!inline&&active?10:diameter;
      const detail=m.detail;
      const tw=m.tw,stw=m.stw,dw=m.dw;
      const tc=it.disabled?disabled:error?'#ff4d4f':active||done?fg:muted;
      const isOutlined=i.variant==='outlined';

      // Status of NEXT item to determine rail color (official spec: rail into error is RED)
      const nextM=k<N-1?itemMetrics[k+1]:null;
      const railColor=nextM?.error?'#ff4d4f':done?primary:border;

      function renderStepIcon(ix,iy){
        if(it.icon){
          const isz=m.isEllipsis?(small?14:18):(small?18:24);
          nodes.push(icon(it.icon,ix+(d-isz)/2,iy+(d-isz)/2,isz,color));
          return;
        }
        const customRadius=itemIconStyle.borderRadius?(String(itemIconStyle.borderRadius).includes('%')?d*0.3:Number(itemIconStyle.borderRadius)):d/2;
        if(isOutlined){
          if(done){
            nodes.push(rect('Step icon',ix,iy,d,d,'#ffffff',customRadius,primary));
            nodes.push(icon('CheckOutlined',ix+(d-14)/2,iy+(d-14)/2,small?12:14,primary));
          } else if(error){
            nodes.push(rect('Step icon',ix,iy,d,d,'#ffffff',customRadius,'#ff4d4f'));
            nodes.push(icon('CloseOutlined',ix+(d-14)/2,iy+(d-14)/2,small?12:14,'#ff4d4f'));
          } else if(active){
            nodes.push(rect('Step icon',ix,iy,d,d,'#ffffff',customRadius,primary));
            nodes.push(text('Step number',index+1+(i.initial||0),ix,iy,d,d,primary,small?12:14,'normal','center'));
          } else {
            nodes.push(rect('Step icon',ix,iy,d,d,'#ffffff',customRadius,'#d9d9d9'));
            nodes.push(text('Step number',index+1+(i.initial||0),ix,iy,d,d,disabled,small?12:14,'normal','center'));
          }
        } else {
          // Ant Design v6 official Filled variant (default)
          if(done){
            nodes.push(rect('Step icon',ix,iy,d,d,'#e6f4ff',customRadius));
            nodes.push(icon('CheckOutlined',ix+(d-14)/2,iy+(d-14)/2,small?12:14,primary));
          } else if(error){
            nodes.push(rect('Step icon',ix,iy,d,d,'#ff4d4f',customRadius));
            nodes.push(icon('CloseOutlined',ix+(d-14)/2,iy+(d-14)/2,small?12:14,'#ffffff'));
          } else if(active){
            nodes.push(rect('Step icon',ix,iy,d,d,primary,customRadius));
            nodes.push(text('Step number',index+1+(i.initial||0),ix,iy,d,d,'#ffffff',small?12:14,'normal','center'));
          } else {
            nodes.push(rect('Step icon',ix,iy,d,d,'#0000000a',customRadius));
            nodes.push(text('Step number',index+1+(i.initial||0),ix,iy,d,d,muted,small?12:14,'normal','center'));
          }
        }
      }

      if(navigation){
        const itemW=width;
        const isCurrent=index===current;
        if(isCurrent) nodes.push(rect('Navigation active underline',x,H-2,itemW,2,primary));
        if(!isLast) nodes.push(icon('RightOutlined',x+itemW-14,(H-12)/2,12,disabled));
        const contentW=d+8+tw+(it.subTitle?stw+8:0);
        const iy=detail?12:(H-d)/2;
        const ix=x+Math.max(8,(itemW-contentW)/2);
        renderStepIcon(ix,iy);
        const tx=ix+d+8, ty=detail?12:(H-24)/2;
        const titleWeight=itemTitleStyle.fontWeight||(active?'600':'normal');
        nodes.push(text('Step title',it.title,tx,ty,tw,24,tc,fs,titleWeight,'left'));
        if(it.subTitle) nodes.push(text('Step subtitle',it.subTitle,tx+tw+8,detail?12:(H-22)/2,stw,22,muted,14,'normal','left'));
        if(detail) nodes.push(text('Step content',detail,tx,ty+24,Math.max(1,itemW-(tx-x)-16),22,muted,14,'normal','left'));
      }
      else if(under){
        const ix=x+(width-d)/2, iy=inline?8:dot?12:0;
        if(!isLast){
          const rx=ix+d+(inline?4:8);
          const nextIx=(x+width)+(width-d)/2;
          const rw=Math.max(0,(nextIx-(inline?4:8))-rx);
          const ry=inline?iy+d/2-0.5:dot?15.5:(d/2-0.5);
          if(rw>0) nodes.push(rect('Step rail',rx,ry,rw,inline?1:dot?2:1,railColor));
        }
        if(dot){
          if(isOutlined){
            nodes.push(rect('Step dot',ix,iy,d,d,'#ffffff',d/2,error?'#ff4d4f':done||active?primary:disabled,2));
          } else {
            nodes.push(rect('Step dot',ix,iy,d,d,error?'#ff4d4f':done||active?primary:'#00000040',d/2));
          }
        } else {
          renderStepIcon(ix,iy);
        }
        if(active&&i.percent>0&&!dot&&!panel) nodes.push(script('Progress',{type:'circle',percent:i.percent,showInfo:false},ix-4,iy-4,d+8,d+8));
        const ty=inline?iy+d+6:iy+d+(dot?12:10);
        const titleX=x+(width-tw)/2;
        const titleWeight=itemTitleStyle.fontWeight||(inline?'normal':active?'600':'normal');
        nodes.push(text('Step title',it.title,titleX,ty,tw,inline?20:24,tc,fs,titleWeight,'center'));
        let nextY=ty+(inline?20:24);
        if(it.subTitle){
          const subX=x+(width-stw)/2;
          nodes.push(text('Step subtitle',it.subTitle,subX,nextY,stw,22,muted,14,'normal','center'));
          nextY+=22;
        }
        if(detail&&!inline){
          const descW=Math.min(Math.max(60,width-16),dw);
          const descX=x+(width-descW)/2;
          const descColor=itemContentStyle.color||(error?'#ff4d4f':active?fg:muted);
          const descNode=text('Content',detail,descX,nextY+2,descW,22,descColor,14,'normal','center');
          if(itemContentStyle.fontStyle==='italic') descNode.fontStyle='italic';
          nodes.push(descNode);
        }
      }
      else if(vertical){
        const ix=0, iy=cursor;
        const stepH=detail?(dot?48:(small?58:66)):(small?48:56);
        const dotX=dot?(active?0:1):(ix+(24-d)/2);
        const dotY=dot?(active?iy+7:iy+8):iy;
        if(!isLast){
          const nextActive=nextM?.active;
          const nextDotY=iy+stepH+(nextActive?7:8);
          const rx=dot?4:ix+d/2-0.5;
          const ry=dot?dotY+d+4:iy+d+6;
          const rh=dot?Math.max(0,(nextDotY-4)-ry):Math.max(0,(iy+stepH-6)-ry);
          if(rh>0) nodes.push(rect('Step rail',rx,ry,dot?2:1,rh,railColor));
        }
        if(dot){
          if(isOutlined){
            nodes.push(rect('Step dot',dotX,dotY,d,d,'#ffffff',d/2,error?'#ff4d4f':done||active?primary:disabled,2));
          } else {
            nodes.push(rect('Step dot',dotX,dotY,d,d,error?'#ff4d4f':done||active?primary:'#00000040',d/2));
          }
        } else {
          renderStepIcon(ix,iy);
        }
        if(active&&i.percent>0&&!dot&&!panel) nodes.push(script('Progress',{type:'circle',percent:i.percent,showInfo:false},ix-4,iy-4,d+8,d+8));
        const tx=dot?ix+25:ix+d+16, ty=dot?iy:iy+(small?(d-22)/2:(d-24)/2);
        const titleWeight=itemTitleStyle.fontWeight||(active?'600':'normal');
        nodes.push(text('Step title',it.title,tx,ty,tw,small?22:24,tc,fs,titleWeight,'left'));
        if(it.subTitle) nodes.push(text('Step subtitle',it.subTitle,tx+tw+8,dot?iy:iy+(small?(d-22)/2:(d-22)/2),stw,22,muted,14,'normal','left'));
        if(detail&&!inline){
          const descY=dot?iy+22:iy+(small?24:32);
          const descColor=itemContentStyle.color||(error?'#ff4d4f':active?fg:muted);
          const descNode=text('Content',detail,tx,descY,Math.max(1,W-tx-8),22,descColor,14,'normal','left');
          if(itemContentStyle.fontStyle==='italic') descNode.fontStyle='italic';
          nodes.push(descNode);
        }
        cursor+=stepH;
      }
      else {
        // Horizontal standard
        const ix=x, iy=0;
        if(dot){
          if(isOutlined){
            nodes.push(rect('Step dot',ix,iy+(32-d)/2,d,d,'#ffffff',d/2,error?'#ff4d4f':done||active?primary:disabled,2));
          } else {
            nodes.push(rect('Step dot',ix,iy+(32-d)/2,d,d,error?'#ff4d4f':done||active?primary:'#00000040',d/2));
          }
        } else {
          renderStepIcon(ix,iy);
        }
        if(active&&i.percent>0&&!dot&&!panel) nodes.push(script('Progress',{type:'circle',percent:i.percent,showInfo:false},ix-4,iy-4,d+8,d+8));
        const tx=ix+d+8, ty=(d-24)/2;
        const titleWeight=itemTitleStyle.fontWeight||(active?'600':'normal');
        if(it.title) nodes.push(text('Step title',it.title,tx,ty,tw,24,tc,fs,titleWeight,'left'));
        if(it.subTitle) nodes.push(text('Step subtitle',it.subTitle,tx+tw+8,(d-22)/2,stw,22,muted,14,'normal','left'));
        if(!isLast){
          const itemGap=small?12:16,titleRailGap=small?8:16;
          const rx=it.title?(it.subTitle?tx+tw+8+stw:tx+tw)+titleRailGap:(ix+d+12);
          const ry=d/2-0.5;
          const nextIx=x+width+itemGap;
          const rw=Math.max(0,(nextIx-itemGap)-rx);
          if(rw>4) nodes.push(rect('Step rail',rx,ry,rw,1,railColor));
        }
        if(detail&&!inline){
          const descY=d+4;
          const descColor=itemContentStyle.color||(error?'#ff4d4f':active?fg:muted);
          const descNode=text('Content',detail,tx,descY,Math.max(160,width-d-16),22,descColor,14,'normal','left');
          if(itemContentStyle.fontStyle==='italic') descNode.fontStyle='italic';
          nodes.push(descNode);
        }
        cursor+=width+(isLast?0:(small?12:16));
      }
    });
    return nodes;
  }
  if(component==='Dropdown'){
    const trigger=parse(i.children,null),tw=i.triggerWidth??120,th=i.triggerHeight??32,hideTrigger=!!i.hideTrigger;
    const compactInputs=i.compactPlacement&&i.compactPlacement!=='none'?{compactPlacement:i.compactPlacement,compactOrientation:i.compactOrientation||'horizontal',size:i.size||'middle'}:{};
    const isSplitButton=i.isButton||i.triggerType==='splitButton',isRegularButton=i.triggerType==='button';
    let triggerNode=null;
    if(hideTrigger)triggerNode=null;
    else if(trigger?.type)triggerNode={...trigger,name:trigger.name||'Dropdown trigger',x:0,y:0,width:tw,height:th};
    else if(isSplitButton)triggerNode=script('Dropdown.Button',{children:i.children||'Dropdown',type:i.buttonType||'default',danger:!!i.danger,disabled:!!i.disabled,loading:!!i.loading,size:i.size||'middle',icon:i.splitIcon||'DownOutlined'},0,0,tw,th);
    else if(isRegularButton){
      triggerNode=script('Button',{children:i.children||'Hover me',type:i.buttonType||'default',danger:!!i.danger,disabled:!!i.disabled,size:i.size||'middle',icon:i.showTriggerIcon?'DownOutlined':'',iconPlacement:'end'},0,0,tw,th);
    }else{
      const label=i.children||'Hover me',labelW=Math.ceil(measureExact(label)),linkColor=i.disabled?disabled:primary;
      nodes.push(text('Dropdown link',label,0,(th-22)/2,labelW,22,linkColor));
      nodes.push(icon('DownOutlined',labelW+8,(th-12)/2,12,linkColor));
    }
    if(triggerNode){
      if(triggerNode.type==='script'&&triggerNode.scriptUri?.endsWith('/Button.js'))triggerNode.inputs={...(triggerNode.inputs||{}),...compactInputs};
      nodes.push(triggerNode);
    }
    if(i.open&&!i.disabled){
      const menu=parse(i.menu,{items:[]}),naturalWidth=Math.max(tw,...(menu.items||[]).filter(x=>x.type!=='divider').map(x=>measure(x.label??'')+(x.icon?22:0)+(x.extra?measure(x.extra)+10:0)+32));
      const mw=Math.max(i.popupWidth??0,naturalWidth),hasFooter=!!menu.footer;
      const baseH=(menu.items||[]).reduce((sum,item)=>sum+(item.type==='divider'?9:32),8)+(hasFooter?49:0);
      const mh=Math.max(i.popupHeight??0,40,baseH);
      const placement=i.placement||'bottomLeft',top=placement.startsWith('top'),right=placement.endsWith('Right'),side=placement.startsWith('left')||placement.startsWith('right');
      const popupGap=i.arrow?12:4;
      let px=side?(placement.startsWith('left')?-mw-popupGap:tw+popupGap):right?tw-mw:placement==='top'||placement==='bottom'?(tw-mw)/2:0;
      let py=side?(placement.endsWith('Top')?0:placement.endsWith('Bottom')?th-mh:(th-mh)/2):top?-(mh+popupGap):th+popupGap;
      if(i.arrowPointAtCenter){
        if(!side&&placement.endsWith('Left'))px=tw/2-20;
        else if(!side&&placement.endsWith('Right'))px=tw/2-(mw-20);
        else if(side&&placement.endsWith('Top'))py=th/2-20;
        else if(side&&placement.endsWith('Bottom'))py=th/2-(mh-20);
      }
      const hasOpenSubmenu=(menu.items||[]).some(item=>item.children&&(menu.openKeys||[]).map(String).includes(String(item.key)));
      if(!hasOpenSubmenu)nodes.push({...rect('Dropdown popup',px,py,mw,mh,'#fff',8),effect:{type:'shadow',shadowType:'outer',color:'#00000026',offset:{x:0,y:6},blur:16}});
      const {footer:menuFooter,...menuInputs}=menu;
      nodes.push(script('Menu',{...menuInputs,items:JSON.stringify(menu.items||[]),selectedKeys:JSON.stringify(menu.selectedKeys||[]),openKeys:JSON.stringify(menu.openKeys||[]),styles:JSON.stringify(menu.styles||{}),classNames:JSON.stringify(menu.classNames||{}),mode:'vertical',dropdownMenu:true},px,py,mw,hasFooter?mh-49:mh));
      if(hasFooter){
        const footerLabel=menu.footer.text||'Click me',footerW=Math.max(64,Math.ceil(measureExact(footerLabel))+30);
        nodes.push(rect('Popup footer divider',px,py+mh-49,mw,1,'#0505050f'));
        nodes.push(script('Button',{children:footerLabel,type:menu.footer.type||'primary'},px+8,py+mh-40,footerW,32));
      }
      if(i.arrow){
        let arrowX,arrowY,arrowW,arrowH,arrowGeometry,seamX,seamY,seamW,seamH;
        const arrowUp='M 0 8 A 4 4 0 0 0 2.82843 6.82843 L 6.58579 3.07107 A 2 2 0 0 1 9.41421 3.07107 L 13.1716 6.82843 A 4 4 0 0 0 16 8 Z';
        const arrowDown='M 0 0 A 4 4 0 0 1 2.82843 1.17157 L 6.58579 4.92893 A 2 2 0 0 0 9.41421 4.92893 L 13.1716 1.17157 A 4 4 0 0 1 16 0 Z';
        const arrowRight='M 0 0 A 4 4 0 0 1 1.17157 2.82843 L 4.92893 6.58579 A 2 2 0 0 0 4.92893 9.41421 L 1.17157 13.1716 A 4 4 0 0 1 0 16 Z';
        const arrowLeft='M 8 0 A 4 4 0 0 0 6.82843 2.82843 L 3.07107 6.58579 A 2 2 0 0 1 3.07107 9.41421 L 6.82843 13.1716 A 4 4 0 0 0 8 16 Z';
        if(side){
          const pointsRight=placement.startsWith('left');
          arrowX=pointsRight?px+mw-.25:px-4.75;
          arrowY=placement.endsWith('Top')?py+12:placement.endsWith('Bottom')?py+mh-28:py+(mh-16)/2;
          arrowW=5;arrowH=16;arrowGeometry=pointsRight?arrowRight:arrowLeft;
          seamX=pointsRight?px+mw-2:px;seamY=arrowY;seamW=2;seamH=16;
        }else{
          arrowX=placement.endsWith('Left')?px+12:placement.endsWith('Right')?px+mw-28:px+(mw-16)/2;
          arrowY=top?py+mh-.25:py-4.75;
          arrowW=16;arrowH=5;arrowGeometry=top?arrowDown:arrowUp;
          seamX=arrowX;seamY=top?py+mh-2:py;seamW=16;seamH=2;
        }
        nodes.push(rect('Popup arrow seam',seamX,seamY,seamW,seamH,'#fff'));
        nodes.push({type:'path',name:'Popup arrow',x:arrowX,y:arrowY,width:arrowW,height:arrowH,geometry:arrowGeometry,fill:'#fff'});
      }
    }return nodes;
  }
  return nodes;
}
