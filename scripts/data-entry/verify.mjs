import assert from 'node:assert/strict';
import fs from 'node:fs';
import { dataEntryComponents, componentDefaults, componentSizes, componentVariants } from './config.mjs';

function validateNodes(name, state, nodes) {
  assert(Array.isArray(nodes), `${name}.${state} did not return a node array`);
  if (name !== 'Upload') assert(nodes.length > 0, `${name}.${state} renders no nodes`);
  for (const node of nodes) {
    for (const key of ['x', 'y', 'width', 'height']) assert(Number.isFinite(node[key]), `${name}.${state}.${key} is invalid`);
    assert(['rectangle', 'ellipse', 'text', 'path', 'script', 'frame', 'ref'].includes(node.type), `${name}.${state} renders unsupported node type ${node.type}`);
    if (node.type === 'path') {
      assert(typeof node.geometry === 'string' && node.geometry.length > 0, `${name}.${state} path is missing geometry`);
      assert(Array.isArray(node.viewBox) && node.viewBox.length === 4, `${name}.${state} path is missing viewBox`);
    }
    if (node.type === 'script') {
      assert(node.scriptUri, `${name}.${state} nested script is missing scriptUri`);
      const nested = new URL(node.scriptUri.replace('../canvas-components/', '../../canvas-components/'), import.meta.url);
      assert(fs.existsSync(nested), `${name}.${state} nested renderer does not exist: ${node.scriptUri}`);
    }
  }
}

for (const name of dataEntryComponents) {
  const file = new URL(`../../canvas-components/${name}.js`, import.meta.url);
  assert(fs.existsSync(file), `${name} renderer is missing`);
  const source = fs.readFileSync(file, 'utf8');
  assert(source.includes('@schema 2.18'), `${name} has no editable property schema`);
  const render = new Function('pencil', source);
  const [width, height] = componentSizes[name];
  validateNodes(name, 'Default', render({ input: componentDefaults[name], width, height }));
  for (const [state, overrides] of componentVariants[name]) {
    validateNodes(name, state, render({ input: { ...componentDefaults[name], ...overrides }, width, height }));
  }
  assert(componentVariants[name].length >= 3, `${name} needs representative configured instances`);
}

const selectSource = fs.readFileSync(new URL('../../canvas-components/Select.js', import.meta.url), 'utf8');
const renderSelect = new Function('pencil', selectSource);
const hoveredClearSelect = renderSelect({ input: { value: 'Lucy', options: 'Jack|Lucy|Tom', allowClear: true, hovered: true }, width: 240, height: 32 });
assert(hoveredClearSelect.some(node => node.type === 'ellipse' && node.fill === '#00000040'), 'Hovered clearable Select exposes its clear affordance');
const idleClearSelect = renderSelect({ input: { value: 'Lucy', options: 'Jack|Lucy|Tom', allowClear: true, hovered: false }, width: 240, height: 32 });
assert(!idleClearSelect.some(node => node.type === 'ellipse' && node.fill === '#00000040'), 'Idle Select keeps the dropdown arrow instead of forcing a clear affordance');
const openSelectedSelect = renderSelect({ input: { value: 'Lucy', options: 'Jack|Lucy|Tom', open: true }, width: 240, height: 140 });
const selectedOption = openSelectedSelect.find(node => node.type === 'text' && node.content === 'Lucy' && node.y > 32);
assert.equal(selectedOption.fill, '#000000E0', 'Selected option keeps the official text color');
assert.equal(selectedOption.fontWeight, '600', 'Selected option uses the official strong weight');

