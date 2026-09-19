/**
 * @schema 2.18
 * @input title: string = "User Info"
 * @input items: string = "Product:Cloud Database|Billing Mode:Prepaid|Automatic Renewal:YES|Order time:2018-04-24 18:00:00|Usage Time:2019-04-24 18:00:00|Status:Running"
 * @input bordered: boolean = false
 * @input size: enum("small", "middle", "large") = "middle"
 * @input colon: boolean = true
 * @input layout: enum("horizontal", "vertical") = "horizontal"
 * @input column: number = 3
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(320,pencil.width),H=Math.max(120,pencil.height),pairs=(i.items||'').split('|').map(x=>{const p=x.indexOf(':');return p<0?[x,'—']:[x.slice(0,p),x.slice(p+1)]}),nodes=[],cols=Math.max(1,Math.min(3,Number(i.column||3))),titleH=i.title?42:0,rowH=i.size==='small'?40:i.size==='large'?56:48,cw=W/cols;
if(i.title)nodes.push({type:'text',name:'Descriptions title',content:i.title,x:0,y:0,width:W,height:titleH,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:16,fontWeight:'600',lineHeight:titleH/16,fill:'#000000E0'});
pairs.forEach((p,n)=>{const col=n%cols,row=Math.floor(n/cols),x=col*cw,y=titleH+row*rowH;if(i.bordered)nodes.push({type:'rectangle',name:'Description cell',x,y,width:cw,height:rowH,fill:'#FFF',stroke:'#F0F0F0',strokeWidth:1,strokeAlignment:'inner'});if(i.layout==='vertical'){nodes.push({type:'text',name:'Label',content:p[0]+(i.colon?':':''),x:x+12,y:y+5,width:cw-24,height:18,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:12,fill:'#00000073'});nodes.push({type:'text',name:'Value',content:p[1],x:x+12,y:y+23,width:cw-24,height:20,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:14,fill:'#000000E0'});}else{const lw=Math.min(104,cw*.42);if(i.bordered)nodes.push({type:'rectangle',name:'Label background',x,y,width:lw,height:rowH,fill:'#FAFAFA'});nodes.push({type:'text',name:'Label',content:p[0]+(i.colon?':':''),x:x+12,y,width:lw-16,height:rowH,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:13,lineHeight:rowH/13,fill:'#00000073'});nodes.push({type:'text',name:'Value',content:p[1],x:x+lw+12,y,width:cw-lw-20,height:rowH,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:13,lineHeight:rowH/13,fill:'#000000E0'});}});
return nodes;
