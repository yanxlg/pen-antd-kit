import fs from 'node:fs';
import {renderNavigation} from './render.mjs';
const root=new URL('../../',import.meta.url);
const metrics=JSON.parse(fs.readFileSync(new URL('scripts/fonts/divider-metrics.json',root),'utf8'))['400'];
export const schemas={
 Anchor:['items: string = "[]"','direction: enum("vertical", "horizontal") = "vertical"','activeHref: string = ""','classNames: string = "{}"','styles: string = "{}"','affix: boolean = true','offsetTop: number = 0','targetOffset: number = 0','replace: boolean = false'],
 Breadcrumb:['items: string = "[]"','separator: string = "/"','classNames: string = "{}"','styles: string = "{}"'],
 Dropdown:['children: string = ""','label: string = "Hover me"','menu: string = "{}"','open: boolean = false','disabled: boolean = false','placement: enum("bottomLeft", "bottom", "bottomRight", "topLeft", "top", "topRight", "left", "leftTop", "leftBottom", "right", "rightTop", "rightBottom") = "bottomLeft"','arrow: boolean = false','trigger: enum("hover", "click", "contextMenu") = "hover"','triggerWidth: number = 120','triggerHeight: number = 32','popupWidth: number = 200','popupHeight: number = 104'],
 Menu:['items: string = "[]"','mode: enum("vertical", "horizontal", "inline") = "vertical"','theme: enum("light", "dark") = "light"','selectedKeys: string = "[]"','openKeys: string = "[]"','inlineCollapsed: boolean = false','inlineIndent: number = 24','dropdownMenu: boolean = false','selectable: boolean = true','multiple: boolean = false'],
 Pagination:['align: enum("start", "center", "end") = "start"','current: number = 1','total: number = 50','pageSize: number = 10','size: enum("small", "middle", "large") = "middle"','disabled: boolean = false','simple: boolean = false','readOnly: boolean = false','showSizeChanger: boolean = false','showQuickJumper: boolean = false','showLessItems: boolean = false','hideOnSinglePage: boolean = false','showTotal: enum("", "total", "range") = ""','previousLabel: string = ""','nextLabel: string = ""'],
 Steps:['items: string = "[]"','current: number = 0','initial: number = 0','size: enum("small", "middle") = "middle"','orientation: enum("horizontal", "vertical") = "horizontal"','titlePlacement: enum("horizontal", "vertical") = "horizontal"','type: enum("default", "navigation", "inline", "panel", "dot") = "default"','variant: enum("filled", "outlined") = "filled"','status: enum("wait", "process", "finish", "error") = "process"','maxCount: number = 0','percent: number = 0'],
 Tabs:['items: string = "[]"','activeKey: string = "1"','type: enum("line", "card", "editable-card") = "line"','size: enum("small", "middle", "large") = "middle"','tabPlacement: enum("top", "bottom", "start", "end") = "top"','centered: boolean = false','hideAdd: boolean = false','tabBarGutter: number = 32','indicatorAlign: enum("start", "center", "end") = "center"','indicatorSize: number = 0','extraStart: string = ""','extraEnd: string = ""','extraStartWidth: number = 0','extraEndWidth: number = 0','extraStartMargin: number = 0','extraEndMargin: number = 0','addIcon: string = ""','classNames: string = "{}"','styles: string = "{}"'],
};
for(const [name,inputs] of Object.entries(schemas)){
 const source='/**\n * @schema 2.18\n'+[...inputs,'primaryColor: color = #1677FF'].map(s=>' * @input '+s).join('\n')+'\n */\n'+renderNavigation.toString()+'\nreturn renderNavigation('+JSON.stringify(name)+',pencil.input||{},pencil.width,pencil.height,'+JSON.stringify(metrics)+');\n';
 fs.writeFileSync(new URL('canvas-components/'+name+'.js',root),source);
}
console.log('Generated seven Navigation component renderers.');
await import('./nested-controls.mjs');