const inputSource = fs.readFileSync(new URL('../../canvas-components/Input.js', import.meta.url), 'utf8');
const renderInput = new Function('pencil', inputSource);
const suffixedInput = renderInput({ input: { value: '99', suffix: 'RMB', allowClear: false }, width: 240, height: 32 });
assert(suffixedInput.some(node => node.type === 'text' && node.content === 'RMB'), 'Input renders its configured suffix');
const underlinedInput = renderInput({ input: { value: 'Ant Design', variant: 'underlined' }, width: 240, height: 32 });
assert.equal(underlinedInput[0].stroke, '#00000000', 'Underlined Input removes the surrounding border');
assert.equal(underlinedInput[1].height, 1, 'Underlined Input renders a single bottom rule');

const rangePickerSource = fs.readFileSync(new URL('../../canvas-components/DatePicker.RangePicker.js', import.meta.url), 'utf8');
const renderRangePicker = new Function('pencil', rangePickerSource);
const selectedRange = renderRangePicker({ input: { value: '2026-09-18', endValue: '2026-09-21' }, width: 320, height: 32 });
assert.equal(selectedRange.find(node => node.content === '2026-09-18').fill, '#000000E0', 'RangePicker start value uses selected-value color');
assert.equal(selectedRange.find(node => node.content === '2026-09-21').fill, '#000000E0', 'RangePicker end value uses selected-value color');

const checkboxSource = fs.readFileSync(new URL('../../canvas-components/Checkbox.js', import.meta.url), 'utf8');
const renderCheckbox = new Function('pencil', checkboxSource);
const checked = renderCheckbox({ input: { children: 'Checkbox', checked: true }, width: 160, height: 32 });
assert(checked.some(node => node.type === 'path' && node.geometry && node.viewBox), 'Checkbox checked mark must be a valid Pencil path');
const mixed = renderCheckbox({ input: { children: 'Checkbox', indeterminate: true }, width: 160, height: 32 });
assert.equal(mixed[0].fill, '#FFFFFF', 'Indeterminate Checkbox keeps the official white outer box');
assert.equal(mixed[1].width, 8, 'Indeterminate Checkbox uses the official centered 8px mark');
const disabledChecked = renderCheckbox({ input: { children: 'Checkbox', checked: true, disabled: true }, width: 160, height: 32 });
assert.equal(disabledChecked[0].fill, '#F5F5F5', 'Disabled checked Checkbox uses the official disabled fill');
const disabledUnchecked = renderCheckbox({ input: { children: 'Checkbox', checked: false, disabled: true }, width: 160, height: 32 });
assert.equal(disabledUnchecked[0].fill, '#F5F5F5', 'Disabled unchecked Checkbox uses the official disabled fill');

const radioSource = fs.readFileSync(new URL('../../canvas-components/Radio.js', import.meta.url), 'utf8');
const renderRadio = new Function('pencil', radioSource);
const disabledRadio = renderRadio({ input: { children: 'Radio', checked: true, disabled: true }, width: 160, height: 32 });
assert.equal(disabledRadio[0].fill, '#F5F5F5', 'Disabled Radio uses the official disabled surface');
assert.equal(disabledRadio[1].fill, '#BFBFBF', 'Disabled checked Radio uses the official disabled dot color');

