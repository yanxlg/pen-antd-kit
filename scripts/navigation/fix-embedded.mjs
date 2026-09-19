import fs from 'node:fs';
const script=(name,inputs,width,height)=>({type:'script',name,scriptUri:'../canvas-components/'+name+'.js',inputs,width,height});
const items=JSON.stringify([1,2,3].map(n=>({key:'part-'+n,href:'#part-'+n,title:'Part '+n})));
let code='';
for(const [id,horizontal,custom,replace,offset] of [['ayHkI',false,false,false,0],['hc5tW',true,false,false,0],['h8b8a',false,false,false,100],['SdrcE',false,false,true,0],['Y8hCjn',false,true,true,0]]){
const anchor=script('Anchor',{items,activeHref:'#part-1',direction:horizontal?'horizontal':'vertical',replace,targetOffset:offset,background:custom?'#ffFBE680':'#00000000'},horizontal?1622:554,horizontal?32:200);
let children;
if(horizontal)children=[{type:'rectangle',name:'Part 1',x:0,y:72,width:1662,height:200,fill:'#00ff0005'},{...anchor,x:20,y:20}];
else{const scene={type:'frame',name:'Scroll sections',width:1108,height:600,layout:'vertical',children:['#ff0000','#00ff00','#0000ff'].map((c,k)=>({type:'rectangle',name:'Part '+(k+1),width:1108,height:200,fill:c+(custom?'14':'05')}))};const left=script('Col',{span:16,childrenContent:JSON.stringify(scene)},1108,600),right=script('Col',{span:8,childrenContent:JSON.stringify(anchor)},554,200);children=[script('Row',{col1:JSON.stringify(left),span1:16,height1:600,col2:JSON.stringify(right),span2:8,height2:200},1662,600)];}
code+=`Replace('${id}',${JSON.stringify({type:'frame',name:'Official embedded Anchor demo',width:'fill_container',height:200,layout:'none',clip:true,fill:'#fff',children})});\n`;
}
code+=`for(const id of ['INdEN','IiXKW','O4YM6P','F8uU8','KB51k'])Update(id,{width:'fill_container'});for(const id of ['Vazod','KEK3d','jmLWn','vAVVq','KeATY'])Update(id,{width:1578});Print('Embedded Anchor scenes installed');`;
fs.writeFileSync('scripts/navigation/fix-embedded.pencil.js',code);
