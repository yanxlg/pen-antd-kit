#!/usr/bin/env python3
"""
Imports authentic Ant Design Component Frames from Figma .fig file,
organizes them into Category Layers -> Component Sub-titles (Sections) -> Multiple Dedicated Artboards (Principles | Usage | Components | Groups),
attaches canonical metadata, and writes out libraries/antd-6.lib.pen.
"""

import os
import sys
import json
import zipfile
import shutil
import base64
import copy
import re
import fig_kiwi

FIG_PATH = '/Users/yanxianliang/Downloads/Ant Design Open Source (Community).fig'
TEMP_CANVAS = '/tmp/canvas.fig'
OUTPUT_PATH = '/Users/yanxianliang/overseas/pen-antd-kit/libraries/antd-6.lib.pen'
PENCIL_DOC_PATH = '/Users/yanxianliang/.pencil/documents/4c2d384b-6567-44a0-acb3-29a09ebaba8f/pencil-new.pen'

# Populated by load_fig_file() / main(); module-level so converters can reference them.
nodes_by_guid = {}
children_by_parent = {}
page_map = {}


def load_fig_file(fig_path=FIG_PATH, temp_canvas=TEMP_CANVAS):
    """Decodes a .fig file and populates nodes_by_guid / children_by_parent / page_map."""
    global page_map
    if not os.path.exists(temp_canvas):
        print(f'Extracting canvas.fig from {fig_path}...')
        with zipfile.ZipFile(fig_path, 'r') as z:
            with open(temp_canvas, 'wb') as f:
                f.write(z.read('canvas.fig'))

    print('Decoding canvas.fig with fig_kiwi...')
    fig_data = fig_kiwi.decode(temp_canvas, {})
    node_changes = fig_data.get('nodeChanges', [])
    print(f'Total node changes in Figma file: {len(node_changes)}')

    for n in node_changes:
        g = n.get('guid')
        if g:
            key = (g['sessionID'], g['localID'])
            nodes_by_guid[key] = n
        p = n.get('parentIndex')
        if p and p.get('guid'):
            pkey = (p['guid']['sessionID'], p['guid']['localID'])
            children_by_parent.setdefault(pkey, []).append(n)

    pages = [n for n in node_changes if n.get('type') == 'CANVAS']
    page_map = {p.get('name', '').strip(): p for p in pages}
    print(f'Decoded {len(pages)} canvas pages.')

# Official Ant Design Categories
CATEGORIES = {
    'General': ['Button', 'FloatButton', 'Typography'],
    'Layout': ['Divider', 'Flex', 'Grid', 'Layout', 'Space', 'Splitter', 'Col', 'Row', 'Masonry'],
    'Navigation': ['Anchor', 'Breadcrumb', 'Dropdown', 'Menu', 'Pagination', 'Steps', 'Tabs'],
    'Data Entry': ['AutoComplete', 'Cascader', 'Checkbox', 'ColorPicker', 'DatePicker', 'Form', 'Input', 'InputNumber', 'Mentions', 'Radio', 'Rate', 'Select', 'Slider', 'Switch', 'TimePicker', 'Transfer', 'TreeSelect', 'Upload'],
    'Data Display': ['Avatar', 'Badge', 'Calendar', 'Card', 'Carousel', 'Collapse', 'Descriptions', 'Empty', 'Image', 'Popover', 'QRCode', 'Segmented', 'Statistic', 'Table', 'Tag', 'Timeline', 'Tooltip', 'Tour', 'Tree'],
    'Feedback': ['Alert', 'Drawer', 'Message', 'Modal', 'Notification', 'Popconfirm', 'Progress', 'Result', 'Skeleton', 'Spin', 'Watermark'],
    'Other': ['Affix', 'App', 'BackTop', 'BorderBeam'],
}

CATEGORY_NAMES = {
    'General': '通用',
    'Layout': '布局',
    'Navigation': '导航',
    'Data Entry': '数据录入',
    'Data Display': '数据展示',
    'Feedback': '反馈',
    'Other': '其他',
}

CHINESE_NAMES = {
    'Button': '按钮', 'FloatButton': '悬浮按钮', 'Typography': '排版',
    'Divider': '分割线', 'Flex': '弹性布局', 'Grid': '栅格', 'Layout': '布局', 'Space': '间距', 'Splitter': '折叠分割器', 'Col': '栅格列', 'Row': '栅格行', 'Masonry': '瀑布流',
    'Anchor': '锚点', 'Breadcrumb': '面包屑', 'Dropdown': '下拉菜单', 'Menu': '导航菜单', 'Pagination': '分页', 'Steps': '步骤条', 'Tabs': '标签页',
    'AutoComplete': '自动完成', 'Cascader': '级联选择', 'Checkbox': '多选框', 'ColorPicker': '颜色选择器', 'DatePicker': '日期选择器', 'Form': '表单', 'Input': '输入框', 'InputNumber': '数字输入框', 'Mentions': '提及', 'Radio': '单选框', 'Rate': '评分', 'Select': '选择器', 'Slider': '滑动输入条', 'Switch': '开关', 'TimePicker': '时间选择器', 'Transfer': '穿梭框', 'TreeSelect': '树选择', 'Upload': '上传',
    'Avatar': '头像', 'Badge': '徽标数', 'Calendar': '日历', 'Card': '卡片', 'Carousel': '走马灯', 'Collapse': '折叠面板', 'Descriptions': '描述列表', 'Empty': '空状态', 'Image': '图片', 'Listy': '虚拟列表', 'Popover': '气泡卡片', 'QRCode': '二维码', 'Segmented': '分段控制器', 'Statistic': '统计数值', 'Table': '表格', 'Tag': '标签', 'Timeline': '时间轴', 'Tooltip': '文字提示', 'Tour': '漫游式引导', 'Tree': '树形控件',
    'Alert': '警告提示', 'Drawer': '抽屉', 'Message': '全局提示', 'Modal': '对话框', 'Notification': '通知提醒框', 'Popconfirm': '气泡确认框', 'Progress': '进度条', 'Result': '结果', 'Skeleton': '骨架屏', 'Spin': '加载中', 'Watermark': '水印',
    'Affix': '固钉', 'App': '包裹器', 'BackTop': '回到顶部', 'BorderBeam': '发光边框',
}

