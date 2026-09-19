import assert from 'node:assert/strict';
import {buttonInstance,buttonChildren,buttonProps,renderButton,manifest} from './button-composition.mjs';
import {iconInstance} from './floatbutton-composition.mjs';
let count=0;
for(const type of ['default','primary','dashed','text','link'])for(const size of ['small','middle','large'])for(const state of ['normal','hover_or_press','active','disabled','loading']){
 const b=buttonInstance({type,size,state,children:'Save',icon:iconInstance('SaveOutlined')},{width:100});
 const layers=renderButton({input:b.inputs,width:b.width,height:b.height}),box=layers[0],text=layers.find(n=>n.type==='text'),glyph=layers.find(n=>n.type==='script');
 assert.equal(b.scriptUri,'../canvas-components/Button.js');assert.equal(buttonChildren(b),'Save');assert.equal(text.content,'Save');
 assert.equal(box.height,size==='large'?40:size==='small'?24:32);assert.equal(box.width,100);
 assert.equal(glyph.scriptUri,'../canvas-components/Icon.js');
 assert.equal(glyph.inputs.name,state==='loading'?'LoadingOutlined':'SaveOutlined');assert.equal(text.fill,glyph.inputs.color);assert.equal(glyph.y+glyph.height/2,b.height/2);count++;
}
const plain=buttonInstance({children:'Delete <all> & retry'});plain.inputs.children='Renamed';assert.equal(buttonProps(plain).children,'Renamed');
assert.equal(renderButton({input:plain.inputs}).find(n=>n.type==='text').content,'Renamed');
const only=buttonInstance({children:'',icon:iconInstance('SearchOutlined')});assert.ok(!renderButton({input:only.inputs}).some(n=>n.type==='text'));
const rich=buttonInstance({children:'Save draft',childrenContent:{type:'text',name:'Rich label',content:'Rich content'}});assert.equal(buttonChildren(rich).content,'Rich content');assert.equal(renderButton({input:rich.inputs}).find(n=>n.name==='children').content,'Rich content');
const block=buttonInstance({children:'Block',block:true},{width:'fill_container',resolvedWidth:774});assert.equal(block.width,'fill_container');assert.equal(renderButton({input:block.inputs,width:774})[0].width,774);
const before=renderButton({input:plain.inputs}),after=renderButton({input:{...plain.inputs,disabled:true}});assert.notEqual(before[0].fill,after[0].fill);assert.notEqual(before.find(n=>n.type==='text').fill,after.find(n=>n.type==='text').fill);
assert.throws(()=>buttonInstance({icon:'search'}),/instance/);
console.log(`PASS: ${count} Button variant/size/state cases; root label/state updates, icon refs, rich content refs, loading, icon-only and block.`);
