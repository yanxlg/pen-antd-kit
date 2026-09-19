import fs from 'fs';

// Helper to create Ant Design Search Icon SVG frame
export function createSearchIcon(color = "#000000e0", size = 14) {
  const scale = size / 14;
  return {
    type: "frame",
    name: "svg",
    context: "IconReact - svg",
    clip: true,
    width: size,
    height: size,
    layout: "none",
    children: [
      {
        type: "path",
        x: 0.75 * scale,
        y: 0.75 * scale,
        geometry: "M797.59998 742.5l-259.69996-259.70001c40.29999-52.09998 62.09998-115.79999 62.09998-182.79999 0-80.20001-31.29999-155.39999-87.90002-212.10001-56.60004-56.70001-131.99997-87.89999-212.09998-87.89999-80.10001 0-155.5 31.3-212.10001 87.89999-56.7 56.60001-87.89999 131.9-87.89999 212.10001 0 80.10001 31.3 155.5 87.89999 212.09998 56.60001 56.70001 131.9 87.90002 212.10001 87.90002 67 0 130.59998-21.79999 182.70001-62l259.70001 259.59998c1.53791 1.53887 3.62433 2.4035 5.79999 2.4035 2.1756 0 4.26203-0.86463 5.79999-2.4035l43.59998-43.5c1.53887-1.53791 2.4035-3.62433 2.4035-5.79999 0-2.1756-0.86463-4.26203-2.4035-5.79999m-339.19996-284.09998c-42.40002 42.29999-98.60003 65.59998-158.40002 65.59998-59.79999 0-116-23.29999-158.39999-65.59998-42.30001-42.40002-65.60001-98.60003-65.60001-158.40002 0-59.79999 23.3-116.10001 65.60001-158.39999 42.39999-42.30001 98.6-65.60001 158.39999-65.60001 59.79999 0 116.09998 23.2 158.40002 65.60001 42.30005 42.39999 65.59998 98.6 65.59998 158.39999 0 59.79999-23.29999 116.09998-65.59998 158.40002",
        fill: color,
        width: 12.5 * scale,
        height: 12.5 * scale
      }
    ]
  };
}

// Helper to create Loading Spinner SVG frame
export function createLoadingSpinner(color = "#FFF", size = 14) {
  return {
    type: "frame",
    name: "span",
    context: "span",
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center",
    children: [
      {
        type: "frame",
        name: "svg",
        context: "IconReact - svg",
        clip: true,
        width: size,
        height: size,
        layout: "none",
        children: [
          {
            type: "path",
            x: size * 0.46,
            y: 0,
            geometry: "M512 548c-19.90002 0-36-16.09998-36-36 0-59.39999-11.59998-117-34.59998-171.29999-22.12591-52.27359-54.14642-99.77806-94.30004-139.90001-40.0766-40.20849-87.59253-72.23671-139.89997-94.3-54.20001-22.9-111.79999-34.5-171.20001-34.5-19.89999 0-36-16.1-36-36 0-19.9 16.10001-36 36-36 69.09998 0 136.20001 13.5 199.29999 40.3 61 25.7 115.70001 62.7 162.70001 109.7 47 47 83.90002 101.8 109.70001 162.70001 26.70001 63.10001 40.20001 130.20001 40.20001 199.29999 0.09998 19.90002-16 36-35.90002 36",
            fill: color,
            width: size * 0.535,
            height: size * 0.535
          }
        ]
      }
    ]
  };
}

// Helper to create Download Icon SVG frame
export function createDownloadIcon(color = "#FFF", size = 16) {
  const scale = size / 16;
  return {
    type: "frame",
    name: "svg",
    context: "IconReact - svg",
    clip: true,
    width: size,
    height: size,
    layout: "none",
    children: [
      {
        type: "path",
        x: 1.32 * scale,
        y: 1.71 * scale,
        geometry: "M367.70001 501c1.5163 1.93744 3.83972 3.06946 6.29999 3.06946 2.46027 0 4.78369-1.13202 6.29999-3.06946l112-141.70001c4.09997-5.20001 0.40002-12.9-6.29999-12.9l-74.09998 0 0-338.39999c0-4.39999-3.59997-8-8-8l-60 0c-4.39999 0-8 3.60001-8 8l0 338.29999-73.90002 0c-6.70001 0-10.39999 7.70001-6.29999 12.90002l112 141.79999z m372.29999-35l-60 0c-4.40002 0-8 3.59998-8 8l0 154-596 0 0-154c0-4.40002-3.60001-8-8-8l-60 0c-4.39999 0-8 3.59998-8 8l0 198c0 17.70001 14.3 32 32 32l684 0c17.70001 0 32-14.29999 32-32l0-198c0-4.40002-3.59998-8-8-8",
        fill: color,
        width: 13.36 * scale,
        height: 12.57 * scale
      }
    ]
  };
}

