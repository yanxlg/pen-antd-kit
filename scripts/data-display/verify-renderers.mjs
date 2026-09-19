import fs from 'node:fs';
import assert from 'node:assert/strict';
const render=(name,input={},width=720,height=300)=>{
 const source=fs.readFileSync(`canvas-components/${name}.js`,'utf8'),defaults={};
 for(const m of source.matchAll(/@input (\w+):[^\n]*? = ([^\n]+)/g)){try{defaults[m[1]]=JSON.parse(m[2])}catch{defaults[m[1]]=m[2]}}
 return new Function('pencil',source)({input:{...defaults,...input},width,height});
};
const text=n=>n.filter(x=>x.type==='text').map(x=>x.content);
assert(text(render('Statistic',{value:'112893',precision:2})).includes('112,893.00'));
assert(text(render('Statistic.Timer',{value:'01:30:00'})).includes('01:30:00'));
assert(!text(render('Statistic',{loading:true})).includes('112,893'));
assert.equal(render('Carousel',{dots:false}).filter(n=>n.type==='rectangle').length,1);
assert(text(render('Carousel',{initialSlide:2})).includes('3'));
assert.equal(render('Segmented',{size:'small'})[0].height,24);
assert.equal(render('Segmented',{orientation:'vertical'})[0].height,88);
assert(render('Segmented',{disabled:true}).filter(n=>n.type==='text').every(n=>n.fill==='#00000040'));
assert(!render('Collapse',{activeKey:0}).some(n=>n.name==='Panel content'));
assert(!text(render('Table',{showHeader:false})).includes('Name'));
assert(render('Table',{pagination:true}).some(n=>n.ref==='Y9L6l'));
assert(render('List.Item.Meta').some(n=>n.ref==='GcQcz'));
assert(render('Image.PreviewGroup').every(n=>n.ref==='tTT7M'));
assert(render('Avatar',{icon:'UserOutlined'}).some(n=>n.ref==='antd-icon-live-origin'));
assert.equal(render('Badge',{count:0,showZero:false}).length,0);
assert(text(render('Badge',{count:100})).includes('99+'));
assert.equal(render('Descriptions.Item').filter(n=>n.type==='text').length,2);
assert.equal(render('Timeline.Item').filter(n=>n.type==='ellipse').length,1);
const a=render('QRCode',{value:'https://ant.design'}),b=render('QRCode',{value:'https://example.org'});
assert.notDeepEqual(a,b);assert(a.filter(n=>n.name==='QR module').length>200);
assert(render('Listy',{items:'["One","Two"]'}).every(n=>n.ref==='p2ooj3'));
for(const f of fs.readdirSync('canvas-components').filter(f=>f.endsWith('.js')))new Function('pencil',fs.readFileSync(`canvas-components/${f}`,'utf8'));
console.log('Data Display renderer checks passed (properties, subcomponent references, QR payload, all script syntax).');
const {plan}=await import('./components-plan.mjs');let count=0;
for(const [component,states] of Object.entries(plan))for(const state of states){const name=state.component||component;if(name==='Avatar.Group')continue;const nodes=render(name==='Card'?'Card.content':name,state.inputs,state.width,state.height);assert(Array.isArray(nodes),name+' must return nodes');for(const node of nodes)for(const key of ['x','y','width','height'])if(typeof node[key]==='number')assert(Number.isFinite(node[key])&&(!['width','height'].includes(key)||node[key]>=0),name+' invalid '+key);count++;}
console.log(`${count} configured render states executed with finite dimensions.`);