DESCRIPTIONS = {
    'Button': '按钮用于开始一个即时操作。标记了一个（或封装了一组）操作命令，响应用户的点击行为。',
    'FloatButton': '常驻屏幕边缘的悬浮按钮，支持返回顶部、快捷菜单、通知徽标与全局快捷动作。',
    'Typography': '企业级排版系统，提供标题、正文、副文本、可交互链接与行内代码块等排版基准。',
    'Divider': '区隔内容的分割线，支持水平、垂直、带标题文本与虚线样式。',
    'Flex': '弹性布局容器，提供基于 CSS Flexbox 的对齐、间距、换行与自适应排列能力。',
    'Grid': '24 栅格化系统，基于 flex 布局构建弹性自适应页面框架，支持多设备断点。',
    'Layout': '经典页面级布局骨架，规范 Header、Sider、Content、Footer 的结构与联动。',
    'Space': '设置组件之间的间距，避免组件紧贴，自动处理行内换行与尺寸对齐。',
    'Splitter': '可折叠、可拖拽调整尺寸的分割面板容器，支持多栏自由伸缩。',
    'Col': '栅格列组件，控制跨度 span、偏移 offset、推拉 push/pull 与响应式断点。',
    'Row': '栅格行组件，提供 gutter 栅格间距、flex justify 对齐与纵向对齐控制。',
    'Masonry': '瀑布流布局组件，按内容高度自动紧凑流式排列，消除垂直空白。',
    'Anchor': '锚点导航，在长页面中提供浮动快捷跳转与滚动位置实时高亮联动。',
    'Breadcrumb': '面包屑导航，展示当前页面在系统层级结构中的位置，并支持快速逐级回退。',
    'Dropdown': '向下弹出的折叠菜单，收纳次要操作选项，提供下拉选择与级联动作。',
    'Menu': '为页面和应用提供导航主菜单，支持垂直行内、水平通栏与暗色侧边栏模式。',
    'Pagination': '分页器，采用分页形式分隔长列表长数据，支持每页条数选择与跳页。',
    'Steps': '步骤条引导用户按照流程完成复杂任务，清晰展示当前所处的阶段与状态。',
    'Tabs': '选项卡切换，在同一空间内容纳多个平行视图或分组面板。',
    'AutoComplete': '输入框自动完成，根据用户输入实时联想并推荐候选项。',
    'Cascader': '级联选择框，适用于省市区、多级部门组织架构等多层级数据选择。',
    'Checkbox': '多选框，在一组可选项中进行多项选择，支持半选 indeterminate 状态。',
    'ColorPicker': '颜色选择器，支持 HEX/RGB/HSB 颜色拾取、透明度与预设色板。',
    'DatePicker': '日期选择器，支持年、月、周、日、时间段范围选择与快捷预设。',
    'Form': '具有数据收集、校验和提交功能的高性能表单容器，与 Field 状态深度绑定。',
    'Input': '通过鼠标或键盘输入字符的基础输入框，支持前后缀、清除与密码模式。',
    'InputNumber': '通过鼠标或键盘输入数值的输入框，支持精度、步长与步进调节。',
    'Mentions': '提及输入框，用于在文本中输入 @ 字符以呼出成员或词条建议弹层。',
    'Radio': '单选框，在一组互斥选项中只允许选中一项，支持普通单选与按钮单选。',
    'Rate': '评分组件，支持半星分值、自定义图标字符与满意度文本提示。',
    'Select': '下拉选择器，取代原生 select，支持单选、多选、标签输入与远程检索。',
    'Slider': '滑动输入条，通过拖动滑块在连续或离散区间内选取数值。',
    'Switch': '开关选择器，表示两种相互对立的状态切换（开启/关闭）。',
    'TimePicker': '时间选择器，支持时、分、秒独立滚动选择与时间段范围限定。',
    'Transfer': '双栏穿梭框，在两栏中移动元素以完成复杂授权或成员分配。',
    'TreeSelect': '树形选择控件，结合 Tree 和 Select 的层级下拉选择组件。',
    'Upload': '文件上传组件，提供点击上传、拖拽上传区域与上传列表管理。',
    'Avatar': '用来代表用户或事物的头像，支持图片、文字与图标自适应缩放。',
    'Badge': '图标或头像右上角的红点、数字徽标或页面运行状态小圆点。',
    'Calendar': '按照日历形式展示数据的容器，支持全屏大日历与卡片小日历。',
    'Card': '通用卡片容器，包含标题、操作区与主体内容，承载特定业务信息。',
    'Carousel': '走马灯轮播图，在一组平级内容之间循环滑动展示幻灯片。',
    'Collapse': '折叠面板，收起/展开多段内容，节省页面空间，支持手风琴模式。',
    'Descriptions': '成组展示多个字段信息的描述列表，支持表格样式与斑马底纹。',
    'Empty': '空状态时的展示占位图，提示用户当前无数据并引导后续动作。',
    'Image': '提供图片预览、缩放、旋转与错误兜底图的多功能图片组件。',
    'Popover': '气泡卡片，悬停或点击时弹出承载复杂结构化信息的卡片浮层。',
    'QRCode': '二维码生成器，将文本或网址渲染为清晰的矢量二维码，支持中心图标。',
    'Segmented': '分段控制器，用于展示多个互斥选项的线性滑动切换控件。',
    'Statistic': '展示统计数值的展示组件，支持千分位、增减箭头与正负色阶。',
    'Table': '功能完备的企业级表格，支持排序、筛选、分页、多选与树形展开。',
    'Tag': '进行标记和分类的标签，支持彩色预设、可关闭态与选中切换。',
    'Timeline': '垂直展示时间流信息的时间轴，清晰追踪项目推进与版本日志。',
    'Tooltip': '简单的文字提示气泡，鼠标悬停时对元素进行轻量语义补充。',
    'Tour': '分步漫游引导，聚焦页面关键元素带领用户快速熟悉系统新功能。',
    'Tree': '层级树状控件，清晰展示文件夹、组织架构等深层级嵌套数据。',
    'Alert': '警告提示，在页面顶部或卡片中展示成功、信息、警告与错误反馈。',
    'Drawer': '屏幕边缘滑出的浮层抽屉，常用于长表单编辑或复杂详情查看。',
    'Modal': '模态对话框，阻断当前操作并在当前视口中央展示核心决策信息。',
    'Popconfirm': '点击目标元素后弹出的轻量二次确认浮层，防止误操作。',
    'Progress': '展示当前操作或任务推进百分比的进度条，支持线条与环形。',
    'Result': '用于反馈一系列操作任务的处理结果（成功、失败、警告或 404/500）。',
    'Skeleton': '在网络较慢时在内容区域显示的占位骨架屏，缓解等待焦虑。',
    'Spin': '用于页面和区块的加载中状态，包含动态旋转圆点与遮罩层。',
    'Watermark': '给页面添加防泄密版权水印的容器组件，支持文字水印与倾斜角。',
    'Affix': '将页面元素钉在可视范围顶部或底部的固钉组件。',
    'App': '包裹应用顶层的全局上下文组件，提供便捷的 message/modal 消费机制。',
    'BackTop': '回到顶部悬浮按钮，在长页面滚动到底部时提供一键平滑回顶。',
    'BorderBeam': '沿容器边框流转的动态光束高亮边框，提升科技感与视觉焦点。',
}