// Build Mode Label
export function createModeHeader(badgeText, descText) {
  return {
    type: "frame",
    name: "Mode Label",
    layout: "horizontal",
    alignItems: "center",
    gap: 8,
    children: [
      {
        type: "frame",
        name: "Tag",
        padding: [2, 8],
        cornerRadius: 4,
        fill: "#f0f5ff",
        stroke: "#adc6ff",
        strokeWidth: 1,
        strokeAlignment: "inner",
        children: [
          {
            type: "text",
            content: badgeText,
            fontSize: 12,
            fontWeight: "600",
            fontFamily: "Inter",
            fill: "#1677ff"
          }
        ]
      },
      {
        type: "text",
        content: descText,
        fontSize: 13,
        fontFamily: "Inter",
        fill: "#8c8c8c"
      }
    ]
  };
}

// Build complete flattened Icon Placement structure
export function buildIconPlacementContent() {
  function makeButtonWithIcon(type, text, placement, options = {}) {
    const isPrimary = type === "primary";
    const isDefault = type === "default";
    const isDashed = type === "dashed";
    const isText = type === "text";
    const isLink = type === "link";
    const isLoading = !!options.loading;

    let fill = undefined;
    let stroke = undefined;
    let textColor = "#000000e0";
    let iconColor = "#000000e0";
    let effect = undefined;

    if (isPrimary) {
      fill = "#1677ff";
      textColor = "#ffffff";
      iconColor = "#ffffff";
      effect = {
        type: "shadow",
        shadowType: "outer",
        color: "#0591ff1a",
        offset: { x: 0, y: 2 }
      };
    } else if (isDefault) {
      fill = "#ffffff";
      stroke = "#d9d9d9";
      textColor = "#000000e0";
      iconColor = "#000000e0";
      effect = {
        type: "shadow",
        shadowType: "outer",
        color: "#00000005",
        offset: { x: 0, y: 2 }
      };
    } else if (isDashed) {
      fill = "#ffffff";
      stroke = "#d9d9d9";
      textColor = "#000000e0";
      iconColor = "#000000e0";
      effect = {
        type: "shadow",
        shadowType: "outer",
        color: "#00000005",
        offset: { x: 0, y: 2 }
      };
    } else if (isText) {
      fill = undefined;
      textColor = "#000000e0";
      iconColor = "#000000e0";
    } else if (isLink) {
      fill = undefined;
      textColor = "#1677ff";
      iconColor = "#1677ff";
    }

    const iconNode = isLoading ? createLoadingSpinner(iconColor, 14) : createSearchIcon(iconColor, 14);
    const textNode = {
      type: "text",
      name: text,
      context: "span",
      fill: textColor,
      content: text,
      lineHeight: 1.57,
      textAlign: "center",
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "normal"
    };

    const children = placement === "start" ? [iconNode, textNode] : [textNode, iconNode];

    return {
      type: "frame",
      name: "button",
      context: "button",
      height: 32,
      opacity: isLoading ? 0.65 : 1,
      fill,
      stroke,
      strokeWidth: stroke ? 1 : undefined,
      strokeAlignment: stroke ? "inner" : undefined,
      cornerRadius: 6,
      effect,
      gap: 8,
      padding: [1, 16],
      alignItems: "center",
      justifyContent: "center",
      children
    };
  }

  function makeIconCircleButton(type, contentOrIcon, options = {}) {
    const isPrimary = type === "primary";
    const isDefault = type === "default";
    const isDashed = type === "dashed";
    const isText = type === "text";
    const isLink = type === "link";

    let fill = undefined;
    let stroke = undefined;
    let effect = undefined;
    let iconColor = "#000000e0";

    if (isPrimary) {
      fill = "#1677ff";
      iconColor = "#ffffff";
      effect = {
        type: "shadow",
        shadowType: "outer",
        color: "#0591ff1a",
        offset: { x: 0, y: 2 }
      };
    } else if (isDefault) {
      fill = "#ffffff";
      stroke = "#d9d9d9";
      iconColor = "#000000e0";
      effect = {
        type: "shadow",
        shadowType: "outer",
        color: "#00000005",
        offset: { x: 0, y: 2 }
      };
    } else if (isDashed) {
      fill = "#ffffff";
      stroke = "#d9d9d9";
      iconColor = "#000000e0";
      effect = {
        type: "shadow",
        shadowType: "outer",
        color: "#00000005",
        offset: { x: 0, y: 2 }
      };
    } else if (isLink) {
      iconColor = "#1677ff";
    }

    let child;
    if (contentOrIcon === "A") {
      child = {
        type: "text",
        name: "A",
        context: "span",
        fill: iconColor,
        content: "A",
        lineHeight: 1.57,
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: "normal"
      };
    } else {
      child = createSearchIcon(iconColor, 14);
    }

    return {
      type: "frame",
      name: isLink ? "a" : "button",
      context: isLink ? "a" : "button",
      width: 32,
      height: 32,
      fill,
      stroke,
      strokeWidth: stroke ? 1 : undefined,
      strokeAlignment: stroke ? "inner" : undefined,
      cornerRadius: isLink ? 6 : 16,
      effect,
      alignItems: "center",
      justifyContent: "center",
      children: [child]
    };
  }

  function makeModeRows(placement) {
    return {
      type: "frame",
      name: `iconPlacement=${placement}`,
      layout: "vertical",
      gap: 12,
      children: [
        createModeHeader(
          `iconPlacement="${placement}"`,
          placement === "start" ? "图标位于文字之前（默认）" : "图标位于文字之后"
        ),
        {
          type: "frame",
          name: "Row 1",
          gap: 8,
          alignItems: "center",
          children: [
            makeIconCircleButton("primary", "search"),
            makeIconCircleButton("primary", "A"),
            makeButtonWithIcon("primary", "Search", placement),
            makeIconCircleButton("default", "search"),
            makeButtonWithIcon("default", "Search", placement)
          ]
        },
        {
          type: "frame",
          name: "Row 2",
          gap: 8,
          alignItems: "center",
          children: [
            makeIconCircleButton("dashed", "search"),
            makeButtonWithIcon("dashed", "Search", placement),
            makeIconCircleButton("text", "search"),
            makeButtonWithIcon("text", "Search", placement),
            makeIconCircleButton("link", "search"),
            makeButtonWithIcon("primary", "Loading", placement, { loading: true })
          ]
        }
      ]
    };
  }

  return {
    type: "frame",
    id: "qYr4t",
    name: "Icon Placement Flattened",
    width: "fill_container",
    layout: "vertical",
    gap: 24,
    children: [
      makeModeRows("start"),
      makeModeRows("end")
    ]
  };
}