const cascaderSource = fs.readFileSync(new URL('../../canvas-components/Cascader.js', import.meta.url), 'utf8');
const renderCascader = new Function('pencil', cascaderSource);
assert(cascaderSource.includes('@input size: enum("small", "medium", "large")'), 'Cascader v6 schema uses medium rather than the legacy middle size');
const cascaderDefaults = componentDefaults.Cascader;
const selectedCascader = renderCascader({ input: { ...cascaderDefaults, value: '["zhejiang","hangzhou","west-lake"]' }, width: 184, height: 32 });
const selectedValueText = selectedCascader.find(node => node.type === 'text' && node.fill === '#000000E0');
assert.equal(selectedValueText.content, 'Zhejiang / Hangzhou…', 'Cascader resolves a path-array value and ellipsizes it within the selector');
assert.equal(selectedValueText.textGrowth, 'auto', 'Cascader selected text stays on one line after renderer-side ellipsis');
const customDisplayCascader = renderCascader({ input: { ...cascaderDefaults, value: '["zhejiang","hangzhou","west-lake"]', displayValue: 'Zhejiang / Hangzhou / West Lake (752100)', displayLinkText: '752100' }, width: 360, height: 32 });
const customDisplayFrame = customDisplayCascader.find(node => node.name === 'Selected value');
assert.deepEqual(customDisplayFrame.children.map(node => node.content), ['Zhejiang / Hangzhou / West Lake (', '752100', ')'], 'Cascader supports the official rich displayRender result');
assert.equal(customDisplayFrame.children[0].fill, '#000000E0', 'Custom displayRender main text uses selected-value color');
assert.equal(customDisplayFrame.children[1].fill, '#1677FF', 'Custom displayRender code uses the official link color');
assert.equal(customDisplayFrame.children[0].lineHeight, 1.5714, 'Custom displayRender uses the official 14px/22px typography');
const openCascader = renderCascader({ input: { ...cascaderDefaults, value: '["zhejiang","hangzhou","west-lake"]', open: true }, width: 184, height: 216 });
const popup = openCascader.find(node => node.name === 'Cascader popup');
assert.deepEqual([popup.width, popup.height], [333, 180], 'Cascader popup follows the official item width and dropdown height tokens');
assert.equal(openCascader.filter(node => node.type === 'rectangle' && node.fill === '#E6F4FF').length, 3, 'Cascader highlights the selected path in each active menu');
assert(openCascader.some(node => node.type === 'text' && node.content === 'West Lake' && node.fill === '#000000E0' && node.fontWeight === '600'), 'Selected Cascader options use official text color and weight');
const multipleCascader = renderCascader({ input: { ...cascaderDefaults, multiple: true, value: '[["zhejiang","hangzhou","west-lake"],["jiangsu","nanjing"]]' }, width: 320, height: 32 });
assert(multipleCascader.some(node => node.type === 'text' && node.content === 'West Lake'));
assert(multipleCascader.some(node => node.type === 'text' && node.content === 'Nanjing'));
assert.equal(multipleCascader.filter(node => node.type === 'text' && node.content === '×').length, 2, 'Multiple Cascader renders closable tags from selected paths');
const underlinedCascader = renderCascader({ input: { ...cascaderDefaults, variant: 'underlined' }, width: 184, height: 32 });
assert.equal(underlinedCascader[0].stroke, 'transparent');
assert.equal(underlinedCascader[1].height, 1, 'Underlined Cascader renders only its bottom border');
const clearCascader = renderCascader({ input: { ...cascaderDefaults, value: '["zhejiang"]', hovered: true }, width: 184, height: 32 });
assert(clearCascader.some(node => node.type === 'ellipse'), 'Hovered Cascader with a value exposes the official clear affordance');
const cascaderPanelSource = fs.readFileSync(new URL('../../canvas-components/Cascader.Panel.js', import.meta.url), 'utf8');
const renderCascaderPanel = new Function('pencil', cascaderPanelSource);
const cascaderPanel = renderCascaderPanel({ input: { options: cascaderDefaults.options, value: '["zhejiang","hangzhou","west-lake"]' }, width: 333, height: 180 });
assert.equal(cascaderPanel[0].name, 'Cascader panel');
assert.deepEqual([cascaderPanel[0].width, cascaderPanel[0].height], [333, 180], 'Cascader.Panel is a standalone three-column menu rather than a selector trigger');
assert(!cascaderPanel.some(node => node.type === 'text' && node.content === '⌄'), 'Cascader.Panel has no selector suffix');
const multiplePanel = renderCascaderPanel({ input: { options: cascaderDefaults.options, value: '[]', multiple: true }, width: 111, height: 180 });
assert.equal(multiplePanel.filter(node => node.type === 'rectangle' && node.width === 16 && node.height === 16).length, 2, 'Multiple Cascader.Panel renders one fixed-size Checkbox per visible option');
const emptyPanel = renderCascaderPanel({ input: { options: '[]', value: '[]' }, width: 111, height: 180 });
const panelEmpty = emptyPanel.find(node => node.type === 'ref' && node.ref === 'b0w4Mx');
assert(panelEmpty, 'Empty Cascader.Panel composes the canonical Empty component');
assert.deepEqual([panelEmpty.x, panelEmpty.y, panelEmpty.width, panelEmpty.height], [15.5, 55, 80, 70], 'Empty is centered inside Cascader.Panel');
assert.equal(panelEmpty.inputs.image, 'simple', 'Cascader.Panel uses Empty.PRESENTED_IMAGE_SIMPLE');
const emptyPopup = renderCascader({ input: { ...cascaderDefaults, options: '[]', open: true }, width: 184, height: 216 });
assert(emptyPopup.some(node => node.type === 'ref' && node.ref === 'b0w4Mx' && node.inputs.image === 'simple'), 'Empty Cascader popup composes the canonical simple Empty component');

