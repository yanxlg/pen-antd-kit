import json,re
from pathlib import Path
from lxml import html
root=json.loads(Path('artifacts/official-navigation/navigation-current.canvas.json').read_text());bounds={x['id']:x['bounds'] for x in json.loads(Path('artifacts/official-navigation/aux-bounds.json').read_text())}
def walk(n):
 yield n
 for ch in n.get('children',[]):yield from walk(ch)
def text(n):return ''.join(x.get('content','') if isinstance(x.get('content',''),str) else '' for x in walk(n))
def norm(s):return re.sub(r'\s','',s)
def cls(n,s):return s in n.get('class','').split()
code=[]
for section in root['children']:
 name=section['id'].replace('section-','')
 if name not in ['anchor','breadcrumb','dropdown','menu','pagination','steps','tabs']:continue
 dom=html.parse('artifacts/official-navigation/'+name+'.html')
 for card in walk(section):
  if not card.get('name','').startswith('Example · '):continue
  title=card['name'][10:];boxes=dom.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," code-box ")]');box=next((b for b in boxes if any(norm(''.join(e.itertext()))==norm(title) for e in b.xpath('.//*[contains(@class,"code-box-title")]'))),None)
  if box is None:continue
  used=set()
  for n in walk(card):
   if n['id'] not in bounds:continue
   tag=n['context'];label=text(n);candidates=[e for e in box.xpath('.//'+tag) if e not in used and norm(''.join(e.itertext()))==norm(label) and not cls(e,'ant-dropdown-trigger')]
   if not candidates:continue
   el=candidates[0];used.add(el);component='Button';props={'children':label,'type':'primary' if cls(el,'ant-btn-primary') else 'default','disabled':el.get('disabled') is not None,'danger':cls(el,'ant-btn-dangerous')}
   if cls(el,'ant-switch'):
    component='Switch';ls=el.xpath('.//span[contains(@class,"ant-switch-inner-checked")]');rs=el.xpath('.//span[contains(@class,"ant-switch-inner-unchecked")]');props={'checked':cls(el,'ant-switch-checked'),'label':'','checkedChildren':''.join(ls[0].itertext()) if ls else '', 'unCheckedChildren':''.join(rs[0].itertext()) if rs else ''}
   elif tag=='label':
    checkbox=cls(el,'ant-checkbox-wrapper');component='Checkbox' if checkbox else 'Radio';props={'label':label,'checked':any('checked' in e.get('class','').split('-') for e in [el]+list(el.iterdescendants()))}
    if not checkbox:props['optionType']='button' if cls(el,'ant-radio-button-wrapper') else 'default'
   elif tag=='input':component='Input';props={'value':el.get('value',''),'size':'middle'}
   if component=='Button':
    icons=el.xpath('.//svg[@data-icon]')
    if icons:
     icon=''.join(x.title() for x in icons[0].get('data-icon').split('-'))+'Outlined';props['icon']=json.dumps({'type':'script','name':'Icon','scriptUri':'../canvas-components/Icon.js','inputs':{'name':icon},'width':14,'height':14})
    if cls(el,'ant-btn-sm'):props['size']='small'
    if cls(el,'ant-btn-loading'):props['loading']=True
   b=bounds[n['id']];d={'type':'script','name':component+' · '+(label or title),'scriptUri':'../canvas-components/'+component+'.js','inputs':props,'width':b['width'],'height':b['height']}
   for k in ['x','y','layoutPosition']:
    if k in n:d[k]=n[k]
   code.append('Replace('+json.dumps(n['id'])+','+json.dumps(d)+');')
Path('scripts/navigation/nest-aux.pencil.js').write_text('\n'.join(code)+'\nPrint("Nested '+str(len(code))+' official example controls");')
