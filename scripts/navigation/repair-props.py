import json
from pathlib import Path
from lxml import html
from importlib.machinery import SourceFileLoader
m=SourceFileLoader('extract','scripts/navigation/extract-official.py').load_module()
ns=json.loads(Path('artifacts/official-navigation/current-instances.json').read_text())
migration=json.loads(Path('registry/navigation-instance-migration.json').read_text())['instances']
ids={x['old']:x['id'] for x in json.loads(Path('registry/navigation-canvas.json').read_text())['migration']}
code=[]
for name in ['Tabs','Dropdown','Pagination','Steps']:
 root=html.parse('artifacts/official-navigation/'+name.lower()+'.html');jobs=[j for j in migration if j['component']==name];used={}
 for j in jobs:
  nid=ids[j['nodeId']];old=next(n for n in ns if n['id']==nid);p=old['inputs'].copy();card=root.xpath('//*[@id=$id]',id=j['officialId'])[0];preview=m.first(card,'code-box-demo');cname='ant-dropdown-trigger' if name=='Dropdown' else 'ant-'+name.lower();els=m.select(preview,cname);idx=used.get(j['officialId'],0);used[j['officialId']]=idx+1
  if idx>=len(els):continue
  el=els[idx]
  if name=='Tabs':
   items=json.loads(p['items']);panes=m.select(el,'ant-tabs-content');pane=next((x for x in panes if m.cls(x,'ant-tabs-content-active')),None)
   for it in items:
    if it['key']==p['activeKey']:it['children']=m.txt(pane)
   p['items']=json.dumps(items)
   extras=m.select(el,'ant-tabs-extra-content')
   for e in extras:
    label=m.txt(e)
    if label:p['extraStart' if e is el[0][0] else 'extraEnd']=json.dumps({'type':'script','name':'Extra action','scriptUri':'../canvas-components/Button.js','inputs':{'children':label},'width':88,'height':32})
   if j['cardTitle']=='Indicator':p['indicatorSize']=20
  if name=='Pagination':
   p['align']='center' if m.cls(el,'ant-pagination-center') else 'end' if m.cls(el,'ant-pagination-end') else 'start'
  if name=='Steps':
   items=json.loads(p['items']);active=next((k for k,it in enumerate(items) if it.get('status') in ['process','error']),None)
   if active is not None:p['current']=active;p['status']=items[active].get('status','process')
   for it in items:it.pop('status',None)
   p['items']=json.dumps(items)
  if name=='Dropdown':
   label=m.txt(el);b=old['bounds'];icon=m.icon(el);ip={'type':'script','name':'Icon','scriptUri':'../canvas-components/Icon.js','inputs':{'name':icon or 'DownOutlined','fontSize':14,'color':'#1677FF'},'width':14,'height':14}
   if el.tag=='button':
    bp={'children':label,'disabled':p.get('disabled',False),'type':'primary' if m.cls(el,'ant-btn-primary') else 'default','danger':m.cls(el,'ant-btn-dangerous')}
    if icon:bp.update(icon=json.dumps(ip),iconPlacement='end')
    trigger={'type':'script','name':'Button','scriptUri':'../canvas-components/Button.js','inputs':bp}
   else:
    trigger={'type':'frame','name':'Dropdown link','layout':'horizontal','gap':8,'alignItems':'center','children':[{'type':'text','name':'Link label','content':label,'fill':'#1677ff','fontFamily':'Inter','fontSize':14,'height':22,'width':max(1,b['width']-22)}]}
    if icon:trigger['children'].append(ip)
   p['children']=json.dumps(trigger)
   if label in ['bottomLeft','bottom','bottomRight','topLeft','top','topRight','left','leftTop','leftBottom','right','rightTop','rightBottom']:p['placement']=label
   p['arrow']='Arrow' in j['cardTitle'];p['trigger']='click' if 'Click' in j['cardTitle'] or label in {'Click me','Function Style'} else 'contextMenu' if 'Context' in j['cardTitle'] else 'hover'
  code.append('Update('+json.dumps(nid)+',{inputs:'+json.dumps(p)+'});')
# Canonical and state examples own all pane content, editable tabs actually allow close/add.
for n in ns:
 if n['name']=='Antd/Tabs' or (n['scriptUri'].endswith('/Tabs.js') and n['bounds']['width']==740):
  p=n['inputs'].copy();items=json.loads(p['items'])
  for it in items:it['children']='Content of Tab Pane '+it['key'];it['closable']=p.get('type')=='editable-card'
  p['items']=json.dumps(items);p['hideAdd']=p.get('type')!='editable-card';code.append('Update('+json.dumps(n['id'])+',{inputs:'+json.dumps(p)+'});')
 if n['name']=='Antd/Steps' or (n['scriptUri'].endswith('/Steps.js') and n['bounds']['width']==1400):
  p=n['inputs'].copy();items=json.loads(p['items'])
  for it in items:
   if it.get('status')=='error':p['status']='error'
   it.pop('status',None)
  p['items']=json.dumps(items);code.append('Update('+json.dumps(n['id'])+',{inputs:'+json.dumps(p)+'});')
Path('scripts/navigation/repair-props.pencil.js').write_text('\n'.join(code)+'\nPrint("Updated official props and nested triggers");')
