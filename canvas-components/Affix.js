/**
 * @schema 2.18
 * @input children: string = ""
 * @input offsetTop: number = 0
 * @input offsetBottom: number = 0
 */
const i=pencil.input||{};
if(!i.children)return [];
let child;try{child=JSON.parse(i.children)}catch{child={type:"ref",ref:i.children}}
return [{...child,x:0,y:0,width:pencil.width,height:pencil.height}];