def get_image_url(hash_hex):
    # Check if {hash_hex}.png exists in images directory
    img_name = f"{hash_hex}.png"
    local_path = os.path.join(os.path.dirname(OUTPUT_PATH), 'images', img_name)
    if os.path.exists(local_path):
        return f"./images/{img_name}"
    return None

def paint_to_hex(paint):
    if not paint or paint.get('type') != 'SOLID':
        return None
    c = paint.get('color', {})
    r = int(c.get('r', 0) * 255)
    g = int(c.get('g', 0) * 255)
    b = int(c.get('b', 0) * 255)
    a = c.get('a', 1.0) * paint.get('opacity', 1.0)
    if a < 0.98:
        return f'#{r:02X}{g:02X}{b:02X}{int(a*255):02X}'
    return f'#{r:02X}{g:02X}{b:02X}'

def sanitize_id(raw_id):
    # Rule: No '/' or ':' or spaces in node id
    return str(raw_id).replace('/', '_').replace(':', '_').replace(' ', '_')


def convert_fig_node(n, comp_prefix, depth=0, max_depth=8):
    if depth > max_depth or not n:
        return None
    
    ntype = n.get('type')
    guid = n.get('guid', {})
    nid = sanitize_id(f"{comp_prefix}_{guid.get('sessionID', 0)}_{guid.get('localID', 0)}")
    name = sanitize_id(n.get('name', 'node'))
    size = n.get('size', {'x': 100, 'y': 100})
    trans = n.get('transform', {'m02': 0, 'm12': 0})
    
    x = round(trans.get('m02', 0), 1)
    y = round(trans.get('m12', 0), 1)
    w = max(1, round(size.get('x', 100), 1))
    h = max(1, round(size.get('y', 100), 1))

    if ntype == 'TEXT':
        tdata = n.get('textData', {})
        chars = tdata.get('characters', name)
        font = n.get('fontName', {})
        size_pt = max(10, min(120, round(n.get('fontSize', 13), 1)))
        weight = '700' if 'bold' in font.get('style', '').lower() else ('600' if 'medium' in font.get('style', '').lower() else '400')
        fills = n.get('fillPaints', [])
        fill = paint_to_hex(fills[0]) if fills else '#000000E0'
        autoresize = n.get('textAutoResize')
        res = {
            'type': 'text',
            'id': nid,
            'name': name,
            'content': chars.strip() or name,
            'x': x,
            'y': y,
            'fontSize': size_pt,
            'fontFamily': 'Inter',
            'fontWeight': weight,
            'fill': fill or '#000000E0',
        }
        autoresize = n.get('textAutoResize')
        # If single line / short title, use 'auto' so words never wrap awkwardly
        if ('\n' not in chars and len(chars) < 50) or autoresize == 'WIDTH_AND_HEIGHT':
            res['textGrowth'] = 'auto'
        else:
            res['textGrowth'] = 'fixed-width'
            res['width'] = w + 20  # generous width buffer for platform font differences
        return res

    smode = n.get('stackMode')
    if smode == 'HORIZONTAL':
        pen_layout = 'horizontal'
    elif smode == 'VERTICAL':
        pen_layout = 'vertical'
    else:
        pen_layout = 'none'

    pen_node = {
        'type': 'frame',
        'id': nid,
        'name': name,
        'x': x,
        'y': y,
        'width': w,
        'height': h,
        'layout': pen_layout,
    }

    if pen_layout in ('horizontal', 'vertical') and n.get('itemSpacing'):
        pen_node['gap'] = round(n['itemSpacing'], 1)

    fills = n.get('fillPaints', [])
    if fills:
        f0 = fills[0]
        if f0.get('type') == 'IMAGE':
            img_h = f0.get('image', {}).get('hash')
            if img_h:
                h_hex = bytes(img_h).hex()
                img_url = get_image_url(h_hex)
                if img_url:
                    pen_node['fill'] = {
                        'type': 'image',
                        'enabled': True,
                        'mode': 'fill',
                        'url': img_url,
                    }
        else:
            hex_fill = paint_to_hex(f0)
            if hex_fill:
                pen_node['fill'] = hex_fill

    strokes = n.get('strokePaints', [])
    if strokes:
        hex_stroke = paint_to_hex(strokes[0])
        if hex_stroke:
            pen_node['stroke'] = hex_stroke
            pen_node['strokeWidth'] = round(n.get('strokeWeight', 1), 1)

    if n.get('cornerRadius'):
        pen_node['cornerRadius'] = min(24, round(n['cornerRadius'], 1))

    if n.get('clipsContent'):
        pen_node['clip'] = True

    nkey = (guid.get('sessionID'), guid.get('localID'))
    raw_kids = children_by_parent.get(nkey, [])
    if raw_kids and depth < max_depth:
        # Sort children by Figma position z-index so background frames stay at bottom
        sorted_kids = sorted(raw_kids, key=lambda k: k.get('parentIndex', {}).get('position', ''))
        conv_kids = []
        for k in sorted_kids[:300]:
            ck = convert_fig_node(k, comp_prefix, depth + 1, max_depth)
            if ck:
                conv_kids.append(ck)
        if conv_kids:
            pen_node['children'] = conv_kids

    return pen_node

def find_canonical_fig_frame(kids, comp_name):
    """Finds the primary component frame inside a canvas page to attach canonical origin metadata."""
    frames = [k for k in kids if k.get('type') in ['FRAME', 'SYMBOL'] and not k.get('name', '').startswith('.')]
    
    # 1. Exact match
    for f in frames:
        if f.get('name', '').strip().lower() == comp_name.lower():
            return f
    # 2. Prefix match
    for f in frames:
        if f.get('name', '').strip().lower().startswith(comp_name.lower()):
            return f
    # 3. Largest frame
    if frames:
        frames.sort(key=lambda x: x.get('size',{}).get('x',0)*x.get('size',{}).get('y',0), reverse=True)
        return frames[0]
    return None


# The Button Components artboard is a component matrix, not a hand-picked
# gallery. Keep the axes explicit so a Figma sync cannot silently drop a
# combination when the source file adds another state or shape.
BUTTON_VARIANT_AXES = {
    'Type': ['primary', 'default', 'dashed', 'link', 'text'],
    'Shape': ['default', 'circle', 'round', 'square'],
    'Size': ['small', 'middle', 'large'],
    'State': ['normal', 'hover_or_press', 'active', 'animating', 'disabled'],
    'Danger': ['false', 'true'],
    'Ghost': ['false', 'true'],
}


