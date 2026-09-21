import fs from 'node:fs';
import assert from 'node:assert/strict';
import {plan} from './plan.mjs';
import {defaults} from './build.mjs';
let count=0;const summary=[];
for(const [name,groups] of Object.entries(plan)){
 let states=0;
 for(const group of groups){assert(group.samples.length>1);const available=(1616-24*(group.cols-1))/group.cols;
 for(const s of group.samples){assert(s.width+8<=available,`${name} cell overflow ${s.label}`);const component=s.component||name,file=component==='Card'?'Card.content':component;if(component==='Avatar.Group'){states++;continue;}const source=fs.readFileSync('canvas-components/'+file+'.js','utf8');for(const key of Object.keys(s.inputs))assert(key in defaults[file],`${file}: unknown prop ${key}`);const nodes=new Function('pencil',source)({input:{...defaults[file],...s.inputs},width:s.width,height:s.height});assert(Array.isArray(nodes));const visit=n=>{for(const k of ['x','y','width','height'])if(typeof n[k]==='number')assert(Number.isFinite(n[k])&&(!['width','height'].includes(k)||n[k]>=0),`${name} ${s.label} ${k}`);if(n.type==='ref')assert(n.ref,`${name} missing component ref`);if(n.children) n.children.forEach(visit)};nodes.forEach(visit);states++;count++;}
 }
 summary.push({name,groups:groups.length,states});
}
console.log(JSON.stringify({components:summary.length,rendered:count,states:summary.reduce((n,c)=>n+c.states,0),summary},null,2));

const tagSource=fs.readFileSync('canvas-components/Tag.js','utf8');for(const color of ['default','success','processing','warning','error','purple']){const nodes=new Function('pencil',tagSource)({input:{...defaults.Tag,color,variant:'solid',closable:true},width:120,height:22});const root=nodes.find(n=>n.name==='Tag root'),label=root.children.find(n=>n.name==='children'),close=root.children.find(n=>n.type==='ref');assert.notEqual(label.fill,root.fill,'Solid tag label must remain visible');assert.equal(label.fill,'#FFFFFF');assert.equal(close.inputs.color,'#FFFFFF');}

const cardSource=fs.readFileSync('canvas-components/Card.content.js','utf8');const renderCard=new Function('pencil',cardSource);const loadingCard=renderCard({input:{...defaults['Card.content'],loading:true},width:720,height:180});const contentCard=renderCard({input:{...defaults['Card.content'],loading:false},width:720,height:180});assert(loadingCard.some(n=>n.name==='Skeleton line 1'),'Card loading state renders skeleton content');assert.notDeepEqual(loadingCard,contentCard,'Card loading and content states must differ');
