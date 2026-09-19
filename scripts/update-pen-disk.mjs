import fs from 'fs';
import { buildIconPlacementContent, buildSizeContent } from './flatten-usage-examples.mjs';

const penPath = './libraries/antd-6.lib.pen';
const raw = fs.readFileSync(penPath, 'utf-8');
const pen = JSON.parse(raw);

function findNode(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
}

// 1. Update PVLla (Icon Placement)
const pvlla = findNode(pen, 'PVLla');
if (pvlla) {
  console.log('Found PVLla, original children:', pvlla.children.map(c => c.id));
  // Filter out toggle and divider
  pvlla.padding = [24, 24, 24, 24];
  pvlla.gap = 20;
  pvlla.children = [buildIconPlacementContent()];
  console.log('Updated PVLla with flattened icon placement content.');
} else {
  console.error('PVLla not found!');
}

// 2. Update PpMzt (Size)
const ppmzt = findNode(pen, 'PpMzt');
if (ppmzt) {
  console.log('Found PpMzt, original children:', ppmzt.children.map(c => c.id));
  // Filter out toggle and divider
  ppmzt.padding = [24, 24, 24, 24];
  ppmzt.gap = 20;
  ppmzt.children = [buildSizeContent()];
  console.log('Updated PpMzt with flattened size content.');
} else {
  console.error('PpMzt not found!');
}

fs.writeFileSync(penPath, JSON.stringify(pen, null, 2));
console.log('antd-6.lib.pen written successfully.');
