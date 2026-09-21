/**
 * @schema 2.18
 * @input options: string = "[\"Movies\",\"Books\",\"Music\",\"Sports\"]"
 * @input value: string = "Books"
 * @input multiple: boolean = false
 * @input disabled: boolean = false
 * @input styles: string = "{}"
 */
const i=pencil.input||{};let options=[],styles={},value=i.value;try{options=JSON.parse(i.options)}catch{}try{styles=JSON.parse(i.styles||'{}')}catch{}if(i.multiple)try{value=JSON.parse(i.value)}catch{value=[]}
const root=styles.root||{},item=styles.item||{},gap=root.gap??8,padding=root.padding??0,px=root.paddingInline??padding,py=root.paddingBlock??padding;let x=px;
const textWidth=value=>[...String(value)].reduce((w,c)=>w+(/[\u2E80-\u9FFF]/.test(c)?12:c==='M'?10.5:c==='W'?11:/[BDS]/.test(c)?8:/[iltj]/.test(c)?3:/[rf]/.test(c)?4.5:/[A-Z]/.test(c)?7.5:7),.5);
return [{type:'frame',name:'CheckableTagGroup',width:pencil.width,height:pencil.height,layout:'none',fill:root.backgroundColor||'#00000000',cornerRadius:root.borderRadius||0,children:options.map(o=>{if(typeof o!=='object')o={label:String(o),value:o};const style={...item,...o.style},width=style.width||Math.ceil(textWidth(o.label)+14),height=style.height||22,n={type:'ref',ref:'XILpC',scriptUri:'../canvas-components/Tag.CheckableTag.js',name:'Tag.CheckableTag · '+o.label,x,y:py,width,height,inputs:{children:o.label,checked:i.multiple?value.includes(o.value):value===o.value,disabled:!!i.disabled,styles:JSON.stringify({root:style})}};x+=width+gap;return n})}];
