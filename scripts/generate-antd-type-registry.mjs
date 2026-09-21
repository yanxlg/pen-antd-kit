import ts from 'typescript';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const version = JSON.parse(await readFile(`${root}node_modules/antd/package.json`, 'utf8')).version;
const indexFile = `${root}node_modules/antd/es/index.d.ts`;
const options = { skipLibCheck: true, strict: true, esModuleInterop: true, moduleResolution: ts.ModuleResolutionKind.Node10, jsx: ts.JsxEmit.React };
const discovery = ts.createProgram([indexFile], options);
const dc = discovery.getTypeChecker();
const source = discovery.getSourceFile(indexFile);
const exports = dc.getExportsOfModule(dc.getSymbolAtLocation(source));
const names = exports
  .filter(s => /^[A-Z]/.test(s.name) && s.declarations?.some(d => ts.isExportSpecifier(d) && !d.parent.parent.isTypeOnly))
  .map(s => s.name);
const componentPaths = [];
function discover(path, type, depth = 0) {
  componentPaths.push(path);
  if (depth >= 2) return;
  for (const prop of type.getProperties()) {
    if (!/^[A-Z]/.test(prop.name)) continue;
    const pt = dc.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration ?? prop.declarations?.[0] ?? source);
    if (pt.getCallSignatures().length || pt.getConstructSignatures().length) discover(`${path}.${prop.name}`, pt, depth + 1);
  }
}
for (const name of names) {
  if (name === 'Grid') continue;
  const s = exports.find(s => s.name === name);
  discover(name, dc.getTypeOfSymbolAtLocation(s, source));
}
const temp = `${root}scripts/.antd-props-source.ts`;
const aliasSource = `import * as A from 'antd';\n${componentPaths.map((path, n) => `type P${n} = A.GetProps<typeof A.${path}>;`).join('\n')}\ntype Message = A.MessageArgsProps;\ntype Notification = A.NotificationArgsProps;\n`;
await writeFile(temp, aliasSource);
try {
  const program = ts.createProgram([temp], options);
  const checker = program.getTypeChecker();
  const src = program.getSourceFile(temp);
  const diagnostics = program.getSemanticDiagnostics(src);
  if (diagnostics.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics, { getCanonicalFileName: s => s, getCurrentDirectory: () => root, getNewLine: () => '\n' }));
  const declarations = src.statements.filter(ts.isTypeAliasDeclaration);
  const describeType = (type, declaration) => checker.typeToString(type, declaration, ts.TypeFormatFlags.NoTruncation);
  const nonNullableParts = type => (type.isUnion() ? type.types : [type]).filter(t => !(t.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null | ts.TypeFlags.Never)));
  function controlFor(type, name, typeText) {
    const parts = nonNullableParts(type);
    const callable = parts.filter(t => t.getCallSignatures().length);
    if (/^on[A-Z]/.test(name) || (parts.length && callable.length === parts.length)) return { type: 'runtime', editable: false, binding: 'callback' };
    if (['ref', 'getContainer', 'getPopupContainer', 'target', 'form'].includes(name) && !parts.every(t => t.flags & ts.TypeFlags.StringLike)) return { type: 'runtime', editable: false, binding: 'runtime' };
    if (/ReactNode|ReactElement/.test(typeText) || ['children', 'icon', 'prefix', 'suffix'].includes(name)) return { type: 'slot', editable: true, encoding: 'json-or-text' };
    if (parts.length && parts.every(t => t.flags & ts.TypeFlags.BooleanLike)) return { type: 'boolean', editable: true };
    if (parts.length && parts.every(t => t.flags & (ts.TypeFlags.StringLiteral | ts.TypeFlags.NumberLiteral))) return { type: 'enum', editable: true, options: [...new Set(parts.map(t => t.value))] };
    if (parts.length && parts.every(t => t.flags & ts.TypeFlags.NumberLike)) return { type: 'number', editable: true };
    if (parts.length && parts.every(t => t.flags & ts.TypeFlags.StringLike)) return { type: 'string', editable: true };
    if (/Dayjs/.test(typeText) && !callable.length) return { type: 'date', editable: true, encoding: 'iso-or-json-array' };
    return { type: 'structured', editable: true, encoding: 'json', ...(callable.length ? { acceptsCallback: true } : {}) };
  }
  function propsOf(decl) {
    const type = checker.getTypeFromTypeNode(decl.type);
    const variants = type.isUnion() ? type.types : [type];
    const props = new Map();
    for (const variant of variants) for (const property of variant.getProperties()) {
      if (['ref', 'key'].includes(property.name)) continue;
      const d = property.valueDeclaration ?? property.declarations?.[0] ?? decl;
      const pt = checker.getTypeOfSymbolAtLocation(property, d);
      const previous = props.get(property.name);
      const typeText = describeType(pt, decl);
      const tags = property.getJsDocTags(checker);
      const prop = { name: property.name, type: typeText, required: !(property.flags & ts.SymbolFlags.Optional), description: ts.displayPartsToString(property.getDocumentationComment(checker)), control: controlFor(pt, property.name, typeText) };
      const deprecated = tags.find(t => t.name === 'deprecated');
      if (deprecated) prop.deprecated = ts.displayPartsToString(deprecated.text) || true;
      if (previous && previous.type !== prop.type) {
        prop.type = `${previous.type} | ${prop.type}`;
        prop.control = { type: 'structured', editable: true, encoding: 'json' };
      }
      props.set(property.name, prop);
    }
    return [...props.values()].sort((a,b) => a.name.localeCompare(b.name));
  }
  const components = Object.fromEntries(componentPaths.map((name,n) => [name, { name, manifest: `antd/${name}`, kind: 'component', parent: name.includes('.') ? name.split('.')[0] : null, propsType: `GetProps<typeof ${name}>`, props: propsOf(declarations[n]) }]));
  for (const name of ['Message', 'Notification']) components[name] = { name, manifest: `antd/${name}`, kind: 'service', parent: null, propsType: `${name}ArgsProps`, props: propsOf(declarations.find(d => d.name.text === name)) };
  components.Grid = { name: 'Grid', manifest: 'antd/Grid', kind: 'hooks', parent: null, propsType: null, props: [], methods: ['useBreakpoint'] };
  const output = { library: 'antd', version, source: 'installed antd TypeScript declarations', components };
  await writeFile(new URL(`../registry/props.antd-${version}.json`, import.meta.url), JSON.stringify(output, null, 2) + '\n');
  console.log(`Generated ${Object.keys(components).length} components/services including subcomponents; ${Object.values(components).reduce((n,c)=>n+c.props.length,0)} props`);
} finally { await unlink(temp); }
