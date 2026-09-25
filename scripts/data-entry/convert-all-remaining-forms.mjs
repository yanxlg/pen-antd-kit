import fs from "fs";

// Master IDs
const MASTERS = {
  Form: "oWtOf",
  FormItem: "npYpT",
  Input: "iQ5uU",
  InputPassword: "C8cDZ",
  InputTextArea: "jSd6E",
  InputNumber: "SiWnx",
  Select: "VoQE7",
  Cascader: "F9Vfg",
  DatePicker: "jCYiD",
  RangePicker: "QmZCd",
  TimePicker: "hPMzD",
  RadioGroup: "H0DThz",
  Checkbox: "cpj9Y",
  Switch: "rZqkn",
  Button: "DQZzq",
  Alert: "rS4lY"
};

const labelCol8 = {
  width: 150,
  height: 32,
  justifyContent: "end",
  alignItems: "center",
  padding: [0, 8, 0, 0]
};

const labelCol6 = {
  width: 150,
  height: 32,
  justifyContent: "end",
  alignItems: "center",
  padding: [0, 8, 0, 0]
};

const labelCol4 = {
  width: 100,
  height: 32,
  justifyContent: "end",
  alignItems: "center",
  padding: [0, 8, 0, 0]
};

const makeItem = ({ name, label, width = 600, labelStyle = labelCol8, required = false, child, wrapperWidth = "fill_container", layout = "horizontal" }) => {
  if (layout === "vertical") {
    return {
      type: "ref",
      ref: MASTERS.FormItem,
      name: `Form.Item · ${name}`,
      width: width === "fill_container" ? "fill_container" : width,
      layout: "vertical",
      gap: 8,
      descendants: {
        FlQ2c: {
          width: "fill_container",
          height: 22,
          justifyContent: "start",
          alignItems: "center",
          padding: 0
        },
        qOWm2: { enabled: required },
        O1MFk: { content: label ? `${label}:` : "" },
        CVtG8: {
          width: "fill_container",
          children: [child]
        }
      }
    };
  }
  return {
    type: "ref",
    ref: MASTERS.FormItem,
    name: `Form.Item · ${name}`,
    width: width === "fill_container" ? "fill_container" : width,
    gap: 0,
    descendants: {
      FlQ2c: labelStyle,
      qOWm2: { enabled: required },
      O1MFk: { content: label ? `${label}:` : "" },
      CVtG8: {
        width: wrapperWidth,
        children: [child]
      }
    }
  };
};

// 19: szkF5 -> FqTy6
export const card19 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · horizontal_login",
  width: "fill_container",
  descendants: {
    tSaDV: {
      children: [
        {
          type: "frame",
          name: "Inline Form Row",
          width: "fill_container",
          layout: "horizontal",
          gap: 16,
          alignItems: "center",
          children: [
            {
              type: "ref",
              ref: MASTERS.FormItem,
              name: "Form.Item · Username",
              gap: 8,
              descendants: {
                FlQ2c: { enabled: false },
                CVtG8: {
                  children: [
                    {
                      type: "ref",
                      ref: MASTERS.Input,
                      name: "Input · Username",
                      width: 160,
                      height: 32,
                      inputs: { placeholder: "Username", value: "" }
                    }
                  ]
                }
              }
            },
            {
              type: "ref",
              ref: MASTERS.FormItem,
              name: "Form.Item · Password",
              gap: 8,
              descendants: {
                FlQ2c: { enabled: false },
                CVtG8: {
                  children: [
                    {
                      type: "ref",
                      ref: MASTERS.InputPassword,
                      name: "Input.Password",
                      width: 160,
                      height: 32,
                      inputs: { placeholder: "Password", value: "" }
                    }
                  ]
                }
              }
            },
            {
              type: "ref",
              ref: MASTERS.Button,
              name: "Button · Log in",
              width: 85,
              height: 32,
              inputs: { type: "primary", children: "Log in", disabled: true }
            }
          ]
        }
      ]
    }
  }
};