def _variant_parts(name):
    return dict(re.findall(r'(Type|Shape|Size|State|Danger|Ghost)=([^,]+)', name or ''))


def _normalise_variant_parts(parts):
    normalised = dict(parts)
    normalised['Type'] = {'secondary': 'default'}.get(normalised.get('Type'), normalised.get('Type'))
    normalised['Shape'] = {'standard': 'default'}.get(normalised.get('Shape'), normalised.get('Shape'))
    return normalised


def _rename_variant_ids(node, variant_id, counter=None):
    counter = counter if counter is not None else [0]
    if node.get('id'):
        node['id'] = f"{variant_id}-node-{counter[0]}"
        counter[0] += 1
    for child in node.get('children') or []:
        _rename_variant_ids(child, variant_id, counter)


def build_button_variant_matrix(origin):
    """Build the crossed Button specification panel from live Button props.

    The panel is intentionally grouped like the Ant Design reference sheet:
    shape/danger sections contain type columns and size/state rows. Every cell
    is a Code on Canvas script node pointing at the shared Button renderer, so
    selecting a cell exposes the renderer's declared Button inputs instead of
    the generic frame geometry inspector.
    """
    templates = [child for child in origin.get('children') or [] if child.get('name', '').startswith('Type=')]
    if not templates:
        return

    by_key = {}
    for template in templates:
        parts = _normalise_variant_parts(_variant_parts(template.get('name')))
        if len(parts) == len(BUTTON_VARIANT_AXES):
            by_key[tuple(parts[axis] for axis in BUTTON_VARIANT_AXES)] = template

    # Prefer an exact template, then reuse the same type/size/state visual for
    # a new shape. This preserves authentic Figma paint/text details while
    # still materialising every documented combination.
    def pick_template(values):
        key = tuple(values[axis] for axis in BUTTON_VARIANT_AXES)
        if key in by_key:
            return by_key[key]
        for candidate_key, candidate in by_key.items():
            if all(candidate_key[i] == key[i] for i in (0, 2, 3, 4, 5)):
                return candidate
        return templates[0]

    columns = list(BUTTON_VARIANT_AXES['Type'])
    sizes = list(BUTTON_VARIANT_AXES['Size'])
    states = list(BUTTON_VARIANT_AXES['State'])
    shapes = list(BUTTON_VARIANT_AXES['Shape'])
    dangers = [False, True]
    ghosts = [False, True]
    label_w = 120
    cell_w = 120
    row_h = 42
    group_w = label_w + len(columns) * cell_w
    section_header_h = 22
    group_header_h = 54
    section_h = section_header_h + len(sizes) * len(states) * row_h
    group_h = group_header_h + len(ghosts) * section_h + 18
    gap_x = 40
    gap_y = 32
    group_columns = 2
    group_rows = (len(shapes) * len(dangers) + group_columns - 1) // group_columns
    origin['x'] = 96
    origin['width'] = group_columns * group_w + (group_columns - 1) * gap_x + 48
    origin['height'] = group_rows * group_h + (group_rows - 1) * gap_y + 48
    origin['layout'] = 'none'

    def text_node(node_id, name, content, x, y, width=110, font_size=12, weight='normal', fill='#000000E0'):
        return {
            'type': 'text',
            'id': node_id,
            'name': name,
            'content': content,
            'x': x,
            'y': y,
            'width': width,
            'height': max(16, font_size + 4),
            'fontFamily': 'Inter',
            'fontSize': font_size,
            'fontWeight': weight,
            'fill': fill,
            'textGrowth': 'fixed-width',
        }

    def props_for(type_name, shape, size, state, danger, ghost):
        return {
            'type': type_name,
            'color': 'danger' if danger else 'default',
            'variant': 'outlined',
            'shape': shape,
            'size': size,
            'danger': danger,
            'ghost': ghost,
            'disabled': state == 'disabled',
            'loading': state == 'animating',
            'children': 'Button Title',
        }

    variants = []
    index = 0
    shape_names = {'default': 'Standard', 'circle': 'Circle', 'round': 'Round', 'square': 'Square'}
    groups = []

    for group_index, (shape, danger) in enumerate((s, d) for s in shapes for d in dangers):
        col_index = group_index % group_columns
        row_index = group_index // group_columns
        group_name = 'Dangerous' if shape == 'default' and danger else shape_names[shape]
        if shape != 'default' and danger:
            group_name = f"{shape_names[shape]} · Dangerous"
        group = {
            'type': 'frame',
            'id': f'button-matrix-group-{group_index:02d}',
            'name': group_name,
            'x': 24 + col_index * (group_w + gap_x),
            'y': 24 + row_index * (group_h + gap_y),
            'width': group_w,
            'height': group_h,
            'layout': 'none',
            'fill': '#FFFFFF80',
            'cornerRadius': 4,
            'children': [text_node(f'button-group-title-{group_index:02d}', 'Group', group_name, 0, 8, group_w, 16, '600')],
        }
        for column_index, type_name in enumerate(columns):
            display_name = 'Secondary' if type_name == 'default' else type_name.title()
            group['children'].append(text_node(
                f'button-group-{group_index:02d}-col-{column_index}', 'Column', display_name,
                label_w + column_index * cell_w + 8, 34, cell_w - 16, 12, '600'))

        cursor_y = group_header_h
        for ghost in ghosts:
            ghost_name = 'Ghost' if ghost else 'Solid / Default'
            group['children'].append(text_node(
                f'button-group-{group_index:02d}-ghost-{str(ghost).lower()}', 'Variant', ghost_name,
                8, cursor_y, group_w - 16, 12, '600', '#00000073'))
            cursor_y += section_header_h
            for size in sizes:
                for state_index, state in enumerate(states):
                    row_y = cursor_y
                    size_label = {'large': 'Large', 'middle': 'Medium', 'small': 'Small'}[size] if state_index == 0 else ''
                    state_label = {
                        'normal': 'Default', 'hover_or_press': 'Hover/pressed', 'active': 'Active',
                        'animating': 'Animating', 'disabled': 'Disabled',
                    }[state]
                    if size_label:
                        group['children'].append(text_node(
                            f'button-group-{group_index:02d}-{ghost}-{size}-size', 'Size', size_label,
                            8, row_y + 10, label_w - 16, 12, '600'))
                    group['children'].append(text_node(
                        f'button-group-{group_index:02d}-{ghost}-{size}-{state}', 'State', state_label,
                        8, row_y + 26, label_w - 16, 10, 'normal', '#00000073'))
                    for column_index, type_name in enumerate(columns):
                        values = {
                            'Type': type_name,
                            'Shape': shape,
                            'Size': size,
                            'State': state,
                            'Danger': str(danger).lower(),
                            'Ghost': str(ghost).lower(),
                        }
                        variant = copy.deepcopy(pick_template(values))
                        variant_id = f"button-variant-{index:04d}"
                        props = props_for(type_name, shape, size, state, danger, ghost)
                        node_name = f"Antd/Button · Type={type_name}, Shape={shape}, Size={size}, State={state}, Danger={str(danger).lower()}, Ghost={str(ghost).lower()}"
                        button_height = {'small': 24, 'middle': 32, 'large': 40}[size]
                        button_width = button_height if shape == 'circle' else (96 if size == 'large' else 88)
                        variant = {
                            'type': 'script',
                            'id': variant_id,
                            'name': node_name,
                            'scriptUri': '../canvas-components/Button.js',
                            'inputs': {
                                'children': 'Button Title',
                                'icon': '',
                                **props,
                                'target': '',
                                'htmlType': 'button',
                                'iconPlacement': 'start',
                                'iconPosition': 'start',
                                'autoInsertSpace': True,
                                'block': False,
                                'href': '',
                                'prefixCls': '',
                                'className': '',
                                'rootClassName': '',
                                'classNames': '',
                                'styles': '',
                                '_skipSemantic': False,
                                'name': '',
                                'id': '',
                                'title': '',
                                'data-state': state,
                            },
                            'x': label_w + column_index * cell_w + (cell_w - button_width) / 2,
                            'y': row_y + (row_h - button_height) / 2,
                            'width': button_width,
                            'height': button_height,
                            'reusable': False,
                            'metadata': {
                            'type': 'antd-component',
                            'antd': {
                                'component': 'Button',
                                'version': '6.4.3',
                                'props': props,
                                'state': state,
                                'tokens': {},
                            },
                            },
                        }
                        group['children'].append(variant)
                        variants.append(variant)
                        index += 1
                    cursor_y += row_h

        groups.append(group)

    # Keep one reusable live component in the library's Components tab. The
    # matrix artboard remains a regular documentation frame, while every
    # matrix cell uses the exact same script renderer with different inputs.
    origin['reusable'] = False
    origin['children'] = groups
    live_node = {
        'type': 'script',
        'id': 'antd-button-live-origin',
        'name': 'Antd/Live/Button',
        'reusable': True,
        'scriptUri': '../canvas-components/Button.js',
        'x': 24,
        'y': origin['height'] - 56,
        'width': 160,
        'height': 40,
        'inputs': {
            'children': 'Button',
            'icon': '',
            'type': 'default',
            'color': 'default',
            'variant': 'outlined',
            'size': 'medium',
            'shape': 'default',
            'danger': False,
            'ghost': False,
            'block': False,
            'loading': False,
            'disabled': False,
            'state': 'normal',
            'autoInsertSpace': True,
            'href': '',
            'target': '',
            'htmlType': 'button',
            'iconPlacement': 'start',
            'iconPosition': 'start',
            'prefixCls': '',
            'className': '',
            'rootClassName': '',
            'classNames': '',
            'styles': '',
            '_skipSemantic': False,
            'name': '',
            'id': '',
            'title': '',
        },
        'metadata': {
            'type': 'antd-component',
            'antd': {
                'component': 'Button',
                'category': 'General',
                'version': '6.4.3',
                'props': {},
                'tokens': {},
            },
        },
    }
    origin['height'] += 72
    origin['children'].append(live_node)
    origin.setdefault('metadata', {}).setdefault('antd', {})['variantAxes'] = BUTTON_VARIANT_AXES
    origin['metadata']['antd']['matrix'] = {
        'component': 'Button',
        'cellCount': index,
        'grouping': ['shape', 'danger', 'ghost', 'type', 'size', 'state'],
    }

