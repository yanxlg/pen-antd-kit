/**
 * @schema 2.18
 * @input options: string = "[\"Apple\",\"Pear\",\"Orange\"]"
 * @input value: string = "[\"Pear\"]"
 * @input disabled: boolean = false
 * @input name: string = ""
 */
const i=pencil.input||{};
const parse=(value,fallback)=>{try{return JSON.parse(value)}catch{return fallback}};
const options=parse(i.options,["Apple","Pear","Orange"]), selected=parse(i.value,["Pear"]);
let x=0;
return options.map((option,index)=>{
 const item=typeof option==='string'?{label:option,value:option}:option;
 const label=String(item.label??item.value??'Option '+(index+1));
 const width=Math.max(56,label.length*8+24);
 const node={type:'script',name:'Checkbox',scriptUri:'../canvas-components/Checkbox.js',x,y:0,width,height:32,inputs:{children:label,checked:selected.includes(item.value),disabled:!!(i.disabled||item.disabled)}};
 x+=width+24;
 return node;
});