const radioGroupSource = fs.readFileSync(new URL('../../canvas-components/Radio.Group.js', import.meta.url), 'utf8');
const renderRadioGroup = new Function('pencil', radioGroupSource);
const placementGroup = renderRadioGroup({ input: { options: '[{"label":"topLeft","value":"topLeft","width":80},{"label":"topRight","value":"topRight","width":88},{"label":"bottomLeft","value":"bottomLeft","width":104},{"label":"bottomRight","value":"bottomRight","width":112}]', value: 'topLeft', optionType: 'button', buttonStyle: 'outline' }, width: 381, height: 32 });
assert.equal(placementGroup.length, 4, 'Placement uses one Radio.Group with four Radio.Button children');
assert.equal(placementGroup.filter(node => node.inputs.checked).length, 1, 'Placement Radio.Group exposes its selected topLeft state');
assert.deepEqual(placementGroup.map(node => node.inputs.compactPlacement), ['middle', 'middle', 'end', 'start'], 'Radio.Group preserves compact edge roles while painting the selected button last');

const colorPickerSource = fs.readFileSync(new URL('../../canvas-components/ColorPicker.js', import.meta.url), 'utf8');
const renderColorPicker = new Function('pencil', colorPickerSource);
const clearColor = renderColorPicker({ input: { value: '', showText: false, size: 'middle' }, width: 32, height: 32 });
assert.equal(clearColor[0].width, 32, 'ColorPicker must use its actual canvas width');
assert.deepEqual([clearColor[1].x, clearColor[1].y, clearColor[1].width, clearColor[1].height], [4, 4, 24, 24], 'ColorPicker clear swatch matches the official inset');
assert.equal(clearColor[2].stroke, '#F5222D', 'ColorPicker clear mark uses the official red');
const largeColor = renderColorPicker({ input: { value: '#1677ff', showText: false, size: 'large' }, width: 40, height: 40 });
assert.deepEqual([largeColor[1].x, largeColor[1].y, largeColor[1].width, largeColor[1].height, largeColor[1].cornerRadius], [4, 4, 32, 32, 6], 'Large ColorPicker swatch matches official geometry');
const textColor = renderColorPicker({ input: { value: '#1677ff', showText: true, size: 'middle' }, width: 101, height: 32 });
assert.equal(textColor.at(-1).content, '#1677FF', 'Hex ColorPicker text uses the official uppercase display');