// 20: ztVMC -> dGwdO
export const card20 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · login",
  width: 360,
  descendants: {
    tSaDV: {
      children: [
        {
          type: "ref",
          ref: MASTERS.FormItem,
          name: "Form.Item · Username",
          width: 360,
          gap: 0,
          descendants: {
            FlQ2c: { enabled: false },
            CVtG8: {
              width: "fill_container",
              children: [
                {
                  type: "ref",
                  ref: MASTERS.Input,
                  name: "Input · Username",
                  width: "fill_container",
                  height: 32,
                  inputs: { placeholder: "Username", value: "" }
                }
              ]
            }
          }
        },
        {
          type: "ref",
          ref: MASTERS.FormItem,
          name: "Form.Item · Password",
          width: 360,
          gap: 0,
          descendants: {
            FlQ2c: { enabled: false },
            CVtG8: {
              width: "fill_container",
              children: [
                {
                  type: "ref",
                  ref: MASTERS.InputPassword,
                  name: "Input.Password",
                  width: "fill_container",
                  height: 32,
                  inputs: { placeholder: "Password", value: "" }
                }
              ]
            }
          }
        },
        {
          type: "frame",
          name: "Remember & Forgot",
          width: "fill_container",
          layout: "horizontal",
          justifyContent: "space-between",
          alignItems: "center",
          children: [
            {
              type: "ref",
              ref: MASTERS.Checkbox,
              name: "Checkbox · Remember me",
              width: 120,
              height: 22,
              inputs: { checked: true, children: "Remember me" }
            },
            {
              type: "text",
              name: "Forgot password link",
              content: "Forgot password",
              fontFamily: "Inter",
              fontSize: 14,
              fill: "#1677ff"
            }
          ]
        },
        {
          type: "ref",
          ref: MASTERS.Button,
          name: "Button · Log in",
          width: "fill_container",
          height: 32,
          inputs: { type: "primary", children: "Log in" }
        },
        {
          type: "frame",
          name: "Register Row",
          layout: "horizontal",
          gap: 4,
          alignItems: "center",
          children: [
            {
              type: "text",
              name: "Text",
              content: "or",
              fontFamily: "Inter",
              fontSize: 14,
              fill: "#000000e0"
            },
            {
              type: "text",
              name: "Register link",
              content: "Register now!",
              fontFamily: "Inter",
              fontSize: 14,
              fill: "#1677ff"
            }
          ]
        }
      ]
    }
  }
};