def build_artboard_from_kids(artboard_id, artboard_name, kids, comp_prefix, board_x, cat_name, comp_name, canonical_guid=None):
    """Creates a dedicated specification artboard from a collection of Figma canvas nodes."""
    min_x = min([k.get('transform',{}).get('m02', 0) for k in kids])
    min_y = min([k.get('transform',{}).get('m12', 0) for k in kids])
    max_x = max([k.get('transform',{}).get('m02', 0) + k.get('size',{}).get('x', 0) for k in kids])
    max_y = max([k.get('transform',{}).get('m12', 0) + k.get('size',{}).get('y', 0) for k in kids])

    board_w = max(400, round(max_x - min_x + 64, 1))
    board_h = max(300, round(max_y - min_y + 64, 1))

    sorted_kids = sorted(kids, key=lambda k: k.get('parentIndex', {}).get('position', ''))
    converted_children = []
    canonical_found = False

    for k in sorted_kids:
        ck = convert_fig_node(k, comp_prefix, depth=0, max_depth=8)
        if not ck:
            continue
        ck['x'] = round(ck.get('x', 0) - min_x + 32, 1)
        ck['y'] = round(ck.get('y', 0) - min_y + 32, 1)

        kg = (k['guid']['sessionID'], k['guid']['localID'])
        if kg == canonical_guid and not canonical_found:
            ck['id'] = sanitize_id(f"antd-{comp_name.lower()}-origin")
            ck['name'] = f"Antd/{cat_name}/{comp_name}"
            ck['reusable'] = True
            ck['metadata'] = {
                'type': 'antd-component',
                'antd': {
                    'component': comp_name,
                    'category': cat_name,
                    'version': '6.4.3',
                    'props': {},
                    'tokens': {},
                },
            }
            canonical_found = True

        converted_children.append(ck)

    artboard = {
        'type': 'frame',
        'id': sanitize_id(artboard_id),
        'name': artboard_name,
        'x': board_x,
        'y': 90, # directly under component sub-title banner
        'width': board_w,
        'height': board_h,
        'fill': '#FFFFFF',
        'stroke': '#E8E8E8',
        'strokeWidth': 1,
        'cornerRadius': 8,
        'clip': True,
        'layout': 'none',
        'children': converted_children,
    }
    return artboard, board_w, board_h, canonical_found

