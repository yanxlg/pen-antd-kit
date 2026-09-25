/**
 * @schema 2.18
 * @input options: string = "[\"A\",\"B\",\"C\"]"
 * @input value: string = ""
 * @input optionType: enum("default", "button") = "default"
 * @input buttonStyle: enum("outline", "solid") = "outline"
 * @input disabled: boolean = false
 * @input block: boolean = false
 * @input name: string = ""
 */
const i=pencil.input||{};
const parse=(value,fallback)=>{try{return JSON.parse(value)}catch{return fallback}};
const options=parse(i.options,["A","B","C"]),isButton=i.optionType==='button',gap=isButton?0:24,overlap=isButton?1:0;
let x=0;
const nodes=options.map((option,index)=>{
 const item=typeof option==='string'?{label:option,value:option}:option;
 const label=String(item.label??item.value??'Option '+(index+1));
 const width=i.block?Math.max(1,(pencil.width+overlap*(options.length-1)-gap*(options.length-1))/options.length):Math.max(56,Number(item.width)||label.length*8+24);
 const node={type:'script',name:isButton?'Radio.Button':'Radio',scriptUri:isButton?'../canvas-components/Radio.Button.js':'../canvas-components/Radio.js',x,y:0,width,height:pencil.height||32,inputs:{children:label,checked:Boolean(i.value && i.value===item.value),disabled:!!(i.disabled||item.disabled),buttonStyle:i.buttonStyle,compactPlacement:isButton?(index===0?'start':index===options.length-1?'end':'middle'):'none'}};
 x+=width+gap-overlap;
 return node;
});
return nodes.sort((a,b)=>Number(a.inputs.checked)-Number(b.inputs.checked));
