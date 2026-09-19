# Component selection

Use the smallest Ant Design component that expresses the product intent. Keep the component's public name in the design metadata.

| Product intent | Preferred components | Notes |
|---|---|---|
| Primary action | `Button` | Use `type`, `size`, `danger`, `loading`, `disabled`, `icon`, and `block`. |
| Text entry | `Input`, `InputNumber`, `Input.TextArea`, `AutoComplete` | Use status and disabled/readOnly states. |
| Choice | `Select`, `Radio`, `Checkbox`, `Switch`, `Segmented` | Store options as structured items. |
| Date/time | `DatePicker`, `RangePicker`, `TimePicker`, `Calendar` | State the locale and range semantics. |
| Data display | `Table`, `List`, `Descriptions`, `Statistic`, `Tree` | Define loading, empty, error, pagination, and selection. |
| Page structure | `Layout`, `Header`, `Sider`, `Content`, `Footer`, `Space`, `Flex`, `Row`, `Col`, `Grid` | Prefer Slots and responsive constraints. |
| Feedback | `Alert`, `Message`, `Notification`, `Progress`, `Result`, `Spin`, `Skeleton` | `Message` and `Notification` need a trigger/context note. |
| Overlay | `Modal`, `Drawer`, `Popover`, `Tooltip`, `Dropdown`, `Tour` | Model open/closed state and trigger. |
| Navigation | `Menu`, `Tabs`, `Breadcrumb`, `Pagination`, `Steps`, `Anchor` | Preserve item keys and active state. |
| Data entry structure | `Form`, `Form.Item`, `Upload`, `Cascader`, `TreeSelect`, `Transfer` | Preserve field names, rules, and validation status. |
| Visual identity | `Avatar`, `Badge`, `Tag`, `Typography`, `Divider`, `Image`, `QRCode` | Use semantic tokens and alt text. |

Apply the component's documented Props and states from `registry/props.antd-6.6.4.json` and `registry/inspector.antd-6.6.4.json` to the matching browser-rendered origin in `libraries/antd-6.lib.pen`.