def build_figma_component_section(page_node, comp_name, cat_name, section_x):
    """Builds a Component Section (Sub-title) containing multiple dedicated Artboards from Figma."""
    pguid = (page_node['guid']['sessionID'], page_node['guid']['localID'])
    direct_kids = children_by_parent.get(pguid, [])
    
    cn_name = CHINESE_NAMES.get(comp_name, comp_name)
    desc = DESCRIPTIONS.get(comp_name, f'Ant Design {comp_name} 组件')
    sec_id = sanitize_id(f"section-{comp_name.lower()}")
    prefix = comp_name.lower()

    # Partition direct kids into columns / artboards
    principles_text = [k for k in direct_kids if k.get('type') == 'TEXT' and k.get('name') in ['Principles', 'Principle']]
    usage_text = [k for k in direct_kids if k.get('type') == 'TEXT' and k.get('name') == 'Usage']
    comp_text = [k for k in direct_kids if k.get('type') == 'TEXT' and k.get('name') == 'Components']
    
    u_x = usage_text[0].get('transform',{}).get('m02', 0) if usage_text else 0
    c_x = comp_text[0].get('transform',{}).get('m02', 1000) if comp_text else 1000

    p_kids, u_kids, c_kids = [], [], []

    for k in direct_kids:
        kx = k.get('transform',{}).get('m02', 0)
        kn = k.get('name', '')
        if k in principles_text or kx < u_x - 50:
            p_kids.append(k)
        elif k in usage_text or (u_x - 50 <= kx < c_x - 50):
            u_kids.append(k)
        else:
            c_kids.append(k)

    canonical_target = find_canonical_fig_frame(direct_kids, comp_name)
    canonical_guid = (canonical_target['guid']['sessionID'], canonical_target['guid']['localID']) if canonical_target else None

    # Construct multiple dedicated Artboards
    artboards = []
    cur_board_x = 0
    max_h = 400
    canonical_registered = False

    # 1. Principles Artboard (if present)
    if p_kids:
        ab_p, pw, ph, found = build_artboard_from_kids(
            f"artboard-{prefix}-principles",
            "Principles · 设计原则",
            p_kids,
            f"{prefix}_p",
            cur_board_x,
            cat_name,
            comp_name,
            canonical_guid,
        )
        artboards.append(ab_p)
        cur_board_x += pw + 40
        max_h = max(max_h, ph)
        if found: canonical_registered = True

    # 2. Usage Artboard (if present)
    if u_kids:
        ab_u, uw, uh, found = build_artboard_from_kids(
            f"artboard-{prefix}-usage",
            "Usage · 使用场景与示例",
            u_kids,
            f"{prefix}_u",
            cur_board_x,
            cat_name,
            comp_name,
            canonical_guid,
        )
        artboards.append(ab_u)
        cur_board_x += uw + 40
        max_h = max(max_h, uh)
        if found: canonical_registered = True

    # 3. Components Artboard
    if c_kids:
        ab_c, cw, ch, found = build_artboard_from_kids(
            f"artboard-{prefix}-components",
            "Components · 变体规格矩阵",
            c_kids,
            f"{prefix}_c",
            cur_board_x,
            cat_name,
            comp_name,
            canonical_guid,
        )
        if comp_name == 'Button':
            origin = next((child for child in ab_c.get('children', [])
                           if child.get('id') == 'antd-button-origin'), None)
            if origin:
                build_button_variant_matrix(origin)
                # Keep the artboard's existing Button-Group and headings in
                # view; the compact 12-column matrix fits without clipping.
                ch = max(ch, origin.get('y', 0) + origin.get('height', 0) + 64)
                ab_c['height'] = ch
        artboards.append(ab_c)
        cur_board_x += cw + 40
        max_h = max(max_h, ch)
        if found: canonical_registered = True

    # Ensure canonical component metadata is always present
    if not canonical_registered:
        # Fallback embed into the Components artboard or as a dedicated origin frame
        origin_frame = {
            'type': 'frame',
            'id': sanitize_id(f"antd-{comp_name.lower()}-origin"),
            'name': f"Antd/{cat_name}/{comp_name}",
            'reusable': True,
            'x': cur_board_x,
            'y': 90,
            'width': 600,
            'height': 400,
            'metadata': {
                'type': 'antd-component',
                'antd': {
                    'component': comp_name,
                    'category': cat_name,
                    'version': '6.4.3',
                    'props': {},
                    'tokens': {},
                },
            },
        }
        artboards.append(origin_frame)
        cur_board_x += 640
        max_h = max(max_h, 400)

    total_sec_w = max(1800, cur_board_x - 40)
    total_sec_h = max_h + 120

    # Sub-title Banner for the component
    banner = {
        'type': 'frame',
        'id': f"{sec_id}-banner",
        'name': f"Sub-Title: {comp_name} · {cn_name}",
        'x': 0,
        'y': 0,
        'width': total_sec_w,
        'height': 64,
        'layout': 'vertical',
        'gap': 6,
        'children': [
            {
                'type': 'text',
                'id': f"{sec_id}-t",
                'name': 'Title',
                'content': f"{comp_name} · {cn_name}",
                'fill': '#FFFFFF',
                'fontFamily': 'Inter',
                'fontSize': 26,
                'fontWeight': '700',
            },
            {
                'type': 'text',
                'id': f"{sec_id}-desc",
                'name': 'Description',
                'content': desc,
                'fill': '#BFBFBF',
                'fontFamily': 'Inter',
                'fontSize': 13,
            },
        ],
    }
    component_section = {
        'type': 'frame',
        'id': sec_id,
        'name': f"{comp_name} · {cn_name}",
        'x': section_x,
        'y': 0,
        'width': total_sec_w,
        'height': total_sec_h,
        'layout': 'none',
        'children': [banner] + list(reversed(artboards)), # reverse for natural Pen sidebar order
    }
    return component_section, total_sec_w, total_sec_h

