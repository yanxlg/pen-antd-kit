/**
 * @schema 2.18
 * @input dataSource: string = "[{\"key\":\"1\",\"name\":\"John Brown\",\"age\":32,\"address\":\"New York\"}]"
 * @input columns: string = "[{\"title\":\"Name\",\"dataIndex\":\"name\"},{\"title\":\"Age\",\"dataIndex\":\"age\"},{\"title\":\"Address\",\"dataIndex\":\"address\"}]"
 * @input bordered: boolean = false
 * @input size: enum("small", "middle", "large") = "large"
 * @input showHeader: boolean = true
 * @input loading: boolean = false
 * @input pagination: boolean = true
 * @input virtual: boolean = false
 * @input rowSelection: string = "{}"
 * @input scroll: string = "{}"
 * @input locale: string = "{}"
 */
const i=pencil.input||{},W=Math.max(1,pencil.width),H=Math.max(1,pencil.height),parse=(s,d)=>{try{return JSON.parse(s)}catch{return d}},data=parse(i.dataSource,[]),columns=parse(i.columns,[]),cols=Array.isArray(columns)?columns:[],scroll=parse(i.scroll,{}),nodes=[],rh=i.size==='small'?39:i.size==='middle'?47:55,total=cols.reduce((a,c)=>a+(Number(c.width)||W/Math.max(1,cols.length)),0)||W,ratio=Math.max(W,Number(scroll.x)||0)/total;
const fit=(n,w)=>{const r=w/(Number(n.width)||w),walk=v=>{const a={...v};if(typeof a.width==='number')a.width*=r;if(typeof a.x==='number')a.x*=r;if(a.children)a.children=a.children.map(walk);return a};return {...walk(n),width:w}};
const text=(s,x,y,w,h,header=false)=>({type:'text',content:String(s??''),x,y,width:Math.max(1,w),height:h,textGrowth:'fixed-width-height',fontFamily:'Alibaba Sans',fontSize:14,fontWeight:header?'600':'400',lineHeight:1.57,fill:'#000000E0',textAlignVertical:'middle'});
let head=0;if(i.showHeader!==false){let x=0;head=Math.max(rh,...cols.map(c=>Number(c.title?.height)||0));for(const c of cols){const w=(Number(c.width)||total/cols.length)*ratio,title=c.title;if(title?.type)nodes.push({...fit(title,w),x,y:0});else {nodes.push({type:'rectangle',x,y:0,width:w,height:head,fill:'#FAFAFA',stroke:'#F0F0F0',strokeWidth:{bottom:1}});nodes.push(text(title,x+16,0,w-32,head,true));}x+=w;}}
const body=[];let y=0;data.forEach((record,j)=>{if(i.virtual&&y>Number(scroll.y||H))return;const h=Math.max(rh,...cols.map(c=>Number(c.onCell?.[j]?.style?.height)||0));let x=0;for(const c of cols){const w=(Number(c.width)||total/cols.length)*ratio,value=Array.isArray(c.render)?c.render[j]:record[c.dataIndex],cell=c.onCell?.[j]||{},span=cell.rowSpan??1,colSpan=cell.colSpan??1;if(span===0||colSpan===0){x+=w;continue;}const cellH=h*span,cellW=colSpan===1?w:w+(cols[cols.indexOf(c)+1]?.width||0)*ratio;if(value?.type){body.push({...fit(value,w),x,y});}else if(value!==null){body.push({type:'rectangle',x,y,width:cellW,height:cellH,fill:'#FFFFFF',stroke:'#F0F0F0',strokeWidth:i.bordered?1:{bottom:1}});body.push(text(value,x+16,y,cellW-32,cellH));}x+=w;}y+=h;});
const bodyHeight=Number(scroll.y)||y;nodes.push({type:'frame',x:0,y:head,width:W,height:Math.max(1,bodyHeight),layout:'none',clip:true,children:body});
if(!data.length){const empty=parse(i.locale,{}).emptyText||{type:'ref',ref:'b0w4Mx',width:W,height:70,inputs:{image:'simple'}};nodes.push({...empty,x:0,y:head+16,width:W});}
if(i.loading)nodes.push({type:'ref',ref:'puR2r',x:W/2-16,y:head+bodyHeight/2-16,width:32,height:32,inputs:{spinning:true}});
if(i.pagination)nodes.push({type:'ref',ref:'Y9L6l',x:Math.max(0,W-260),y:head+bodyHeight+16,width:260,height:32,inputs:{total:data.length,pageSize:10,current:1,showSizeChanger:false,showQuickJumper:false}});return nodes;
