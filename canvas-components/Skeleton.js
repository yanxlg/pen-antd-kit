/**
 * @schema 2.18
 * @input active: boolean = false
 * @input avatar: boolean = false
 * @input paragraph: string = "{\"rows\":3}"
 * @input title: boolean = true
 * @input loading: boolean = true
 * @input round: boolean = false
 * @input children: string = ""
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),nodes=[];
const text=(content,x,y,width,height=22,size=14,color='#000000E0',weight='400',align='left')=>({type:'text',name:String(content||'Text'),content:String(content||''),x,y,width,height,textGrowth:'fixed-width-height',fontFamily:'Inter',fontSize:size,fontWeight:weight,textAlign:align,textAlignVertical:'middle',lineHeight:1.5714,fill:color});
const box=(x,y,width,height,fill='#FFFFFF',radius=0,stroke='#00000000')=>({type:'rectangle',name:'Surface',x,y,width:Math.max(0,width),height:Math.max(0,height),fill:i.active&&fill==='#F0F0F0'?{type:'gradient',gradientType:'linear',rotation:90,colors:[{color:'#F0F0F0',position:.25},{color:'#D9D9D9',position:.37},{color:'#F0F0F0',position:.63}]}:fill,cornerRadius:radius,stroke,strokeWidth:stroke==='#00000000'?0:1,strokeAlignment:'inner'});
const icon=(name,x,y,size,color)=>({type:'ref',name:'Icon · '+name,ref:'antd-icon-live-origin',x,y,width:size,height:size,inputs:{type:name,name,fontSize:size,color}});
const button=(label,x,y,width=70,primary=false,size='middle')=>({type:'ref',name:'Button · '+label,ref:'DQZzq',x,y,width,height:size==='small'?24:32,inputs:{children:label,type:primary?'primary':'default',size}});
const child=(value,x,y,width,height)=>{if(!value)return;let n;try{n=JSON.parse(value)}catch{n={type:'text',name:'children',content:String(value),fontFamily:'Inter',fontSize:14,fill:'#000000E0',textGrowth:'fixed-width'}}if(n&&typeof n==='object')nodes.push({...n,x,y,width,height});};

if(i.loading===false){child(i.children,0,0,W,H);return nodes;}let paragraph={rows:3};try{paragraph=JSON.parse(i.paragraph||'{"rows":3}')}catch{}const rows=paragraph===false?0:Math.max(0,paragraph.rows??3);const left=i.avatar?56:0,contentW=W-left,c='#F0F0F0',r=i.round?100:4;if(i.avatar)nodes.push({type:'ref',name:'Skeleton.Avatar',ref:'q4tGS',x:0,y:0,width:40,height:40,inputs:{size:'large',shape:'circle'}});let y=0;if(i.title!==false){nodes.push(box(left,8,contentW*.38,16,c,r));y=48;}for(let n=0;n<rows;n++)nodes.push(box(left,y+n*32,contentW*(n===rows-1?.61:1),16,c,r));

return nodes;