// 21: sx27H -> G6plz
export const card21 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · register",
  width: 600,
  descendants: {
    tSaDV: {
      children: [
        makeItem({ name: "E-mail", label: "E-mail", required: true, child: { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "Password", label: "Password", required: true, child: { type: "ref", ref: MASTERS.InputPassword, name: "Input.Password", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "Confirm Password", label: "Confirm Password", required: true, child: { type: "ref", ref: MASTERS.InputPassword, name: "Input.Password", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "Nickname", label: "Nickname", required: true, child: { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "Habitation", label: "Habitation", required: true, child: { type: "ref", ref: MASTERS.Cascader, name: "Cascader", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({
          name: "Phone Number",
          label: "Phone Number",
          required: true,
          child: {
            type: "frame",
            name: "Phone Row",
            width: "fill_container",
            layout: "horizontal",
            gap: 8,
            alignItems: "center",
            children: [
              { type: "ref", ref: MASTERS.Select, name: "Select · Prefix", width: 80, height: 32, inputs: { value: "+86" } },
              { type: "ref", ref: MASTERS.Input, name: "Input · Phone", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } }
            ]
          }
        }),
        makeItem({ name: "Donation", label: "Donation", required: true, child: { type: "ref", ref: MASTERS.InputNumber, name: "InputNumber", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "Website", label: "Website", required: true, child: { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "Intro", label: "Intro", required: true, child: { type: "ref", ref: MASTERS.InputTextArea, name: "Input.TextArea", width: "fill_container", height: 54, inputs: { placeholder: "", value: "" } } }),
        makeItem({
          name: "Gender",
          label: "Gender",
          required: true,
          child: {
            type: "ref",
            ref: MASTERS.Select,
            name: "Select · Gender",
            width: "fill_container",
            height: 32,
            inputs: {
              placeholder: "Select your gender",
              options: JSON.stringify([{ label: "Male", value: "male" }, { label: "Female", value: "female" }, { label: "Other", value: "other" }])
            }
          }
        }),
        makeItem({
          name: "Captcha",
          label: "Captcha",
          required: true,
          child: {
            type: "frame",
            name: "Captcha Row",
            width: "fill_container",
            layout: "horizontal",
            gap: 8,
            alignItems: "center",
            children: [
              { type: "ref", ref: MASTERS.Input, name: "Input · Captcha", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } },
              { type: "ref", ref: MASTERS.Button, name: "Button · Get Captcha", width: 110, height: 32, inputs: { type: "default", children: "Get captcha" } }
            ]
          }
        }),
        makeItem({
          name: "Agreement",
          label: "",
          labelStyle: { width: 150, height: 32, justifyContent: "end" },
          child: {
            type: "ref",
            ref: MASTERS.Checkbox,
            name: "Checkbox · Agreement",
            width: 250,
            height: 22,
            inputs: { children: "I have read the agreement" }
          }
        }),
        makeItem({
          name: "Register",
          label: "",
          labelStyle: { width: 150, height: 32, justifyContent: "end" },
          child: {
            type: "ref",
            ref: MASTERS.Button,
            name: "Button · Register",
            width: 85,
            height: 32,
            inputs: { type: "primary", children: "Register" }
          }
        })
      ]
    }
  }
};

// 22: Q7C56 -> H43Gn
export const card22 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · advanced_search",
  width: "fill_container",
  descendants: {
    tSaDV: {
      children: [
        {
          type: "frame",
          name: "Search Fields Grid",
          width: "fill_container",
          layout: "vertical",
          gap: 16,
          children: [
            {
              type: "frame",
              name: "Row 1",
              width: "fill_container",
              layout: "horizontal",
              gap: 16,
              children: [1, 2, 3].map(n => ({
                type: "ref",
                ref: MASTERS.FormItem,
                name: `Form.Item · Field ${n}`,
                width: "fill_container",
                gap: 0,
                descendants: {
                  FlQ2c: { width: 60, height: 32, justifyContent: "end", padding: [0, 8, 0, 0] },
                  qOWm2: { enabled: false },
                  O1MFk: { content: `Field ${n}:` },
                  CVtG8: {
                    width: "fill_container",
                    children: [
                      {
                        type: "ref",
                        ref: MASTERS.Input,
                        name: "Input",
                        width: "fill_container",
                        height: 32,
                        inputs: { placeholder: "placeholder", value: "" }
                      }
                    ]
                  }
                }
              }))
            },
            {
              type: "frame",
              name: "Row 2",
              width: "fill_container",
              layout: "horizontal",
              gap: 16,
              children: [4, 5, 6].map(n => ({
                type: "ref",
                ref: MASTERS.FormItem,
                name: `Form.Item · Field ${n}`,
                width: "fill_container",
                gap: 0,
                descendants: {
                  FlQ2c: { width: 60, height: 32, justifyContent: "end", padding: [0, 8, 0, 0] },
                  qOWm2: { enabled: false },
                  O1MFk: { content: `Field ${n}:` },
                  CVtG8: {
                    width: "fill_container",
                    children: [
                      {
                        type: "ref",
                        ref: MASTERS.Input,
                        name: "Input",
                        width: "fill_container",
                        height: 32,
                        inputs: { placeholder: "placeholder", value: "" }
                      }
                    ]
                  }
                }
              }))
            },
            {
              type: "frame",
              name: "Button Actions Row",
              width: "fill_container",
              layout: "horizontal",
              justifyContent: "end",
              gap: 8,
              alignItems: "center",
              children: [
                { type: "ref", ref: MASTERS.Button, name: "Button · Search", width: 85, height: 32, inputs: { type: "primary", children: "Search" } },
                { type: "ref", ref: MASTERS.Button, name: "Button · Clear", width: 70, height: 32, inputs: { type: "default", children: "Clear" } },
                { type: "text", name: "Collapse Link", content: "Collapse ^", fontFamily: "Inter", fontSize: 14, fill: "#1677ff" }
              ]
            }
          ]
        }
      ]
    }
  }
};

// 24: xENxO -> cmUmY
export const card24 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · time_related_controls",
  width: 600,
  descendants: {
    tSaDV: {
      children: [
        makeItem({ name: "DatePicker", label: "DatePicker", required: true, child: { type: "ref", ref: MASTERS.DatePicker, name: "DatePicker", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "DatePicker[showTime]", label: "DatePicker[showTime]", required: true, child: { type: "ref", ref: MASTERS.DatePicker, name: "DatePicker[showTime]", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "RangePicker", label: "RangePicker", required: true, child: { type: "ref", ref: MASTERS.RangePicker, name: "RangePicker", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "RangePicker[showTime]", label: "RangePicker[showTime]", required: true, child: { type: "ref", ref: MASTERS.RangePicker, name: "RangePicker[showTime]", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "TimePicker", label: "TimePicker", required: true, child: { type: "ref", ref: MASTERS.TimePicker, name: "TimePicker", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({
          name: "Submit",
          label: "",
          labelStyle: { width: 150, height: 32, justifyContent: "end" },
          child: {
            type: "ref",
            ref: MASTERS.Button,
            name: "Button · Submit",
            width: 85,
            height: 32,
            inputs: { type: "primary", children: "Submit" }
          }
        })
      ]
    }
  }
};

// 25: lLDwu -> Awoar
export const card25 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · warning_only",
  width: "fill_container",
  descendants: {
    tSaDV: {
      children: [
        makeItem({
          name: "URL",
          label: "URL",
          required: true,
          layout: "vertical",
          child: {
            type: "ref",
            ref: MASTERS.Input,
            name: "Input",
            width: "fill_container",
            height: 32,
            inputs: { placeholder: "input placeholder", value: "" }
          }
        }),
        makeItem({
          name: "Buttons",
          label: "",
          layout: "vertical",
          child: {
            type: "frame",
            name: "Space",
            layout: "horizontal",
            gap: 8,
            children: [
              { type: "ref", ref: MASTERS.Button, name: "Button · Submit", width: 85, height: 32, inputs: { type: "primary", children: "Submit" } },
              { type: "ref", ref: MASTERS.Button, name: "Button · Fill", width: 70, height: 32, inputs: { type: "default", children: "Fill" } }
            ]
          }
        })
      ]
    }
  }
};

// 26: VhVgS -> QWMCv
export const card26 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · validate_static",
  width: 600,
  descendants: {
    tSaDV: {
      children: [
        makeItem({
          name: "Fail",
          label: "Fail",
          child: {
            type: "frame",
            name: "Error Item",
            width: "fill_container",
            layout: "vertical",
            gap: 4,
            children: [
              { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "unavailable choice", value: "", status: "error" } },
              { type: "text", name: "Help Text", content: "Should be combination of numbers & alphabets", fontFamily: "Inter", fontSize: 12, fill: "#ff4d4f" }
            ]
          }
        }),
        makeItem({ name: "Warning", label: "Warning", child: { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "Warning", value: "", status: "warning" } } }),
        makeItem({ name: "Validating", label: "Validating", child: { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "I'm the content is being validated", value: "" } } }),
        makeItem({ name: "Success", label: "Success", child: { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "I'm the content", value: "" } } }),
        makeItem({ name: "DatePicker", label: "Success", child: { type: "ref", ref: MASTERS.DatePicker, name: "DatePicker", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "TimePicker", label: "Warning", child: { type: "ref", ref: MASTERS.TimePicker, name: "TimePicker", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "RangePicker", label: "Error", child: { type: "ref", ref: MASTERS.RangePicker, name: "RangePicker", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "Select", label: "Error", child: { type: "ref", ref: MASTERS.Select, name: "Select", width: "fill_container", height: 32, inputs: { placeholder: "I'm Select", value: "" } } }),
        makeItem({ name: "InputNumber", label: "Success", child: { type: "ref", ref: MASTERS.InputNumber, name: "InputNumber", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } })
      ]
    }
  }
};

// 27: KPq3T -> ntw83
export const card27 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · dynamic_rule",
  width: 600,
  descendants: {
    tSaDV: {
      children: [
        makeItem({ name: "Name", label: "Name", required: true, labelStyle: labelCol4, wrapperWidth: 200, child: { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "Please input your name", value: "" } } }),
        makeItem({ name: "Nickname", label: "Nickname", required: false, labelStyle: labelCol4, wrapperWidth: 200, child: { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "Please input your nickname", value: "" } } }),
        makeItem({
          name: "Checkbox",
          label: "",
          labelStyle: { width: 100, height: 32, justifyContent: "end" },
          wrapperWidth: 200,
          child: { type: "ref", ref: MASTERS.Checkbox, name: "Checkbox", width: 160, height: 22, inputs: { children: "Nickname is required", checked: false } }
        }),
        makeItem({
          name: "Check",
          label: "",
          labelStyle: { width: 100, height: 32, justifyContent: "end" },
          wrapperWidth: 200,
          child: { type: "ref", ref: MASTERS.Button, name: "Button · Check", width: 85, height: 32, inputs: { type: "primary", children: "Check" } }
        })
      ]
    }
  }
};

// 28: bA98a -> jchwh
export const card28 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · dependencies",
  width: 600,
  descendants: {
    tSaDV: {
      children: [
        {
          type: "ref",
          ref: MASTERS.Alert,
          name: "Alert",
          width: 600,
          height: 40,
          inputs: {
            title: " Try modify `Password2` and then modify `Password`",
            type: "info",
            showIcon: true,
            closable: false
          }
        },
        makeItem({ name: "Password", label: "Password", required: true, layout: "vertical", child: { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({ name: "Confirm Password", label: "Confirm Password", required: true, layout: "vertical", child: { type: "ref", ref: MASTERS.Input, name: "Input", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        {
          type: "frame",
          name: "Typography",
          width: "fill_container",
          layout: "vertical",
          gap: 8,
          children: [
            { type: "text", name: "Notice", content: "Only Update when password2 updated:", fontFamily: "Inter", fontSize: 14, fill: "#000000e0" },
            {
              type: "frame",
              name: "pre",
              width: "fill_container",
              fill: "#9696961a",
              cornerRadius: 4,
              stroke: "#64646433",
              strokeWidth: 1,
              padding: [8, 12],
              children: [
                { type: "text", name: "Output", content: "{}", fontFamily: "SFMono-Regular, Monaco, monospace", fontSize: 13, fill: "#000000e0" }
              ]
            }
          ]
        }
      ]
    }
  }
};

// 29: y25Ie -> euYjC
export const card29 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · getValueProps",
  width: 600,
  descendants: {
    tSaDV: {
      children: [
        makeItem({ name: "Date", label: "Date", required: true, child: { type: "ref", ref: MASTERS.DatePicker, name: "DatePicker", width: "fill_container", height: 32, inputs: { placeholder: "", value: "" } } }),
        makeItem({
          name: "Submit",
          label: "",
          labelStyle: { width: 150, height: 32, justifyContent: "end" },
          child: { type: "ref", ref: MASTERS.Button, name: "Button · Submit", width: 85, height: 32, inputs: { type: "primary", children: "Submit" } }
        })
      ]
    }
  }
};

// 30: ex5Kr -> aWPaT
export const card30 = {
  type: "ref",
  ref: MASTERS.Form,
  name: "Form · validate_other",
  width: 600,
  descendants: {
    tSaDV: {
      children: [
        makeItem({
          name: "Plain Text",
          label: "Plain Text",
          child: { type: "text", name: "Plain Text Value", content: "China", fontFamily: "Inter", fontSize: 14, fill: "#000000e0" }
        }),
        makeItem({
          name: "Select",
          label: "Select",
          required: true,
          child: {
            type: "ref",
            ref: MASTERS.Select,
            name: "Select",
            width: "fill_container",
            height: 32,
            inputs: {
              placeholder: "Please select a country",
              options: JSON.stringify([{ label: "China", value: "china" }, { label: "U.S.A", value: "usa" }])
            }
          }
        }),
        makeItem({
          name: "Select[multiple]",
          label: "Select[multiple]",
          required: true,
          child: {
            type: "ref",
            ref: MASTERS.Select,
            name: "Select",
            width: "fill_container",
            height: 32,
            inputs: {
              placeholder: "Please select favourite colors",
              options: JSON.stringify([{ label: "Red", value: "red" }, { label: "Green", value: "green" }, { label: "Blue", value: "blue" }])
            }
          }
        }),
        makeItem({
          name: "InputNumber",
          label: "InputNumber",
          child: {
            type: "frame",
            name: "Number with suffix",
            layout: "horizontal",
            gap: 8,
            alignItems: "center",
            children: [
              { type: "ref", ref: MASTERS.InputNumber, name: "InputNumber", width: 120, height: 32, inputs: { value: "3", placeholder: "" } },
              { type: "text", name: "Suffix", content: "machines", fontFamily: "Inter", fontSize: 14, fill: "#000000e0" }
            ]
          }
        }),
        makeItem({ name: "Switch", label: "Switch", child: { type: "ref", ref: MASTERS.Switch, name: "Switch", width: 44, height: 22, inputs: { checked: false } } }),
        makeItem({
          name: "Radio.Group",
          label: "Radio.Group",
          child: {
            type: "ref",
            ref: MASTERS.RadioGroup,
            name: "Radio.Group",
            width: 250,
            height: 32,
            inputs: {
              options: JSON.stringify(["item 1", "item 2", "item 3"]),
              value: "item 1",
              optionType: "default"
            }
          }
        }),
        makeItem({
          name: "Radio.Button",
          label: "Radio.Button",
          child: {
            type: "ref",
            ref: MASTERS.RadioGroup,
            name: "Radio.Button Group",
            width: 250,
            height: 32,
            inputs: {
              options: JSON.stringify(["item 1", "item 2", "item 3"]),
              value: "item 1",
              optionType: "button"
            }
          }
        }),
        makeItem({
          name: "Upload",
          label: "Upload",
          child: {
            type: "ref",
            ref: MASTERS.Button,
            name: "Button · Click to upload",
            width: 140,
            height: 32,
            inputs: { type: "default", children: "Click to upload" }
          }
        }),
        makeItem({
          name: "Submit",
          label: "",
          labelStyle: { width: 150, height: 32, justifyContent: "end" },
          child: { type: "ref", ref: MASTERS.Button, name: "Button · Submit", width: 85, height: 32, inputs: { type: "primary", children: "Submit" } }
        })
      ]
    }
  }
};
