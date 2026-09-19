import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {bindings} from './build-independent-instances.mjs';
import {materialize,ownInputs} from './runtime/independent-instances.mjs';
const root=new URL('../',import.meta.url), cache=new Map();
let rendered=0;
function render(node,depth=0){
  assert(depth<30,'Cyclic nested scripts');
  assert.notEqual(node.type,'ref','Rendering must never depend on a scene reference');
  assert.notEqual(node.geometry,'...','Imported vector paths must contain geometry, not inspection placeholders');
  if(node.type!=='script')assert.equal(node.inputs,undefined,'Native canvas nodes cannot carry component inputs');
  if(node.type==='rectangle'){
    for(const key of ['layout','alignItems','justifyContent','gap','padding'])
      assert.equal(node[key],undefined,'Rectangles cannot carry frame layout property '+key);
  }
  if(node.type==='script'){
    let compiled=cache.get(node.scriptUri);
    if(!compiled){
      const source=fs.readFileSync(new URL(node.scriptUri.replace('../',''),root),'utf8'),defaults={};
      for(const match of source.matchAll(/@input (\w+): .*? = (.+)/g)){try{defaults[match[1]]=JSON.parse(match[2]);}catch{defaults[match[1]]=match[2];}}
      compiled={script:new vm.Script('(function(pencil){'+source+'})(pencil)'),defaults};cache.set(node.scriptUri,compiled);
    }
    // Every child gets a fresh realm. There is deliberately no document, node lookup or mounted parent.
    const output=compiled.script.runInNewContext({pencil:{input:{...compiled.defaults,...node.inputs},width:typeof node.width==='number'?node.width:240,height:typeof node.height==='number'?node.height:120}},{timeout:2000});
    rendered++;
    return {...node,rendered:output.map(child=>render(child,depth+1))};
  }
  return {...node,children:node.children?.map(child=>render(child,depth+1))};
}
const fixtures=[
  ...JSON.parse(fs.readFileSync(new URL('scripts/samples/layout-usage-headers.json',root),'utf8')),
  JSON.parse(fs.readFileSync(new URL('scripts/samples/space-compact-form.json',root),'utf8')),
  {type:'script',name:'Nested official Flex card',scriptUri:'../canvas-components/Card.content.js',width:620,height:270.09,inputs:{children:'L2ORxG',padding:0}},
  {type:'script',name:'Nested Splitter',scriptUri:'../canvas-components/Splitter.js',width:740,height:400,inputs:{panel1:'KBvQW',panel2:'U42MuP',size1:50,size2:50}},
  {type:'script',name:'Badge with FloatButton',scriptUri:'../canvas-components/Badge.wrapper.js',width:40,height:40,inputs:{count:9,children:JSON.stringify({type:'script',name:'FloatButton',scriptUri:'../canvas-components/FloatButton.js',inputs:{icon:JSON.stringify({type:'script',name:'Icon',scriptUri:'../canvas-components/Icon.js',inputs:{name:'FileTextOutlined'}})}})}}
];
for(const fixture of fixtures){
  const independent=materialize(fixture,bindings);independent.inputs=ownInputs(independent.inputs,bindings);
  const first=JSON.stringify(render(independent));
  const reopened=JSON.parse(JSON.stringify(independent));
  assert.equal(JSON.stringify(render(reopened)),first,'Fresh render after persistence must be identical');
  if(fixture.name.includes('compact form')){
    const output=JSON.parse(first);
    assert.equal(output.rendered.length,19,'All official compact form rows must remain present');
    for(const row of output.rendered){
      assert(row.scriptUri.endsWith('/Space.Compact.js'));
      assert(row.rendered.length>0,'Each compact row must render its controls');
    }
  }
  if(fixture.name.includes('Flex')){
    assert(first.includes('Get Started'));assert(first.includes('c1f5bcc0f96aaa3c.png'));
    const scripts=[];
    const walk=n=>{if(n.scriptUri)scripts.push(n);for(const c of [...(n.children||[]),...(n.rendered||[])])walk(c);};
    walk(JSON.parse(first));
    const flexes=scripts.filter(n=>n.scriptUri.endsWith('/Flex.js'));
    assert.equal(flexes.length,2,'Official combination has exactly two nested Flex containers');
    for(const flex of flexes)assert.equal(flex.rendered.length,2,'Demo defaults must not inject extra children');
    const title=scripts.find(n=>n.scriptUri.endsWith('/Typography.js'));
    assert.deepEqual(title.rendered.filter(n=>n.type==='text').map(n=>n.content),['“antd is an enterprise-','class UI design','language and React UI','library.”']);
    const button=scripts.find(n=>n.scriptUri.endsWith('/Button.js'));
    assert.equal(button.width,106.609375);assert.equal(button.inputs.href,'https://ant.design');
  }
}
const imported=Object.values(bindings).filter(node=>/^(Imported Layout|Space content|Value\/Masonry)/.test(node.name||''));
for(const node of imported)render(materialize(node,bindings));
for(const [component,inputs] of [
  ['Space',{child1:'h8QhSf',child2:'kjRUT'}],
  ['Masonry',{item1:'lX74k',item2:'AY9CF'}],
  ['Layout',{content:'yWarL'}],
]){
  const master=Object.entries(bindings).find(([,n])=>n.scriptUri?.endsWith('/'+component+'.js')&&!n.ref);
  const instance=materialize({type:'ref',ref:master[0],inputs},bindings);
  assert.deepEqual(Object.keys(instance.inputs),Object.keys(inputs),'Configured slots must not inherit demo children');
}
console.log('PASS: '+fixtures.length+' nested compositions, '+imported.length+' imported content trees, '+rendered+' fresh script runtimes, zero live canvas references or truncated paths; persistence round-trip outputs match.');
