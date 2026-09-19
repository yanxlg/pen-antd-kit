"""Freeze official Ant Design streamed HTML for Pencil import. Requires lxml and curl."""
from lxml import html, etree
import re, pathlib, json, subprocess
out=pathlib.Path(__file__).resolve().parents[2]/'artifacts/official-layout'
out.mkdir(parents=True,exist_ok=True)
for slug in ['divider','splitter','grid','layout','space']:
 url='https://ant.design/components/'+slug
 raw=subprocess.check_output(['curl','-L','-s',url]).decode()
 root=html.document_fromstring(raw)
 def find(id):
  a=root.xpath('//*[@id=$id]',id=id)
  return a[0] if a else None
 def splice(src,before):
  p=before.getparent()
  if src.text:
   prev=before.getprevious()
   if prev is None:p.text=(p.text or '')+src.text
   else:prev.tail=(prev.tail or '')+src.text
  for ch in list(src):p.insert(p.index(before),ch)
 for kind,a,b in re.findall(r'\$(RC|RS)\("([^"]+)","([^"]+)"\)',raw):
  src=find(b if kind=='RC' else a); dst=find(a if kind=='RC' else b)
  if src is None or dst is None:continue
  if kind=='RS':
   splice(src,dst);dst.getparent().remove(dst)
  else:
   p=dst.getparent();prev=dst.getprevious();cur=dst;depth=0
   while cur is not None:
    if isinstance(cur,etree._Comment):
     if cur.text in ['/$','/&']:
      if depth==0:break
      depth-=1
     elif cur.text in ['$','$?','$~','$!','&']:depth+=1
    nxt=cur.getnext();p.remove(cur);cur=nxt
   if cur is not None:splice(src,cur)
   if prev is not None:prev.text='$'
  if src.getparent() is not None:src.getparent().remove(src)
 for node in root.xpath('//script'):node.getparent().remove(node)
 head=root.find('head');head.insert(0,html.Element('base',href=url))
 htmltext=html.tostring(root,encoding='unicode',method='html')
 (out/(slug+'.html')).write_text(htmltext)
 print(slug,'cards',len(root.cssselect('.code-box')) if False else len(root.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," code-box ")]')))
