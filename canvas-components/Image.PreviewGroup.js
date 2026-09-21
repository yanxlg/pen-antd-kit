/**
 * @schema 2.18
 * @input children: string = ""
 * @input items: string = "[]"
 * @input preview: string = "true"
 */
const i=pencil.input||{};let children;try{children=JSON.parse(i.children)}catch{}
if(children)return Array.isArray(children)?children:[children];
return [0,1].map(n=>({type:'ref',ref:'tTT7M',x:n*168,y:0,width:160,height:160,inputs:{src:'images/ant.design/c1f5bcc0f96aaa3c.png'}}));
