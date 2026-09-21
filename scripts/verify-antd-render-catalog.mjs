import { readFile } from 'node:fs/promises';

const matrix = JSON.parse(await readFile(new URL('../registry/state-matrix.antd-6.6.4.json', import.meta.url), 'utf8'));
const catalog = await readFile(new URL('./samples/catalog.js', import.meta.url), 'utf8');
const missing = matrix.components.filter(({ name }) => !catalog.includes(`case '${name}'`)).map(({ name }) => name);
const invalid = matrix.components.filter(({ states }) => !states.length || states.some((state) => typeof state !== 'string' || !state.trim())).map(({ name }) => name);
if (missing.length || invalid.length) throw new Error(JSON.stringify({ missing, invalid }));
console.log(`Ant Design ${matrix.version}: ${matrix.components.length} render samples and ${matrix.components.reduce((n, c) => n + c.states.length, 0)} state cases`);
