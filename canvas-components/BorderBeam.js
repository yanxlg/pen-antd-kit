/**
 * @schema 2.18
 * @input children: string = ""
 * @input color: color = #1677FF
 * @input count: number = 1
 * @input duration: number = 6
 * @input lineWidth: number = 1
 * @input outset: number = 0
 * @input size: number = 100
 */
const i=pencil.input;
const W=Math.max(180,pencil.width),H=Math.max(100,pencil.height);
const c=i.color||"#1677FF", line=Math.max(1,Math.min(8,i.lineWidth||1));
const size=Math.max(24,Math.min(i.size||100,Math.max(W,H)*0.7));
const outset=Number(i.outset||0), count=Math.max(1,Math.min(8,Math.floor(i.count||1)));
const nodes=[];
if(i.children){let child;try{child=JSON.parse(i.children)}catch{child={type:'ref',ref:i.children}}nodes.push({...child,x:0,y:0,width:W,height:H});}
const gradient=(rotation)=>({type:"gradient",gradientType:"linear",rotation,colors:[{color:c+"00",position:0},{color:c,position:0.5},{color:c+"00",position:1}]});
for(let n=0;n<count;n++){
  const side=n%4;
  const shift=Math.floor(n/4)*18;
  if(side===0) nodes.push({type:"rectangle",name:"Beam "+(n+1),x:Math.max(8,(W-size)/2-shift),y:-outset,width:Math.min(size,W-16),height:line,fill:gradient(90),cornerRadius:line});
  if(side===1) nodes.push({type:"rectangle",name:"Beam "+(n+1),x:W-line+outset,y:Math.max(8,(H-size)/2-shift),width:line,height:Math.min(size,H-16),fill:gradient(180),cornerRadius:line});
  if(side===2) nodes.push({type:"rectangle",name:"Beam "+(n+1),x:Math.max(8,(W-size)/2+shift),y:H-line+outset,width:Math.min(size,W-16),height:line,fill:gradient(90),cornerRadius:line});
  if(side===3) nodes.push({type:"rectangle",name:"Beam "+(n+1),x:-outset,y:Math.max(8,(H-size)/2+shift),width:line,height:Math.min(size,H-16),fill:gradient(180),cornerRadius:line});
}
return nodes;
