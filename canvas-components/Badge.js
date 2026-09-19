/**
 * @schema 2.18
 * @input children: string = ""
 * @input count: number = 5
 * @input dot: boolean = false
 * @input showZero: boolean = false
 * @input overflowCount: number = 99
 * @input color: color = #FF4D4F
 * @input offsetX: number = 0
 * @input offsetY: number = 0
 */
const widths={"0":7.57,"1":4.88,"2":7.32,"3":7.41,"4":7.75,"5":7.12,"6":7.44,"7":6.79,"8":7.42,"9":7.44,"+":7.94};
const i=pencil.input||{},nodes=[],dot=!!i.dot,count=Number(i.count??5),overflow=Number(i.overflowCount??99),W=Math.max(1,pencil.width),H=Math.max(1,pencil.height);
let child=null;if(i.children){try{child=JSON.parse(i.children)}catch{child=null}}if(child){nodes.push({...child,name:child.name||'Badge child',x:0,y:0,width:child.width||W,height:child.height||H});}
if(!dot&&count===0&&!i.showZero)return nodes;
const label=count>overflow?String(overflow)+'+':String(count),measure=s=>Array.from(s).reduce((v,c)=>v+(widths[c]??12),0),bw=dot?6:label.length===1?20:Math.max(20,measure(label)+16),bh=dot?6:20;
const bx=child?W-bw/2+(Number(i.offsetX)||0):0,by=child?-bh/2+(Number(i.offsetY)||0):0;
nodes.push({type:'rectangle',name:dot?'Badge dot':'Badge surface',x:bx,y:by,width:bw,height:bh,cornerRadius:bh/2,fill:i.color||'#FF4D4F',effect:{type:'shadow',shadowType:'outer',color:'#FFFFFF',spread:1,blur:0,offset:{x:0,y:0}}});
if(!dot)nodes.push({type:'text',name:'Badge count',content:label,x:bx,y:by,width:bw,height:bh,textGrowth:'fixed-width-height',textAlign:'center',fontFamily:'Inter',fontSize:12,lineHeight:20/12,fill:'#FFFFFF'});
return nodes;