// Build complete flattened Size structure
export function buildSizeContent() {
  function makeSizeButtons(size, label, height, fontSize, cornerRadius, iconSize, padding) {
    const isLarge = size === "large";
    const circleRadius = isLarge ? 50 : (size === "middle" ? 50 : 50);
    const roundRadius = height;

    return {
      type: "frame",
      name: `size=${size}`,
      layout: "vertical",
      gap: 12,
      children: [
        createModeHeader(
          `size="${size}"`,
          `${label} · 高度 ${height}px · 字号 ${fontSize}px · 圆角 ${cornerRadius}px`
        ),
        {
          type: "frame",
          name: "Row 1 - Variants",
          gap: 8,
          alignItems: "center",
          children: [
            // Primary
            {
              type: "frame",
              name: "button",
              context: "button",
              height,
              fill: "#1677ff",
              cornerRadius,
              effect: {
                type: "shadow",
                shadowType: "outer",
                color: "#0591ff1a",
                offset: { x: 0, y: 2 }
              },
              padding,
              justifyContent: "center",
              alignItems: "center",
              children: [
                {
                  type: "text",
                  name: "Primary",
                  context: "span",
                  fill: "#ffffff",
                  content: "Primary",
                  lineHeight: 1.57,
                  textAlign: "center",
                  fontFamily: "Inter",
                  fontSize,
                  fontWeight: "normal"
                }
              ]
            },
            // Default
            {
              type: "frame",
              name: "button",
              context: "button",
              height,
              fill: "#ffffff",
              cornerRadius,
              stroke: "#d9d9d9",
              strokeWidth: 1,
              strokeAlignment: "inner",
              effect: {
                type: "shadow",
                shadowType: "outer",
                color: "#00000005",
                offset: { x: 0, y: 2 }
              },
              padding,
              justifyContent: "center",
              alignItems: "center",
              children: [
                {
                  type: "text",
                  name: "Default",
                  context: "span",
                  fill: "#000000e0",
                  content: "Default",
                  lineHeight: 1.57,
                  textAlign: "center",
                  fontFamily: "Inter",
                  fontSize,
                  fontWeight: "normal"
                }
              ]
            },
            // Dashed
            {
              type: "frame",
              name: "button",
              context: "button",
              height,
              fill: "#ffffff",
              cornerRadius,
              stroke: "#d9d9d9",
              strokeWidth: 1,
              strokeAlignment: "inner",
              effect: {
                type: "shadow",
                shadowType: "outer",
                color: "#00000005",
                offset: { x: 0, y: 2 }
              },
              padding,
              justifyContent: "center",
              alignItems: "center",
              children: [
                {
                  type: "text",
                  name: "Dashed",
                  context: "span",
                  fill: "#000000e0",
                  content: "Dashed",
                  lineHeight: 1.57,
                  textAlign: "center",
                  fontFamily: "Inter",
                  fontSize,
                  fontWeight: "normal"
                }
              ]
            },
            // Link
            {
              type: "frame",
              name: "button",
              context: "button",
              height,
              cornerRadius,
              padding,
              justifyContent: "center",
              alignItems: "center",
              children: [
                {
                  type: "text",
                  name: "Link",
                  context: "span",
                  fill: "#1677ff",
                  content: "Link",
                  lineHeight: 1.57,
                  textAlign: "center",
                  fontFamily: "Inter",
                  fontSize,
                  fontWeight: "normal"
                }
              ]
            }
          ]
        },
        {
          type: "frame",
          name: "Row 2 - Icons & Shapes",
          gap: 8,
          alignItems: "center",
          children: [
            // Icon Circle
            {
              type: "frame",
              name: "button",
              context: "button",
              width: height,
              height,
              fill: "#1677ff",
              cornerRadius: circleRadius,
              effect: {
                type: "shadow",
                shadowType: "outer",
                color: "#0591ff1a",
                offset: { x: 0, y: 2 }
              },
              justifyContent: "center",
              alignItems: "center",
              children: [createDownloadIcon("#FFF", iconSize)]
            },
            // Icon Round
            {
              type: "frame",
              name: "button",
              context: "button",
              width: height,
              height,
              fill: "#1677ff",
              cornerRadius: roundRadius,
              effect: {
                type: "shadow",
                shadowType: "outer",
                color: "#0591ff1a",
                offset: { x: 0, y: 2 }
              },
              justifyContent: "center",
              alignItems: "center",
              children: [createDownloadIcon("#FFF", iconSize)]
            },
            // Download Text Round
            {
              type: "frame",
              name: "button",
              context: "button",
              height,
              fill: "#1677ff",
              cornerRadius: roundRadius,
              effect: {
                type: "shadow",
                shadowType: "outer",
                color: "#0591ff1a",
                offset: { x: 0, y: 2 }
              },
              gap: 8,
              padding,
              justifyContent: "center",
              alignItems: "center",
              children: [
                createDownloadIcon("#FFF", iconSize),
                {
                  type: "text",
                  name: "Download",
                  context: "span",
                  fill: "#ffffff",
                  content: "Download",
                  lineHeight: 1.57,
                  textAlign: "center",
                  fontFamily: "Inter",
                  fontSize,
                  fontWeight: "normal"
                }
              ]
            },
            // Download Text Rect
            {
              type: "frame",
              name: "button",
              context: "button",
              height,
              fill: "#1677ff",
              cornerRadius,
              effect: {
                type: "shadow",
                shadowType: "outer",
                color: "#0591ff1a",
                offset: { x: 0, y: 2 }
              },
              gap: 8,
              padding,
              justifyContent: "center",
              alignItems: "center",
              children: [
                createDownloadIcon("#FFF", iconSize),
                {
                  type: "text",
                  name: "Download",
                  context: "span",
                  fill: "#ffffff",
                  content: "Download",
                  lineHeight: 1.57,
                  textAlign: "center",
                  fontFamily: "Inter",
                  fontSize,
                  fontWeight: "normal"
                }
              ]
            }
          ]
        }
      ]
    };
  }

  return {
    type: "frame",
    id: "wglpK",
    name: "Size Flattened",
    width: "fill_container",
    layout: "vertical",
    gap: 24,
    children: [
      makeSizeButtons("large", "Large (大尺寸)", 40, 16, 8, 16, [1, 16]),
      makeSizeButtons("middle", "Middle (中等尺寸 · 默认)", 32, 14, 6, 14, [1, 15]),
      makeSizeButtons("small", "Small (小尺寸)", 24, 14, 4, 12, [0, 7])
    ]
  };
}

console.log("Full builders ready.");
