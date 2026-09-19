/**
 * @schema 2.18
 * @input title: string = "Error"
 * @input description: string = ""
 * @input children: string = ""
 */
const i=pencil.input||{};
if(i.children){let child;try{child=JSON.parse(i.children)}catch{child={type:'text',content:i.children,fontFamily:'Inter',fontSize:14,fill:'#000000E0'}}return [{...child,x:0,y:0,width:pencil.width,height:pencil.height}];}
return [{type:'ref',name:'Alert',ref:'rS4lY',x:0,y:0,width:pencil.width,height:pencil.height,inputs:{title:i.title,description:i.description,type:'error',showIcon:true}}];
