import json
import sys
from scripts.pen_mcp import PenMCP

def populate_live():
    client = PenMCP()

    # 1. Delete temporary test instance
    del_code = '''
    const testInst = Get('D8qQhq');
    if (testInst) Delete('D8qQhq');
    Print('TEST_INSTANCE_DELETED');
    '''
    client.execute(del_code)

    # 2. Section Banner
    banner = {
        "type": "frame",
        "name": "Sub-Title: SearchForm · 高级搜索表单",
        "x": 0,
        "y": 0,
        "width": 5632,
        "height": 64,
        "layout": "vertical",
        "gap": 6,
        "children": [
            {
                "type": "text",
                "name": "Title",
                "fill": "#FFFFFF",
                "content": "08 Pro Components · SearchForm 高级搜索表单",
                "fontFamily": "Inter",
                "fontSize": 26,
                "fontWeight": "700"
            },
            {
                "type": "text",
                "name": "Description",
                "fill": "#BFBFBF",
                "content": "专为企业级中后台打造的紧凑型查询筛选表单。严格遵循五大核心网格折叠与操作停靠算法，支持列数自适应、阈值折叠、末列右对齐与满行自动换行。",
                "fontFamily": "Inter",
                "fontSize": 13,
                "fontWeight": "normal"
            }
        ]
    }

    # 3. Principles Artboard (Specification & Rules)
    principles_artboard = {
        "type": "frame",
        "name": "Principles · 核心规范与计算规则",
        "x": 0,
        "y": 90,
        "width": 1728,
        "height": 2680,
        "fill": "#FFFFFF",
        "cornerRadius": 12,
        "layout": "vertical",
        "padding": 32,
        "gap": 24,
        "children": [
            {
                "type": "frame",
                "name": "Header",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 6,
                "children": [
                    {
                        "type": "text",
                        "fill": "#1E293B",
                        "content": "SearchForm 设计规范与布局计算规则",
                        "fontFamily": "Inter",
                        "fontSize": 22,
                        "fontWeight": "700"
                    },
                    {
                        "type": "text",
                        "fill": "#64748B",
                        "content": "针对企业高频查询场景的标准栅格与折叠收起交互规范（基于 Ant Design Pro QueryFilter 核心演进）",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "fontWeight": "normal"
                    }
                ]
            },
            # Rule 1
            {
                "type": "frame",
                "name": "Rule 1 · 配置变量定义",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 10,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "一、核心配置变量 (Configuration Variables)",
                        "fontFamily": "Inter",
                        "fontSize": 15,
                        "fontWeight": "600"
                    },
                    {
                        "type": "text",
                        "fill": "#334155",
                        "content": "• filterColumns: 每一行显示的栅格列数（正整数，推荐 3 列或 4 列，响应式布局可动态计算）。\n• minRows: 最小显示的行数（正整数，默认 1 行，多行场景可设为 2 行）。\n• collapsed: 折叠状态标识（布尔值，默认 true 收起，false 展开）。\n• fields: 表单字段定义集合（每个字段包含 label、type、options、placeholder 等属性）。",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.6
                    }
                ]
            },
            # Rule 2
            {
                "type": "frame",
                "name": "Rule 2 · 栅格与占位规则",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 10,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "二、栅格占用与间距模型 (Grid Allocation Model)",
                        "fontFamily": "Inter",
                        "fontSize": 15,
                        "fontWeight": "600"
                    },
                    {
                        "type": "text",
                        "fill": "#334155",
                        "content": "• 每个字段严格占 1 列（Column），操作按钮组（查询、重置、展开）整体占 1 列。\n• 栅格间距严格遵循 Ant Design 规范：水平列间距 columnGap = 24px，垂直行间距 rowGap = 16px。\n• 控件高度统一：small (24px) / middle (32px 标准) / large (40px)。",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.6
                    }
                ]
            },
            # Rule 3
            {
                "type": "frame",
                "name": "Rule 3 · 折叠按钮触发阈值",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 10,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "三、折叠按钮触发阈值算法 (Folding Threshold Formula)",
                        "fontFamily": "Inter",
                        "fontSize": 15,
                        "fontWeight": "600"
                    },
                    {
                        "type": "text",
                        "fill": "#334155",
                        "content": "• 阈值计算公式：收起状态下允许展示的最大字段数为 M = filterColumns × minRows - 1。\n• 判定分支 1 (N ≤ M)：总字段数未填满折叠容量时，操作区仅显示「查询」与「重置」，严禁展示展开/收起按钮。\n• 判定分支 2 (N > M)：总字段数超出折叠容量时，操作区显示「查询」、「重置」以及「展开 ∨ / 收起 ∧」交互。",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.6
                    }
                ]
            },
            # Rule 4
            {
                "type": "frame",
                "name": "Rule 4 · 双态展示机制",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 10,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "四、展开/收起双态机制 (Dual-State Mechanism)",
                        "fontFamily": "Inter",
                        "fontSize": 15,
                        "fontWeight": "600"
                    },
                    {
                        "type": "text",
                        "fill": "#334155",
                        "content": "• 收起状态 (collapsed: true)：截取展示前 M 个字段，折叠按钮文案展示为「展开 ∨」（蓝色文本链接带下箭头）。\n• 展开状态 (collapsed: false)：全量展示所有 N 个字段，折叠按钮文案切换为「收起 ∧」（蓝色文本链接带上箭头）。",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.6
                    }
                ]
            },
            # Rule 5
            {
                "type": "frame",
                "name": "Rule 5 · 操作固定与换行算法",
                "width": "fill_container",
                "fill": "#F0F9FF",
                "cornerRadius": 8,
                "stroke": "#BAE6FD",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 10,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0369A1",
                        "content": "五、操作固定停靠与满行自动折行算法 (Action Alignment & Wrapping)",
                        "fontFamily": "Inter",
                        "fontSize": 15,
                        "fontWeight": "600"
                    },
                    {
                        "type": "text",
                        "fill": "#0C4A6E",
                        "content": "• 规则核心：操作列永远固定停靠在最后一列（第 filterColumns 列右对齐）。\n• 整倍数判定 (K % filterColumns === 0)：若当前可见字段数正好是 filterColumns 的倍数，说明该行所有列均被字段占满，操作区强制折行到下一行并在最后一列右对齐显示。\n• 非整倍数 (K % filterColumns !== 0)：最后一行仍有余位，操作区停靠在最后一行字段的最后一列，与最右侧边缘严格对齐。",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.6
                    }
                ]
            }
        ]
    }

    # 4. Components Artboard
    components_artboard = {
        "type": "frame",
        "name": "Components · 变体规格矩阵",
        "x": 1768,
        "y": 90,
        "width": 1728,
        "height": 2680,
        "fill": "#FFFFFF",
        "cornerRadius": 12,
        "layout": "vertical",
        "padding": 32,
        "gap": 28,
        "children": [
            {
                "type": "frame",
                "name": "Header",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 6,
                "children": [
                    {
                        "type": "text",
                        "fill": "#1E293B",
                        "content": "SearchForm Master Component & 规格变体",
                        "fontFamily": "Inter",
                        "fontSize": 22,
                        "fontWeight": "700"
                    },
                    {
                        "type": "text",
                        "fill": "#64748B",
                        "content": "主组件定义、尺寸适配（Small / Middle / Large）与容器外观变体",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "fontWeight": "normal"
                    }
                ]
            },
            # Middle Size
            {
                "type": "frame",
                "name": "Middle Size · 标准尺寸 (32px)",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 24,
                "layout": "vertical",
                "gap": 16,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "1. Middle (默认标准尺寸 32px · 中后台最高频使用)",
                        "fontFamily": "Inter",
                        "fontSize": 15,
                        "fontWeight": "600"
                    },
                    {
                        "type": "ref",
                        "ref": "yrlNJ",
                        "name": "SearchForm · Middle",
                        "width": "fill_container",
                        "height": 64,
                        "inputs": {
                            "size": "middle",
                            "filterColumns": 3,
                            "minRows": 1,
                            "collapsed": True
                        }
                    }
                ]
            },
            # Small Size
            {
                "type": "frame",
                "name": "Small Size · 紧凑尺寸 (24px)",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 24,
                "layout": "vertical",
                "gap": 16,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "2. Small (紧凑尺寸 24px · 用于侧边栏或高度敏感表格)",
                        "fontFamily": "Inter",
                        "fontSize": 15,
                        "fontWeight": "600"
                    },
                    {
                        "type": "ref",
                        "ref": "yrlNJ",
                        "name": "SearchForm · Small",
                        "width": "fill_container",
                        "height": 56,
                        "inputs": {
                            "size": "small",
                            "filterColumns": 3,
                            "minRows": 1,
                            "collapsed": True
                        }
                    }
                ]
            },
            # Large Size
            {
                "type": "frame",
                "name": "Large Size · 宽大尺寸 (40px)",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 24,
                "layout": "vertical",
                "gap": 16,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "3. Large (宽大尺寸 40px · 用于独立查询门户或触控大屏)",
                        "fontFamily": "Inter",
                        "fontSize": 15,
                        "fontWeight": "600"
                    },
                    {
                        "type": "ref",
                        "ref": "yrlNJ",
                        "name": "SearchForm · Large",
                        "width": "fill_container",
                        "height": 72,
                        "inputs": {
                            "size": "large",
                            "filterColumns": 3,
                            "minRows": 1,
                            "collapsed": True
                        }
                    }
                ]
            }
        ]
    }

    # 5. Usage Artboard (7 Real Scenarios)
    usage_artboard = {
        "type": "frame",
        "name": "Usage · 各场景示例",
        "x": 3536,
        "y": 90,
        "width": 2096,
        "height": 2680,
        "fill": "#FFFFFF",
        "cornerRadius": 12,
        "layout": "vertical",
        "padding": 32,
        "gap": 24,
        "children": [
            {
                "type": "frame",
                "name": "Header",
                "width": "fill_container",
                "layout": "vertical",
                "gap": 6,
                "children": [
                    {
                        "type": "text",
                        "fill": "#1E293B",
                        "content": "SearchForm 业务全场景与状态示例",
                        "fontFamily": "Inter",
                        "fontSize": 22,
                        "fontWeight": "700"
                    },
                    {
                        "type": "text",
                        "fill": "#64748B",
                        "content": "完整覆盖字段数 ≤ 阈值、单行折叠、多行折叠、全量展开、整倍数自动换行与无边框嵌入模式",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "fontWeight": "normal"
                    }
                ]
            },
            # Scenario 1
            {
                "type": "frame",
                "name": "Scenario 1 · 基础极简表单（N <= 阈值，无折叠按钮）",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 12,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "场景 1：基础极简表单（filterColumns=3, minRows=1, 字段数=2 ≤ 3×1-1=2）\n• 判定结果：字段数未超标，操作区仅展示「查询」「重置」，绝不显示展开/收起按钮。操作停靠在第 1 行第 3 列。",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.5,
                        "fontWeight": "500"
                    },
                    {
                        "type": "ref",
                        "ref": "yrlNJ",
                        "name": "SearchForm · Scenario 1",
                        "width": "fill_container",
                        "height": 64,
                        "inputs": {
                            "filterColumns": 3,
                            "minRows": 1,
                            "fields": json.dumps([
                                {"label": "规则名称", "placeholder": "请输入规则名称"},
                                {"label": "状态", "type": "select", "options": "全部|启用|停用", "value": "全部"}
                            ], ensure_ascii=False),
                            "bordered": True
                        }
                    }
                ]
            },
            # Scenario 2
            {
                "type": "frame",
                "name": "Scenario 2 · 标准单行默认收起（N > 阈值，展示「展开 ∨」）",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 12,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "场景 2：标准单行默认收起（filterColumns=4, minRows=1, 字段数=6 > 3, collapsed=true）\n• 判定结果：收起展示前 3 个字段，操作停靠在第 1 行第 4 列，展示「查询」「重置」「展开 ∨」。",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.5,
                        "fontWeight": "500"
                    },
                    {
                        "type": "ref",
                        "ref": "yrlNJ",
                        "name": "SearchForm · Scenario 2",
                        "width": "fill_container",
                        "height": 64,
                        "inputs": {
                            "filterColumns": 4,
                            "minRows": 1,
                            "collapsed": True,
                            "fields": json.dumps([
                                {"label": "规则名称", "placeholder": "请输入规则名称"},
                                {"label": "描述", "placeholder": "请输入描述"},
                                {"label": "服务调用", "placeholder": "请输入调用次数"},
                                {"label": "状态", "type": "select", "options": "全部|启用|停用", "value": "全部"},
                                {"label": "调度时间", "type": "date", "placeholder": "请选择"},
                                {"label": "负责人", "placeholder": "请输入"}
                            ], ensure_ascii=False),
                            "bordered": True
                        }
                    }
                ]
            },
            # Scenario 3
            {
                "type": "frame",
                "name": "Scenario 3 · 标准单行全量展开（展开所有字段，展示「收起 ∧」）",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 12,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "场景 3：标准单行全量展开（filterColumns=4, minRows=1, 字段数=6, collapsed=false）\n• 判定结果：展示全量 6 个字段（第 1 行 4 个，第 2 行 2 个），操作区自动对齐至第 2 行第 4 列（最后一列），展示「收起 ∧」。",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.5,
                        "fontWeight": "500"
                    },
                    {
                        "type": "ref",
                        "ref": "yrlNJ",
                        "name": "SearchForm · Scenario 3",
                        "width": "fill_container",
                        "height": 112,
                        "inputs": {
                            "filterColumns": 4,
                            "minRows": 1,
                            "collapsed": False,
                            "fields": json.dumps([
                                {"label": "规则名称", "placeholder": "请输入规则名称"},
                                {"label": "描述", "placeholder": "请输入描述"},
                                {"label": "服务调用", "placeholder": "请输入调用次数"},
                                {"label": "状态", "type": "select", "options": "全部|启用|停用", "value": "全部"},
                                {"label": "调度时间", "type": "date", "placeholder": "请选择"},
                                {"label": "负责人", "placeholder": "请输入"}
                            ], ensure_ascii=False),
                            "bordered": True
                        }
                    }
                ]
            },
            # Scenario 4
            {
                "type": "frame",
                "name": "Scenario 4 · 多行默认收起（minRows=2，阈值 M=5）",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 12,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "场景 4：多行默认收起（filterColumns=3, minRows=2, 字段数=7, collapsed=true）\n• 判定结果：阈值 M = 3×2-1 = 5。收起状态下展示前 5 个字段（第 1 行 3 个，第 2 行 2 个），操作区停靠在第 2 行第 3 列，展示「展开 ∨」。",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.5,
                        "fontWeight": "500"
                    },
                    {
                        "type": "ref",
                        "ref": "yrlNJ",
                        "name": "SearchForm · Scenario 4",
                        "width": "fill_container",
                        "height": 112,
                        "inputs": {
                            "filterColumns": 3,
                            "minRows": 2,
                            "collapsed": True,
                            "fields": json.dumps([
                                {"label": "规则名称", "placeholder": "请输入"},
                                {"label": "所属服务", "placeholder": "请输入"},
                                {"label": "调度类型", "type": "select", "options": "全部|自动|手动", "value": "全部"},
                                {"label": "运行状态", "type": "select", "options": "全部|成功|失败", "value": "全部"},
                                {"label": "调用阈值", "placeholder": "请输入"},
                                {"label": "更新时间", "type": "date", "placeholder": "请选择"},
                                {"label": "最后操作人", "placeholder": "请输入"}
                            ], ensure_ascii=False),
                            "bordered": True
                        }
                    }
                ]
            },
            # Scenario 5
            {
                "type": "frame",
                "name": "Scenario 5 · 多行全量展开（跨 3 行展示全量 7 个字段）",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 12,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "场景 5：多行全量展开（filterColumns=3, minRows=2, 字段数=7, collapsed=false）\n• 判定结果：展示全部 7 个字段（跨 3 行），操作区位于第 3 行第 3 列（最后一列），展示「收起 ∧」。",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.5,
                        "fontWeight": "500"
                    },
                    {
                        "type": "ref",
                        "ref": "yrlNJ",
                        "name": "SearchForm · Scenario 5",
                        "width": "fill_container",
                        "height": 160,
                        "inputs": {
                            "filterColumns": 3,
                            "minRows": 2,
                            "collapsed": False,
                            "fields": json.dumps([
                                {"label": "规则名称", "placeholder": "请输入"},
                                {"label": "所属服务", "placeholder": "请输入"},
                                {"label": "调度类型", "type": "select", "options": "全部|自动|手动", "value": "全部"},
                                {"label": "运行状态", "type": "select", "options": "全部|成功|失败", "value": "全部"},
                                {"label": "调用阈值", "placeholder": "请输入"},
                                {"label": "更新时间", "type": "date", "placeholder": "请选择"},
                                {"label": "最后操作人", "placeholder": "请输入"}
                            ], ensure_ascii=False),
                            "bordered": True
                        }
                    }
                ]
            },
            # Scenario 6
            {
                "type": "frame",
                "name": "Scenario 6 · 满行整倍数换行（Rule 5 核心算法验证）",
                "width": "fill_container",
                "fill": "#EFF6FF",
                "cornerRadius": 8,
                "stroke": "#BFDBFE",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 12,
                "children": [
                    {
                        "type": "text",
                        "fill": "#1E40AF",
                        "content": "场景 6：字段数刚好填满整行（filterColumns=3, minRows=1, 展开态字段数=3，刚好为 3 的倍数）\n• 判定结果：3 个字段填满第 1 行所有 3 列。操作区自动折行到第 2 行，并停靠在第 2 行第 3 列（最后一列右对齐）！",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.5,
                        "fontWeight": "600"
                    },
                    {
                        "type": "ref",
                        "ref": "yrlNJ",
                        "name": "SearchForm · Scenario 6",
                        "width": "fill_container",
                        "height": 112,
                        "inputs": {
                            "filterColumns": 3,
                            "minRows": 1,
                            "collapsed": False,
                            "fields": json.dumps([
                                {"label": "规则名称", "placeholder": "请输入"},
                                {"label": "关联页面", "type": "select", "options": "全部|首页|详情页", "value": "全部"},
                                {"label": "服务状态", "type": "select", "options": "全部|正常|异常", "value": "全部"}
                            ], ensure_ascii=False),
                            "bordered": True
                        }
                    }
                ]
            },
            # Scenario 7
            {
                "type": "frame",
                "name": "Scenario 7 · 无边框嵌入模式（bordered=false）",
                "width": "fill_container",
                "fill": "#F8FAFC",
                "cornerRadius": 8,
                "stroke": "#E2E8F0",
                "strokeWidth": 1,
                "padding": 20,
                "layout": "vertical",
                "gap": 12,
                "children": [
                    {
                        "type": "text",
                        "fill": "#0F172A",
                        "content": "场景 7：无边框嵌入模式（bordered=false，纯透明背景，用于 Drawer / Modal / 自定义卡片内嵌入）",
                        "fontFamily": "Inter",
                        "fontSize": 13,
                        "lineHeight": 1.5,
                        "fontWeight": "500"
                    },
                    {
                        "type": "ref",
                        "ref": "yrlNJ",
                        "name": "SearchForm · Scenario 7",
                        "width": "fill_container",
                        "height": 32,
                        "inputs": {
                            "filterColumns": 4,
                            "minRows": 1,
                            "collapsed": True,
                            "bordered": False,
                            "fields": json.dumps([
                                {"label": "关键词", "placeholder": "快速筛选"},
                                {"label": "分类", "type": "select", "options": "全部|分类A|分类B", "value": "全部"},
                                {"label": "日期", "type": "date", "placeholder": "选择日期"}
                            ], ensure_ascii=False)
                        }
                    }
                ]
            }
        ]
    }

    # Assemble section
    section_searchform = {
        "type": "frame",
        "name": "SearchForm · 高级搜索表单",
        "x": 0,
        "y": 0,
        "width": 5632,
        "height": 2800,
        "children": [
            banner,
            principles_artboard,
            components_artboard,
            usage_artboard
        ]
    }

    ins_code = f'''
    Insert(\"z1OgiU\", {json.dumps(section_searchform, ensure_ascii=False)});
    Print(\"SECTION_INSERT_SUCCESS\");
    '''
    res = client.execute(ins_code)
    print("Section Insert Result:", res.get('data', {}).get('result', {}).get('message') or res.get('data', {}).get('error'))
    client.close()

if __name__ == '__main__':
    populate_live()
