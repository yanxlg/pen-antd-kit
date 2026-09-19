/**
 * @schema 2.11
 * @input children: ref
 * @input count: number = 5
 * @input dot: boolean = false
 * @input showZero: boolean = false
 * @input overflowCount: number = 99
 * @input color: color = #FF4D4F
 * @input offsetX: number = 0
 * @input offsetY: number = 0
 */
const childValues={"yw7cp":{"shape":"circle","type":"default","state":"normal","disabled":false,"icon":"jn88O"},"PTrBw":{"shape":"square","type":"default","state":"normal","disabled":false,"icon":"jn88O"}};

// GENERATED_DATA
const i=pencil.input||{},nodes=[];
if(i.children)nodes.push({type:'ref',ref:childValues[i.children]?'AhZRS':i.children,...(childValues[i.children]?{scriptUri:'../canvas-components/FloatButton.js'}:{}),name:'children',context:'prop:children',x:0,y:0,width:pencil.width,height:pencil.height,inputs:childValues[i.children]});
const count=Number(i.count??5),dot=!!i.dot,overflow=Number(i.overflowCount??99);
if(dot||count>0||count===0&&i.showZero){
 const label=count>overflow?String(overflow)+'+':String(count);
 const width=dot?6:label.length===1?20:Math.max(20,Array.from(label).reduce((v,c)=>v+(widths[c]??12),0)+16),height=dot?6:20;
 nodes.push({type:'ref',ref:'T5NTkL',scriptUri:'../canvas-components/Badge.js',name:'Indicator',x:pencil.width+(i.offsetX||0)-width/2,y:(i.offsetY||0)-height/2,width,height,inputs:{count,dot,showZero:!!i.showZero,overflowCount:overflow,color:i.color||'#FF4D4F'}});
}
return nodes;
