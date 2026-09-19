"""Extract visible example props from the captured official Ant Design DOM."""
import json,re
from pathlib import Path
from lxml import html
BASE=Path(__file__).resolve().parents[2]
def cls(n,c):return c in n.get('class','').split()
def select(n,c):return n.xpath('.//*[contains(concat(" ",normalize-space(@class)," "), $c)]',c=' '+c+' ')
def txt(n):return ''.join(n.itertext()).strip() if n is not None else ''
def first(n,c):
 a=select(n,c);return a[0] if a else None
def icon(n):
 a=n.xpath('.//svg[@data-icon]')
 if not a:return None
 return ''.join(p[:1].upper()+p[1:] for p in a[0].get('data-icon').split('-'))+'Outlined'
def props(name,n):
 if name=='Breadcrumb':
  items=[]
  for el in select(n,'ant-breadcrumb-link'):
   item={'title':txt(el)}
   ic=icon(el)
   if ic:item['icon']=ic
   if select(el,'ant-dropdown-trigger'):item['menu']=True
   items.append(item)
  seps=select(n,'ant-breadcrumb-separator')
  return {'items':json.dumps(items),'separator':txt(seps[0]) if seps else '/'}
 if name=='Anchor':
  def links(root):
   result=[]
   for el in root:
    if not cls(el,'ant-anchor-link'):continue
    a=first(el,'ant-anchor-link-title');item={'key':a.get('href',''),'href':a.get('href',''),'title':txt(a)}
    children=links(el)
    if children:item['children']=children
    result.append(item)
   return result
  active=first(n,'ant-anchor-link-title-active')
  return {'items':json.dumps(links(n)),'direction':'horizontal' if cls(n,'ant-anchor-horizontal') else 'vertical','activeHref':active.get('href','') if active is not None else ''}
 if name=='Menu':
  selected=[];opened=[]
  def links(root,prefix=''):
   result=[]
   for k,el in enumerate(root):
    if el.tag!='li':continue
    key=prefix+str(k+1)
    if cls(el,'ant-menu-item-divider'):result.append({'type':'divider','key':key});continue
    group=cls(el,'ant-menu-item-group');sub=cls(el,'ant-menu-submenu')
    label=first(el,'ant-menu-item-group-title' if group else 'ant-menu-title-content')
    item={'key':key,'label':txt(label) if label is not None else txt(el)}
    if group:item['type']='group'
    if cls(el,'ant-menu-item-selected'):selected.append(key)
    if cls(el,'ant-menu-item-disabled'):item['disabled']=True
    if cls(el,'ant-menu-item-danger'):item['danger']=True
    ic=icon(el)
    if ic:item['icon']=ic
    uls=el.xpath('./ul')
    if uls:item['children']=links(uls[0],key+'-')
    if cls(el,'ant-menu-submenu-open'):opened.append(key)
    result.append(item)
   return result
  items=links(n)
  return {'items':json.dumps(items),'selectedKeys':json.dumps(selected),'openKeys':json.dumps(opened),'mode':'horizontal' if cls(n,'ant-menu-horizontal') else 'inline' if cls(n,'ant-menu-inline') else 'vertical','theme':'dark' if cls(n,'ant-menu-dark') else 'light','inlineCollapsed':cls(n,'ant-menu-inline-collapsed')}
 if name=='Pagination':
  pageItems=select(n,'ant-pagination-item');pages=[int(x.get('title')) for x in pageItems if (x.get('title') or '').isdigit()];active=first(n,'ant-pagination-item-active');simple=cls(n,'ant-pagination-simple');size=24 if cls(n,'ant-pagination-mini') else 40 if cls(n,'ant-pagination-large') else 32
  current=int(active.get('title')) if active is not None else 1
  if simple:
   inp=n.xpath('.//input');current=int(inp[0].get('value','1')) if inp else 2
  selectEl=first(n,'ant-pagination-options-size-changer');label=txt(selectEl);match=re.search(r'\d+',label);pageSize=int(match.group()) if match else 10
  props={'current':current,'total':max(pages or [5])*pageSize,'pageSize':pageSize,'size':'small' if size==24 else 'large' if size==40 else 'middle','disabled':cls(n,'ant-pagination-disabled'),'simple':simple,'showSizeChanger':selectEl is not None,'showQuickJumper':first(n,'ant-pagination-options-quick-jumper') is not None}
  total=first(n,'ant-pagination-total-text')
  if total is not None:
   nums=re.findall(r'\d+',txt(total));props['total']=int(nums[-1]);props['showTotal']='range' if '-' in txt(total) else 'total'
  prev=first(n,'ant-pagination-prev');nxt=first(n,'ant-pagination-next')
  if prev is not None and txt(prev):props['previousLabel']=txt(prev)
  if nxt is not None and txt(nxt):props['nextLabel']=txt(nxt)
  return props
 if name=='Steps':
  items=[];current=0;status='process'
  for k,el in enumerate([x for x in n if cls(x,'ant-steps-item')]):
   item={'title':txt(first(el,'ant-steps-item-title')),'content':txt(first(el,'ant-steps-item-content'))}
   subtitle=txt(first(el,'ant-steps-item-subtitle'))
   if subtitle:item['subTitle']=subtitle
   if cls(el,'ant-steps-item-active'):current=k
   for st in ['wait','process','finish','error']:
    if cls(el,'ant-steps-item-'+st):item['status']=st
   ic=icon(el)
   if ic and ic not in ['CheckOutlined','CloseOutlined']:item['icon']=ic
   items.append(item)
  typ=next((v for v in ['navigation','inline','panel','dot'] if cls(n,'ant-steps-'+v)),'default')
  return {'items':json.dumps(items),'current':current,'size':'small' if cls(n,'ant-steps-small') else 'middle','orientation':'vertical' if cls(n,'ant-steps-vertical') else 'horizontal','titlePlacement':'vertical' if cls(n,'ant-steps-title-vertical') else 'horizontal','variant':'outlined' if cls(n,'ant-steps-outlined') else 'filled','type':typ}
 if name=='Tabs':
  items=[];active='1';panes=select(n,'ant-tabs-tabpane')
  for k,el in enumerate(select(n,'ant-tabs-tab')):
   button=first(el,'ant-tabs-tab-btn');key=str(k+1);item={'key':key,'label':txt(button),'disabled':cls(el,'ant-tabs-tab-disabled'),'closable':first(el,'ant-tabs-tab-remove') is not None}
   if cls(el,'ant-tabs-tab-active'):active=key;item['children']=txt(panes[0]) if panes else ''
   ic=icon(button) if button is not None else None
   if ic:item['icon']=ic
   items.append(item)
  return {'items':json.dumps(items),'activeKey':active,'type':'editable-card' if cls(n,'ant-tabs-editable-card') else 'card' if cls(n,'ant-tabs-card') else 'line','size':'small' if cls(n,'ant-tabs-small') else 'large' if cls(n,'ant-tabs-large') else 'middle','tabPlacement':next((p for c,p in [('bottom','bottom'),('left','start'),('right','end')] if cls(n,'ant-tabs-'+c)),'top'),'centered':cls(n,'ant-tabs-centered'),'hideAdd':first(n,'ant-tabs-nav-add') is None}
 if name=='Dropdown':return {'label':txt(n),'disabled':n.get('disabled') is not None}
 return {}
def norm(s):return re.sub(r'\s+','',s).replace('svg','')
alljobs=[]
for name in ['Anchor','Breadcrumb','Dropdown','Menu','Pagination','Steps','Tabs']:
 root=html.parse(str(BASE/'artifacts/official-navigation'/f'{name.lower()}.html'))
 for card in root.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," code-box ")]'):
  title=txt(first(card,'code-box-title'));preview=first(card,'code-box-demo')
  if preview is None:continue
  cname='ant-dropdown-trigger' if name=='Dropdown' else 'ant-menu-root' if name=='Menu' else 'ant-'+name.lower()
  for el in select(preview,cname):
   if name=='Menu' and any(cls(p,'ant-menu-root') for p in el.iterancestors()):continue
   alljobs.append({'component':name,'cardTitle':title,'officialId':card.get('id'),'tag':el.tag,'text':norm(txt(el)),'props':props(name,el)})
(BASE/'registry/navigation-official-props.json').write_text(json.dumps(alljobs,indent=2))
print('Extracted',len(alljobs),'official component configurations')
