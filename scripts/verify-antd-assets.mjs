import fs from 'node:fs';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const readJson=async path=>JSON.parse(await readFile(new URL(path,root),'utf8'));
const pkg=await readJson('node_modules/antd/package.json');
const source=await readFile(new URL('node_modules/antd/es/index.d.ts',root),'utf8');
const expected=[...source.matchAll(/^export \{ default as (\w+) \}/gm)].map(match=>match[1]).filter(name=>!['message','notification','theme','version'].includes(name));
const registry=await readJson(`registry/props.antd-${pkg.version}.json`);
const inspector=await readJson(`registry/inspector.antd-${pkg.version}.json`);
const icons=await readJson('registry/icon-component-values.json');
const componentDir=new URL('canvas-components/',root);
const files=new Set(fs.readdirSync(componentDir).filter(file=>file.endsWith('.js')).map(file=>file.slice(0,-3)));
const missingFiles=expected.filter(name=>!files.has(name));
const missingRegistry=expected.filter(name=>!registry.components[name]);
const missingInspector=Object.keys(registry.components).filter(name=>!inspector.components[name]||inspector.components[name].props.length!==registry.components[name].props.length);
const missingIconFiles=Object.values(icons).filter(value=>!fs.existsSync(new URL(`canvas-components/icons/${value.name}.js`,root))).map(value=>value.name);
const invalidIcons=Object.entries(icons).filter(([,value])=>!value.name||value.fontSize!==24||value.color!=='#1677FF').map(([id])=>id);
const runtimeErrors=[];
const emptyByDesign=new Set(['Affix','App','Breadcrumb','Col','Flex','Masonry','Popover','Row','Space','Splitter','Steps','Tooltip','Tour','Upload']);
for(const name of expected){
  const path=new URL(`canvas-components/${name}.js`,root);
  try{
    const code=await readFile(path,'utf8');
    const defaults={};
    for(const match of code.matchAll(/@input (\w+): .*? = (.+)/g)){try{defaults[match[1]]=JSON.parse(match[2]);}catch{defaults[match[1]]=match[2];}}
    const result=new vm.Script(`(function(pencil){${code}})(pencil)`).runInNewContext({pencil:{input:defaults,width:360,height:160}},{timeout:1000});
    if(!Array.isArray(result)||(!result.length&&!emptyByDesign.has(name)))throw new Error('renderer returned no nodes');
  }catch(error){runtimeErrors.push(`${name}: ${error.message}`);}
}
if(registry.version!==pkg.version||inspector.version!==pkg.version||missingFiles.length||missingRegistry.length||missingInspector.length||missingIconFiles.length||invalidIcons.length||runtimeErrors.length){
  throw new Error(JSON.stringify({version:pkg.version,missingFiles,missingRegistry,missingInspector,iconCount:Object.keys(icons).length,missingIconFiles:missingIconFiles.slice(0,20),invalidIcons:invalidIcons.slice(0,20),runtimeErrors}));
}
console.log(`Ant Design ${pkg.version}: ${expected.length} public exports, ${Object.keys(registry.components).length} component/subcomponent contracts, ${Object.keys(icons).length} icon components, and ${expected.length} default canvas runtimes verified.`);
