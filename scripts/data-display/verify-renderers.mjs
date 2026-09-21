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
assert(render('Image.PreviewGroup').every(n=>n.ref==='tTT7M'));
assert(render('Avatar',{icon:'UserOutlined'}).some(n=>n.ref==='antd-icon-live-origin'));
assert.equal(render('Badge',{count:0,showZero:false}).length,0);
assert(text(render('Badge',{count:100})).includes('99+'));
assert.equal(render('Descriptions.Item').filter(n=>n.type==='text').length,2);
assert.equal(render('Timeline.Item').filter(n=>n.type==='ellipse').length,1);
const a=render('QRCode',{value:'https://ant.design'}),b=render('QRCode',{value:'https://example.org'});
assert.notDeepEqual(a,b);assert(a.filter(n=>n.name==='QR module').length>200);
assert(render('Listy',{items:'["One","Two"]'}).every(n=>n.ref==='LG38Z'));
for(const f of fs.readdirSync('canvas-components').filter(f=>f.endsWith('.js')))new Function('pencil',fs.readFileSync(`canvas-components/${f}`,'utf8'));
console.log('Data Display renderer checks passed (properties, subcomponent references, QR payload, all script syntax).');
const {plan}=await import('./components-plan.mjs');let count=0;
for(const [component,states] of Object.entries(plan))for(const state of states){const name=state.component||component;if(name==='Avatar.Group')continue;const nodes=render(name==='Card'?'Card.content':name,state.inputs,state.width,state.height);assert(Array.isArray(nodes),name+' must return nodes');for(const node of nodes)for(const key of ['x','y','width','height'])if(typeof node[key]==='number')assert(Number.isFinite(node[key])&&(!['width','height'].includes(key)||node[key]>=0),name+' invalid '+key);count++;}
console.log(`${count} configured render states executed with finite dimensions.`);

// Prevent shared renderer changes from silently removing nested official states.
const status=render('Badge',{status:'warning',text:'Calendar event',count:0},180,22);
assert(text(status).includes('Calendar event'));
assert(status.some(n=>n.name==='Status dot'&&n.fill==='#FAAD14'));
for(const name of ['Checkbox','Radio'])assert(!text(render(name,{children:''})).some(Boolean));
for(const name of ['Tooltip','Popover','Tour'])assert.equal(render(name,{open:false,defaultOpen:false}).length,0);
assert.equal(render('Tooltip',{open:true,title:''}).length,0);
const calendar=render('Calendar',{value:'2026-09-19',cellRender:JSON.stringify({'2026-09-08':{type:'frame',children:[{type:'ref',ref:'bYmfX',descendants:{n6rSDv:{inputs:{status:'success',text:'Event'}}}}]}})},700,600);
const event=calendar.find(n=>n.children?.some(c=>c.ref==='bYmfX'));
assert.equal(event.children[0].descendants.n6rSDv.width,84);
assert(calendar.filter(n=>n.type==='ref').every(n=>n.x+n.width<=700));
const table=render('Table',{columns:'[{"title":"Name","dataIndex":"name"}]',dataSource:'[{"key":"a","name":"Official row"}]',pagination:false});
assert(JSON.stringify(table).includes('Official row'));
const tour=render('Tour',{open:true,steps:JSON.stringify([{title:'A',cover:JSON.stringify({type:'rectangle',name:'Official cover',height:80,fill:'#fff'})}]),indicatorsRender:JSON.stringify({type:'text',content:'1 / 1'})});
assert(tour.some(n=>n.name==='Official cover'));assert(text(tour).includes('1 / 1'));
console.log('Nested Badge, Calendar sizing, empty labels, closed overlays, Table data and Tour cover regressions passed.');
