import {plan as crossPlan} from '../component-showcase/plan.mjs';
const names=['Avatar','Badge','Calendar','Card','Carousel','Collapse','Descriptions','Empty','Image','Listy','Popover','QRCode','Segmented','Statistic','Table','Tag','Timeline','Tooltip','Tour','Tree'];
export const plan=Object.fromEntries(names.map(name=>[name,crossPlan[name].flatMap(group=>group.samples.map(s=>({...s,title:s.label})))]));
