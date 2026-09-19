import { readFile, writeFile } from 'node:fs/promises';
const registry = JSON.parse(await readFile(new URL('../registry/props.antd-6.6.4.json', import.meta.url), 'utf8'));
const components = Object.fromEntries(Object.entries(registry.components).map(([name, component]) => [name, {
  ...component,
  component: name,
  version: registry.version,
  slots: component.props.filter(p => p.control.type === 'slot').map(p => p.name),
  runtimeState: component.props.filter(p => p.control.type === 'runtime').map(p => p.name),
}]));
await writeFile(new URL('../registry/inspector.antd-6.6.4.json', import.meta.url), JSON.stringify({
  schema: 'antd-pencil-inspector/v2', library: registry.library, version: registry.version, components,
  tokens: { global: ['colorPrimary', 'colorSuccess', 'colorWarning', 'colorError', 'colorText', 'colorTextSecondary', 'colorBgContainer', 'colorBorder', 'borderRadius', 'fontSize', 'controlHeight'], algorithms: ['defaultAlgorithm', 'darkAlgorithm', 'compactAlgorithm'] },
}, null, 2) + '\n');
console.log(`Generated Inspector for ${Object.keys(components).length} entries`);
