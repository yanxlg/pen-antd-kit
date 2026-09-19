from html.parser import HTMLParser
from pathlib import Path
import json,re
class Node:
 def __init__(self,tag='',attrs=None,parent=None):self.tag=tag;self.a=dict(attrs or []);self.parent=parent;self.children=[];self.text=''
 def content(self):return self.text+''.join(n.content() for n in self.children)
 def walk(self):
  yield self
  for n in self.children:yield from n.walk()
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.root=Node();self.cur=self.root
 def handle_starttag(self,tag,attrs):
  n=Node(tag,attrs,self.cur);self.cur.children.append(n)
  if tag not in ['br','img','input','hr','meta','link','wbr']:self.cur=n
 def handle_endtag(self,tag):
  p=self.cur
  while p.parent and p.tag!=tag:p=p.parent
  if p.parent:self.cur=p.parent
 def handle_data(self,s):self.cur.text+=s
for path in Path('/tmp').glob('pen-feedback-*-dom.txt'):
 s=path.read_text();s=s[s.find('Styled tree for '):];s=s[s.find('<'):];p=Parser();p.feed(s);out=[]
 for n in p.root.walk():
  classes=n.a.get('class','').split();comp=next((c for c in ['ant-alert','ant-btn','ant-progress','ant-result','ant-skeleton','ant-spin','ant-watermark','ant-affix','ant-border-beam','ant-switch','ant-radio-group','ant-input','ant-select','ant-checkbox-wrapper','ant-float-btn'] if c in classes),None)
  if not comp:continue
  style=dict(re.findall(r'([\w-]+):\s*([^;]+)',n.a.get('style','')))
  texts=[x.text.strip() for x in n.walk() if x.text.strip()];title=next((a.a.get('id') for a in iter_parents(n) if False),None) if False else ''
  ancestor=n
  while ancestor and not ancestor.a.get('id','').startswith(tuple(['alert-demo','drawer-demo','message-demo','modal-demo','notification-demo','popconfirm-demo','progress-demo','result-demo','skeleton-demo','spin-demo','watermark-demo','affix-demo','app-demo','border'])):ancestor=ancestor.parent
  out.append({'kind':comp,'classes':classes,'text':''.join(texts),'texts':texts,'style':style,'width':float(style.get('width','0').replace('px','')) if re.match(r'^\d+(\.\d+)?px$',style.get('width','')) else 0,'height':float(style.get('height','0').replace('px','')) if re.match(r'^\d+(\.\d+)?px$',style.get('height','')) else 0,'demo':ancestor.a.get('id') if ancestor else '', 'childrenClasses':[c.a.get('class','') for c in n.walk()], 'iconNames':[c.a.get('aria-label') for c in n.walk() if c.a.get('role')=='img']})
 slug=path.name.removeprefix('pen-feedback-').removesuffix('-dom.txt');Path(f'artifacts/feedback-other/{slug}-official.json').write_text(json.dumps(out,ensure_ascii=False,indent=2));print(slug,len(out))
