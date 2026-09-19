/**
 * @schema 2.18
 * @input options: string = "[\"A\",\"B\",\"C\"]"
 * @input value: string = "A"
 * @input optionType: enum("default", "button") = "default"
 * @input buttonStyle: enum("outline", "solid") = "outline"
 * @input disabled: boolean = false
 * @input block: boolean = false
 * @input name: string = ""
 */
const i=pencil.input||{};
const parse=(value,fallback)=>{try{return JSON.parse(value)}catch{return fallback}};
const options=parse(i.options,["A","B","C"]), gap=i.optionType==='button'?0:24;
let x=0;
return options.map((option,index)=>{
 const item=typeof option==='string'?{label:option,value:option}:option;
 const label=String(item.label??item.value??'Option '+(index+1));
 const width=i.block?Math.max(1,(pencil.width-gap*(options.length-1))/options.length):Math.max(56,label.length*8+24);
 const node={type:'script',name:i.optionType==='button'?'Radio.Button':'Radio',scriptUri:i.optionType==='button'?'../canvas-components/Radio.Button.js':'../canvas-components/Radio.js',x,y:0,width,height:32,inputs:{children:label,checked:i.value===item.value,disabled:!!(i.disabled||item.disabled),buttonStyle:i.buttonStyle,compactPlacement:i.optionType==='button'?(index===0?'start':index===options.length-1?'end':'middle'):'none'}};
 x+=width+gap;
 return node;
});
