# Ant Design 6 component catalog

Use `registry/props.antd-6.6.4.json` as the authoritative component and Props list. It is generated from the installed `antd@6.6.4` type declarations and contains 148 entries including subcomponents, services, and Grid hooks. Use `registry/inspector.antd-6.6.4.json` for the control type of each property.

The visual origins are in `libraries/antd-6.lib.pen`. The snapshot predates the runtime upgrade and has 65 static reusable nodes and one Live Button. A section is not proof of a reusable origin or complete state coverage. See `docs/antd-official-component-alignment.md` for website taxonomy and Pen gaps.

## Runtime registry categories

Listy has a runtime registry and render sample but no Pen section yet.

- General: Button, FloatButton, Typography.
- Layout: Divider, Flex, Grid, Layout, Masonry, Row, Col, Space, Splitter.
- Data Entry: AutoComplete, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload.
- Data Display: Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Listy, Popover, QRCode, Segmented, Statistic, Table, Tag, Timeline, Tooltip, Tour, Tree.
- Navigation: Anchor, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs.
- Feedback: Alert, Drawer, Modal, Popconfirm, Progress, Result, Skeleton, Spin, Watermark.
- Other: Affix, App, BackTop, BorderBeam, ConfigProvider.

`message` and `notification` use service APIs (prefer Hooks or App instances). Keep Message and Notification in the website Feedback directory and model their visible feedback states; runtime-only calls do not replace visual assets.
