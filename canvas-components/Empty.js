/**
 * @schema 2.18
 * @input description: string = "No data"
 * @input image: enum("default", "simple") = "default"
 * @input primaryColor: color = #1677FF
 */
const i=pencil.input||{},W=Math.max(160,pencil.width),H=Math.max(120,pencil.height),nodes=[];
const cx=W/2,cy=Math.max(44,H/2-20),simple=i.image==='simple';
nodes.push({type:'ellipse',name:'Empty shadow',x:cx-48,y:cy+24,width:96,height:12,fill:'#F5F5F5'});
nodes.push({type:'path',name:'Empty box',x:cx-42,y:cy-28,width:84,height:58,viewBox:[0,0,84,58],geometry:'M8 18L22 2H62L76 18V50C76 54 72 56 68 56H16C12 56 8 54 8 50Z',fill:simple?'#FAFAFA':'#F5F5F5',stroke:'#D9D9D9',strokeWidth:1});
nodes.push({type:'path',name:'Empty lid',x:cx-42,y:cy-28,width:84,height:58,viewBox:[0,0,84,58],geometry:'M8 18H30C32 24 36 27 42 27S52 24 54 18H76',fill:'#00000000',stroke:'#BFBFBF',strokeWidth:1});
nodes.push({type:'text',name:'Description',content:i.description||'No data',x:0,y:cy+48,width:W,height:22,textGrowth:'fixed-width-height',textAlign:'center',fontFamily:'Inter',fontSize:14,lineHeight:22/14,fill:'#00000073'});
return nodes;
