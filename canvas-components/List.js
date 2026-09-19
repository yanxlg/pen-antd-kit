/**
 * @schema 2.18
 * @input items: string = "Ant Design Title 1|Ant Design Title 2|Ant Design Title 3|Ant Design Title 4"
 * @input bordered: boolean = false
 * @input itemLayout: enum("horizontal", "vertical") = "horizontal"
 * @input size: enum("default", "large", "small") = "default"
 * @input split: boolean = true
 * @input grid: boolean = false
 * @input loading: boolean = false
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(240,pencil.width),H=Math.max(140,pencil.height),items=(i.items||'').split('|'),nodes=[],cols=i.grid?2:1,rowH=H/Math.ceil(items.length/cols),cw=W/cols;
if(i.bordered)nodes.push({type:'rectangle',name:'List border',x:0,y:0,width:W,height:H,cornerRadius:8,fill:'#FFF',stroke:'#D9D9D9',strokeWidth:1,strokeAlignment:'inner'});
items.forEach((label,n)=>{const col=n%cols,row=Math.floor(n/cols),x=col*cw,y=row*rowH;if(i.split&&row>0)nodes.push({type:'rectangle',name:'List divider',x:x+16,y,width:cw-32,height:1,fill:'#F0F0F0'});if(i.loading){nodes.push({type:'rectangle',name:'Loading avatar',x:x+16,y:y+16,width:40,height:40,cornerRadius:20,fill:'#F0F0F0'});nodes.push({type:'rectangle',name:'Loading line',x:x+72,y:y+18,width:cw-96,height:10,cornerRadius:5,fill:'#F0F0F0'});return;}nodes.push({type:'ref',ref:'oy6ni',name:'List.Item.Meta',x:x+16,y:y+12,width:cw-32,height:rowH-24,inputs:{title:label||('Ant Design Title '+(n+1)),description:'Ant Design, a design language for background applications.',avatar:true}});});
return nodes;
