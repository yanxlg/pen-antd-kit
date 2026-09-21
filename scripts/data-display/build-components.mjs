import {writeFileSync} from 'node:fs';
import {plan} from './components-plan.mjs';
import {operation} from '../component-showcase/build.mjs';
writeFileSync('scripts/data-display/update-components.pencil.js',Object.keys(plan).map(name=>'{\n'+operation(name)+'\n}').join('\n'));
console.log('Generated Components-only cross-property showcase; Usage and Principles are not regenerated.');