const inputNumberSource = fs.readFileSync(new URL('../../canvas-components/InputNumber.js', import.meta.url), 'utf8');
const renderInputNumber = new Function('pencil', inputNumberSource);
const basicNumber = renderInputNumber({ input: { value: 3, size: 'middle', variant: 'outlined' }, width: 160, height: 32 });
assert.equal(basicNumber.length, 2, 'Normal InputNumber must not show hover-only controls');
assert.equal(basicNumber[0].cornerRadius, 6, 'Middle InputNumber radius must match Ant Design');
const smallNumber = renderInputNumber({ input: { value: 3, size: 'small', variant: 'outlined' }, width: 160, height: 24 });
assert.equal(smallNumber[0].height, 24);
assert.equal(smallNumber[0].cornerRadius, 4);
const largeNumber = renderInputNumber({ input: { value: 3, size: 'large', variant: 'outlined' }, width: 160, height: 40 });
assert.equal(largeNumber[0].height, 40);
assert.equal(largeNumber[0].cornerRadius, 8);
const spinnerNumber = renderInputNumber({ input: { value: 3, mode: 'spinner', variant: 'outlined' }, width: 160, height: 32 });
assert(spinnerNumber.some(node => node.type === 'text' && node.content === '−'));
assert(spinnerNumber.some(node => node.type === 'text' && node.content === '+'));
const disabledErrorNumber = renderInputNumber({ input: { value: 3, disabled: true, status: 'error', variant: 'outlined' }, width: 160, height: 32 });
assert.equal(disabledErrorNumber[0].stroke, '#D9D9D9', 'Disabled InputNumber must override status border');

const switchSource = fs.readFileSync(new URL('../../canvas-components/Switch.js', import.meta.url), 'utf8');
const renderSwitch = new Function('pencil', switchSource);
assert(switchSource.includes('@input size: enum("medium", "small") = "medium"'), 'Switch v6 schema uses medium rather than the deprecated default size');
const defaultSwitch = renderSwitch({ input: { checked: true }, width: 44, height: 22 });
assert.deepEqual([defaultSwitch[0].width, defaultSwitch[0].height], [44, 22], 'Default Switch uses official 44x22 track');
assert.deepEqual([defaultSwitch[1].x, defaultSwitch[1].y, defaultSwitch[1].width, defaultSwitch[1].height], [24, 2, 18, 18], 'Default checked Switch uses official handle geometry');
const smallSwitch = renderSwitch({ input: { checked: true, size: 'small' }, width: 28, height: 16 });
assert.deepEqual([smallSwitch[0].width, smallSwitch[0].height], [28, 16], 'Small Switch uses official 28x16 track');
assert.deepEqual([smallSwitch[1].x, smallSwitch[1].y, smallSwitch[1].width, smallSwitch[1].height], [14, 2, 12, 12], 'Small checked Switch uses official handle geometry');
const loadingSwitch = renderSwitch({ input: { checked: true, loading: true }, width: 44, height: 22 });
assert(loadingSwitch.some(node => node.name === 'Switch loading indicator'), 'Loading Switch renders its indicator');
assert(loadingSwitch.every(node => node.opacity === 0.65), 'Loading Switch applies official root opacity to every rendered part');
const customTrack = renderSwitch({ input: { checked: false, size: 'small', trackColor: '#F5D2D2', unCheckedChildren: 'off' }, width: 40, height: 16 });
assert.equal(customTrack[0].fill, '#F5D2D2', 'Semantic styling can override an unchecked track color');
assert.equal(customTrack[0].width, 40, 'Imported semantic root width remains authoritative');
const customIndicator = renderSwitch({ input: { checked: true, size: 'small', customTrackHeight: 14, customHandleSize: 20, customHandleOffsetX: 5 }, width: 33, height: 14 });
assert.deepEqual([customIndicator[0].width, customIndicator[0].height, customIndicator[1].x, customIndicator[1].y, customIndicator[1].width], [33, 14, 16, -3, 20], 'Semantic styling can reproduce custom root and indicator geometry');

