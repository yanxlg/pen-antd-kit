import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import {setup} from './floatbutton-browser.mjs';
import {buttonInstance, buttonChildren, renderButton, manifest} from './button-composition.mjs';

const cases = [
  {}, {autoInsertSpace:true}, {autoInsertSpace:false},
  {type:'primary'}, {type:'dashed'}, {type:'text'}, {type:'link'},
  {color:'default',variant:'filled'}, {color:'default',variant:'text'}, {color:'primary',variant:'link'},
  {loading:true}, {disabled:true}, {icon:true}, {icon:true,loading:true},
  {children:'提交订单'}, {children:'确 定'}, {children:'确A'}, {children:'OK'},
];
const browser = await chromium.launch({channel:'chrome'});
try {
  const page = await browser.newPage();
  await setup(page);
  for (const test of cases) {
    const props = {children:'确定', ...test};
    const actual = await page.evaluate(props => {
      const icon = props.icon ? React.createElement('span', null, '+') : undefined;
      ReactDOM.render(React.createElement(antd.Button, {...props, icon}), document.getElementById('root'));
      return document.querySelector('.ant-btn').lastElementChild.textContent;
    }, props);
    const node = buttonInstance({...props, icon:props.icon ? {type:'script',scriptUri:'../canvas-components/Icon.js',name:'Icon',inputs:{name:'SearchOutlined'}} : null});
    const label = renderButton({input:node.inputs,width:node.width,height:node.height}).find(n => n.name === 'children');
    assert.equal(label.content, actual, JSON.stringify(props));
    assert.equal(buttonChildren(node), props.children, 'Spacing must not mutate the children property');
  }
  const on = buttonInstance({children:'确定'}), off = buttonInstance({children:'确定',autoInsertSpace:false});
  assert.equal(on.width - off.width, 4);
  assert.equal(buttonInstance({children:'确定'}, {width:100}).width, 100);
  console.log(`PASS: ${cases.length} autoInsertSpace cases compared with Ant Design, plus unchanged children and width checks.`);
} finally {
  await browser.close();
}