def build_fallback_component_section(comp_name, cat_name, section_x):
    """Builds a Component Section (Sub-title) containing multiple dedicated Artboards for new Ant Design 6.4.3 components."""
    cn_name = CHINESE_NAMES.get(comp_name, comp_name)
    desc = DESCRIPTIONS.get(comp_name, f'Ant Design {comp_name} 组件')
    sec_id = sanitize_id(f"section-{comp_name.lower()}")
    prefix = comp_name.lower()

    # 1. Principles Artboard
    p_artboard = {
        'type': 'frame',
        'id': f"artboard-{prefix}-principles",
        'name': 'Principles · 设计原则',
        'x': 0,
        'y': 90,
        'width': 1000,
        'height': 1200,
        'fill': '#FFFFFF',
        'stroke': '#E8E8E8',
        'strokeWidth': 1,
        'cornerRadius': 8,
        'padding': 32,
        'layout': 'vertical',
        'gap': 20,
        'children': [
            {'type': 'text', 'id': f"{prefix}-p-title", 'content': 'Principles', 'fontSize': 48, 'fontFamily': 'Inter', 'fontWeight': '700', 'fill': '#000000E0'},
            {'type': 'text', 'id': f"{prefix}-p-h1", 'content': f'Ant Design {comp_name} 设计原则与规范定位', 'fontSize': 18, 'fontFamily': 'Inter', 'fontWeight': '700', 'fill': '#000000E0'},
            {'type': 'text', 'id': f"{prefix}-p-t1", 'content': f'1. 视觉一致性：{comp_name} 严格遵循企业级 Design Token 规范，保持色彩层次与圆角一致。', 'fontSize': 14, 'fontFamily': 'Inter', 'fill': '#000000A6'},
            {'type': 'text', 'id': f"{prefix}-p-t2", 'content': f'2. 交互明确：在不同的操作状态下（Hover、Active、Focus、Disabled）提供可预期的即时视觉反馈。', 'fontSize': 14, 'fontFamily': 'Inter', 'fill': '#000000A6'},
            {'type': 'text', 'id': f"{prefix}-p-h2", 'content': "Do & Don't 视觉指引", 'fontSize': 16, 'fontFamily': 'Inter', 'fontWeight': '700', 'fill': '#000000E0'},
            {
                'type': 'frame',
                'id': f"{prefix}-p-do",
                'width': 936,
                'height': 90,
                'fill': '#F6FFED',
                'stroke': '#B7EB8F',
                'strokeWidth': 1,
                'cornerRadius': 6,
                'padding': 12,
                'layout': 'vertical',
                'gap': 6,
                'children': [
                    {'type': 'text', 'id': f"{prefix}-p-do-t", 'content': '✔ 推荐使用 (Do)', 'fontSize': 14, 'fontFamily': 'Inter', 'fontWeight': '700', 'fill': '#52C41A'},
                    {'type': 'text', 'id': f"{prefix}-p-do-c", 'content': f'在主操作流中规范使用 {comp_name}，保持清晰的主次视觉节奏。', 'fontSize': 13, 'fontFamily': 'Inter', 'fill': '#389E0D'},
                ],
            },
            {
                'type': 'frame',
                'id': f"{prefix}-p-dont",
                'width': 936,
                'height': 90,
                'fill': '#FFF1F0',
                'stroke': '#FFA39E',
                'strokeWidth': 1,
                'cornerRadius': 6,
                'padding': 12,
                'layout': 'vertical',
                'gap': 6,
                'children': [
                    {'type': 'text', 'id': f"{prefix}-p-dont-t", 'content': '✖ 避免使用 (Don\'t)', 'fontSize': 14, 'fontFamily': 'Inter', 'fontWeight': '700', 'fill': '#F5222D'},
                    {'type': 'text', 'id': f"{prefix}-p-dont-c", 'content': f'避免在同一区域过度堆叠无差别的 {comp_name}，以免造成信息干扰。', 'fontSize': 13, 'fontFamily': 'Inter', 'fill': '#CF1322'},
                ],
            },
        ],
    }
    # 2. Usage Artboard
    u_artboard = {
        'type': 'frame',
        'id': f"artboard-{prefix}-usage",
        'name': 'Usage · 使用场景与示例',
        'x': 1040,
        'y': 90,
        'width': 1000,
        'height': 1200,
        'fill': '#FFFFFF',
        'stroke': '#E8E8E8',
        'strokeWidth': 1,
        'cornerRadius': 8,
        'padding': 32,
        'layout': 'vertical',
        'gap': 20,
        'children': [
            {'type': 'text', 'id': f"{prefix}-u-title", 'content': 'Usage', 'fontSize': 48, 'fontFamily': 'Inter', 'fontWeight': '700', 'fill': '#000000E0'},
            {'type': 'text', 'id': f"{prefix}-u-h1", 'content': '何时使用 When To Use', 'fontSize': 18, 'fontFamily': 'Inter', 'fontWeight': '700', 'fill': '#000000E0'},
            {'type': 'text', 'id': f"{prefix}-u-t1", 'content': f'• {desc}', 'fontSize': 14, 'fontFamily': 'Inter', 'fill': '#000000A6'},
            {'type': 'text', 'id': f"{prefix}-u-t2", 'content': f'• 适用于企业级中后台管理平台、分析大盘与协同流程。', 'fontSize': 14, 'fontFamily': 'Inter', 'fill': '#000000A6'},
            {'type': 'text', 'id': f"{prefix}-u-h2", 'content': '真实业务场景示例', 'fontSize': 16, 'fontFamily': 'Inter', 'fontWeight': '700', 'fill': '#000000E0'},
            {
                'type': 'frame',
                'id': f"{prefix}-u-box",
                'width': 936,
                'height': 380,
                'fill': '#FAFAFA',
                'stroke': '#E8E8E8',
                'strokeWidth': 1,
                'cornerRadius': 8,
                'padding': 20,
                'layout': 'vertical',
                'gap': 12,
                'children': [
                    {'type': 'text', 'id': f"{prefix}-u-box-t", 'content': f'{comp_name} 业务组合实例', 'fontSize': 15, 'fontFamily': 'Inter', 'fontWeight': '600', 'fill': '#000000E0'},
                    {'type': 'frame', 'id': f"{prefix}-u-box-demo", 'width': 896, 'height': 290, 'fill': '#FFFFFF', 'stroke': '#D9D9D9', 'strokeWidth': 1, 'cornerRadius': 6},
                ],
            },
        ],
    }
    # 3. Components Artboard (Canonical Origin)
    canonical_comp_id = sanitize_id(f"antd-{comp_name.lower()}-origin")
    c_artboard = {
        'type': 'frame',
        'id': f"artboard-{prefix}-components",
        'name': 'Components · 变体规格矩阵',
        'x': 2080,
        'y': 90,
        'width': 1500,
        'height': 1200,
        'fill': '#FFFFFF',
        'stroke': '#E8E8E8',
        'strokeWidth': 1,
        'cornerRadius': 8,
        'padding': 32,
        'layout': 'vertical',
        'gap': 20,
        'children': [
            {'type': 'text', 'id': f"{prefix}-c-title", 'content': 'Components', 'fontSize': 48, 'fontFamily': 'Inter', 'fontWeight': '700', 'fill': '#000000E0'},
            {
                'type': 'frame',
                'id': canonical_comp_id,
                'name': f"Antd/{cat_name}/{comp_name}",
                'reusable': True,
                'width': 1436,
                'height': 1020,
                'fill': '#FFFFFF',
                'stroke': '#F0F0F0',
                'strokeWidth': 1,
                'cornerRadius': 8,
                'clip': True,
                'layout': 'vertical',
                'padding': 24,
                'gap': 16,
                'metadata': {
                    'type': 'antd-component',
                    'antd': {
                        'component': comp_name,
                        'category': cat_name,
                        'version': '6.4.3',
                        'props': {},
                        'tokens': {},
                    },
                },
                'children': [
                    {'type': 'text', 'id': f"{canonical_comp_id}-h1", 'content': f'{comp_name} 状态规格变体矩阵', 'fontSize': 18, 'fontFamily': 'Inter', 'fontWeight': '700', 'fill': '#000000E0'},
                    {'type': 'text', 'id': f"{canonical_comp_id}-desc", 'content': f'完整支持 {comp_name} 的 Default, Hover, Active, Focus, Disabled, Loading 等全部变体', 'fontSize': 13, 'fontFamily': 'Inter', 'fill': '#00000073'},
                    {
                        'type': 'frame',
                        'id': f"{canonical_comp_id}-table",
                        'width': 1388,
                        'height': 880,
                        'fill': '#FAFAFA',
                        'stroke': '#E8E8E8',
                        'strokeWidth': 1,
                        'cornerRadius': 8,
                        'padding': 20,
                        'layout': 'vertical',
                        'gap': 16,
                        'children': [
                            {'type': 'text', 'id': f"{canonical_comp_id}-th", 'content': 'Normal         Hover         Active         Loading         Disabled', 'fontSize': 14, 'fontFamily': 'Inter', 'fontWeight': '600', 'fill': '#1677FF'},
                            {'type': 'frame', 'id': f"{canonical_comp_id}-row1", 'width': 1348, 'height': 200, 'fill': '#FFFFFF', 'stroke': '#F0F0F0', 'strokeWidth': 1, 'cornerRadius': 6},
                            {'type': 'frame', 'id': f"{canonical_comp_id}-row2", 'width': 1348, 'height': 200, 'fill': '#FFFFFF', 'stroke': '#F0F0F0', 'strokeWidth': 1, 'cornerRadius': 6},
                            {'type': 'frame', 'id': f"{canonical_comp_id}-row3", 'width': 1348, 'height': 200, 'fill': '#FFFFFF', 'stroke': '#F0F0F0', 'strokeWidth': 1, 'cornerRadius': 6},
                        ],
                    },
                ],
            },
        ],
    }
    artboards = [p_artboard, u_artboard, c_artboard]
    total_sec_w = 3580
    total_sec_h = 1320

    # Sub-title Banner
    banner = {
        'type': 'frame',
        'id': f"{sec_id}-banner",
        'name': f"Sub-Title: {comp_name} · {cn_name}",
        'x': 0,
        'y': 0,
        'width': total_sec_w,
        'height': 64,
        'layout': 'vertical',
        'gap': 6,
        'children': [
            {
                'type': 'text',
                'id': f"{sec_id}-t",
                'name': 'Title',
                'content': f"{comp_name} · {cn_name}",
                'fill': '#FFFFFF',
                'fontFamily': 'Inter',
                'fontSize': 26,
                'fontWeight': '700',
            },
            {
                'type': 'text',
                'id': f"{sec_id}-desc",
                'name': 'Description',
                'content': desc,
                'fill': '#BFBFBF',
                'fontFamily': 'Inter',
                'fontSize': 13,
            },
        ],
    }
    component_section = {
        'type': 'frame',
        'id': sec_id,
        'name': f"{comp_name} · {cn_name}",
        'x': section_x,
        'y': 0,
        'width': total_sec_w,
        'height': total_sec_h,
        'layout': 'none',
        'children': [banner] + list(reversed(artboards)),
    }
    return component_section, total_sec_w, total_sec_h