assert.equal(componentDefaults.Radio.children, 'Radio', 'Generated Radio instances use the renderer children prop');
const uploadSource = fs.readFileSync(new URL('../../canvas-components/Upload.js', import.meta.url), 'utf8');
const renderUpload = new Function('pencil', uploadSource);
const upload = renderUpload({ input: { children: 'Click to Upload' }, width: 320, height: 32 });
assert(upload.some(node => node.type === 'text' && node.content === 'Click to Upload'), 'Upload renders its official children trigger');
const uploadDraggerSource = fs.readFileSync(new URL('../../canvas-components/Upload.Dragger.js', import.meta.url), 'utf8');
const uploadDragger = new Function('pencil', uploadDraggerSource)({ input: {}, width: 320, height: 160 });
assert(uploadDragger.some(node => node.name === 'Dragger surface'), 'Upload.Dragger owns the drag-and-drop variant');
const uploadPictureSource = fs.readFileSync(new URL('../../canvas-components/Upload.PictureCard.js', import.meta.url), 'utf8');
const uploadPicture = new Function('pencil', uploadPictureSource)({ input: {}, width: 104, height: 104 });
assert(uploadPicture.some(node => node.name === 'Picture trigger'), 'Upload.PictureCard owns the picture-card variant');
const installer = fs.readFileSync(new URL('./install.pencil.js', import.meta.url), 'utf8');
assert(installer.includes("type:'ref',ref:masterId"), 'Components states must reference the canonical component');
assert(!installer.includes('Replace(preview.id'), 'The generator must not overwrite Usage imported from official pages');
assert(!installer.includes("for(const n of [...(board.children||[])])Delete(n.id)"), 'The installer must not delete existing Components boards');
assert(installer.includes('if(!existingMaster)'), 'The installer only fills Components boards that have no canonical master');

const packageJson = JSON.parse(fs.readFileSync(new URL('../../package.json', import.meta.url), 'utf8'));
assert(!packageJson.scripts['generate:data-entry'].includes('generate-canvas-components.mjs'), 'Data Entry generation must not overwrite maintained renderers with the stale generic generator');

const library = JSON.parse(fs.readFileSync(new URL('../../libraries/antd-6.lib.pen', import.meta.url), 'utf8'));
const findNode = (node, id) => {
  if (node?.id === id) return node;
  for (const child of node?.children ?? []) {
    const match = findNode(child, id);
    if (match) return match;
  }
  return undefined;
};
const libraryRoot = { children: library.children };
assert.equal(findNode(libraryRoot, 'taGuQ')?.inputs?.variant, 'underlined', 'Variants demo uses the Cascader underlined renderer instead of overlapping imported DOM');
assert.equal(findNode(libraryRoot, 'h7TxfD')?.ref, 'H0DThz', 'Placement demo uses the canonical Radio.Group renderer');
assert.equal(findNode(libraryRoot, 'h7TxfD')?.inputs?.value, 'topLeft', 'Placement demo exposes the official selected Radio.Button');
assert.equal(findNode(libraryRoot, 'RrYbV')?.ref, 'F3IF3s', 'Panel demo uses the canonical Cascader.Panel renderer');
assert.equal(findNode(libraryRoot, 'wGU5i')?.inputs?.multiple, true, 'Panel demo preserves its official multiple state');
assert.equal(findNode(libraryRoot, 'TPdHc')?.inputs?.options, '[]', 'Panel demo preserves its official empty state');
assert.equal(findNode(libraryRoot, 'X08r02')?.inputs?.placeholder, 'Please select', 'Default value demo does not misuse placeholder text');
assert.equal(findNode(libraryRoot, 'X08r02')?.inputs?.value, '["zhejiang","hangzhou","west-lake"]', 'Default value demo stores the official selected path as value');
assert.equal(findNode(libraryRoot, 'Ehfbs')?.inputs?.value, '["zhejiang","hangzhou","west-lake"]', 'Custom render demo stores a real selected path');
assert.equal(findNode(libraryRoot, 'Ehfbs')?.inputs?.displayValue, 'Zhejiang / Hangzhou / West Lake (752100)', 'Custom render demo stores the displayRender output separately from placeholder');
console.log(`Verified ${dataEntryComponents.length} Data Entry renderers and variant configurations.`);