def main():
    load_fig_file()
    # Build 7 Category Layers with Component Sections & Multiple Dedicated Artboards
    print('Building 7 Category Layers with Component Sub-titles and Multiple Artboards...')
    category_layers = []
    LAYER_GAP = 1500
    current_y = 6000 # after Overview, Templates, Colors
    GAP_X = 500

    for cat_idx, (cat_name, comp_list) in enumerate(CATEGORIES.items(), 1):
        component_sections = []
        layer_cur_x = 0
        max_sec_h = 2000

        print(f'Processing Category {cat_idx}: {cat_name} ({len(comp_list)} components)...')
        for comp_name in comp_list:
            if comp_name in page_map:
                sec, w, h = build_figma_component_section(page_map[comp_name], comp_name, cat_name, layer_cur_x)
            else:
                sec, w, h = build_fallback_component_section(comp_name, cat_name, layer_cur_x)
        
            component_sections.append(sec)
            layer_cur_x += w + GAP_X
            if h > max_sec_h:
                max_sec_h = h

        total_layer_width = max(1200, layer_cur_x - GAP_X)
        layer_id = sanitize_id(f"layer-{cat_name.lower().replace(' ', '-')}")
        cn_cat = CATEGORY_NAMES.get(cat_name, cat_name)
        layer_display_name = f"0{cat_idx} {cat_name} · {cn_cat}" if cat_idx < 10 else f"{cat_idx} {cat_name} · {cn_cat}"

        layer = {
            'type': 'frame',
            'id': layer_id,
            'name': layer_display_name,
            'x': 0,
            'y': current_y,
            'width': total_layer_width,
            'height': max_sec_h,
            'layout': 'none',
            'children': list(reversed(component_sections)), # reverse sections for natural Pen sidebar order
        }
        category_layers.append(layer)
        current_y += max_sec_h + LAYER_GAP

    print(f'Successfully built {len(category_layers)} category layers.')

    # Read existing Overview, Templates, Colors layers from libraries/antd-6.lib.pen
    with open(OUTPUT_PATH, 'r') as f:
        existing_pen = json.load(f)

    existing_children = existing_pen.get('children', [])
    overview_layer = None
    templates_layer = None
    colors_layer = None

    for l in existing_children:
        lid = l.get('id', '')
        if 'overview' in lid:
            overview_layer = l
        elif 'template' in lid:
            templates_layer = l
        elif 'color' in lid:
            colors_layer = l

    if overview_layer:
        overview_layer['y'] = 0
    if templates_layer:
        templates_layer['y'] = 2500
    if colors_layer:
        colors_layer['y'] = 4500

    # Assemble final layers array in reverse order for Pen sidebar
    final_layers = list(reversed(category_layers))
    if colors_layer:
        final_layers.append(colors_layer)
    if templates_layer:
        final_layers.append(templates_layer)
    if overview_layer:
        final_layers.append(overview_layer)

    library_pen = {
        'version': '2.17',
        'themes': existing_pen.get('themes', {'mode': ['light', 'dark'], 'density': ['regular', 'compact']}),
        'variables': existing_pen.get('variables', {}),
        'fileToken': 'antd-6-all-components-20260915',
        'children': final_layers,
    }

    print(f'Writing to {OUTPUT_PATH}...')
    with open(OUTPUT_PATH, 'w') as f:
        json.dump(library_pen, f, indent=2)

    # Sync to active Pencil document
    if os.path.exists(os.path.dirname(PENCIL_DOC_PATH)):
        print(f'Syncing to active Pencil document: {PENCIL_DOC_PATH}...')
        shutil.copyfile(OUTPUT_PATH, PENCIL_DOC_PATH)

    print('All done! Complete category -> component sub-titles -> multiple artboards hierarchy generated.')


if __name__ == '__main__':
    main()
