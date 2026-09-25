/**
 * @schema 2.18
 * @input value: string = ""
 * @input size: enum("small", "middle", "large") = "middle"
 * @input status: enum("default", "error", "warning") = "default"
 * @input disabled: boolean = false
 * @input min: string = ""
 * @input max: string = ""
 * @input step: string = "1"
 * @input precision: number = -1
 * @input controls: boolean = true
 * @input hovered: boolean = false
 * @input focused: boolean = false
 * @input formatter: boolean = false
 * @input mode: enum("input", "spinner") = "input"
 * @input prefix: string = ""
 * @input suffix: string = ""
 * @input addonBefore: string = ""
 * @input addonAfter: string = ""
 * @input prefixIcon: string = ""
 * @input suffixIcon: string = ""
 * @input placeholder: string = ""
 * @input variant: enum("outlined", "filled", "borderless", "underlined") = "outlined"
 * @input compactOrientation: enum("horizontal", "vertical") = "horizontal"
 * @input compactPlacement: enum("none", "start", "middle", "end") = "none"
 * @input bordered: boolean = false
 * @input changeOnBlur: boolean = false
 * @input changeOnWheel: boolean = false
 * @input checked: boolean = false
 * @input color: string = ""
 * @input decimalSeparator: string = ""
 * @input keyboard: boolean = false
 * @input list: string = ""
 * @input maxLength: number = 0
 * @input minLength: number = 0
 * @input multiple: boolean = false
 * @input name: string = ""
 * @input src: string = ""
 * @input stringMode: boolean = false
 * @input primaryColor: color = #1677FF
 * @input borderColor: string = ""
 * @input backgroundColor: string = ""
 * @input borderRadius: number = -1
 * @input hasFeedback: boolean = false
 * @input feedbackStatus: enum("none", "success", "warning", "error", "validating") = "none"
 */

const icons = {
  UserOutlined: {
    viewBox: [64, 64, 896, 896],
    paths: ["M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"]
  },
  ClockCircleOutlined: {
    viewBox: [64, 64, 896, 896],
    paths: ["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z","M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"]
  },
  CheckCircleFilled: {
    viewBox: [64, 64, 896, 896],
    paths: ["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.5l-254.4 256c-3.1 3.1-7.2 4.7-11.3 4.7-4.1 0-8.2-1.6-11.3-4.7l-120.7-121.5c-6.2-6.3-6.2-16.4 0-22.6l22.6-22.6c6.3-6.2 16.4-6.2 22.6 0l96.8 97.4 231.8-233.3c6.2-6.3 16.4-6.3 22.6 0l22.6 22.6c6.3 6.3 6.3 16.4 0 22.6z"]
  },
  ExclamationCircleFilled: {
    viewBox: [64, 64, 896, 896],
    paths: ["M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4 3.6 8 8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"]
  },
  CloseCircleFilled: {
    viewBox: [64, 64, 896, 896],
    paths: ["M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"]
  },
  LoadingOutlined: {
    viewBox: [0, 0, 1024, 1024],
    paths: ["M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"]
  }
};

const i = pencil.input;
const W = Math.max(80, pencil.width), H = Math.max(24, pencil.height);
const inputSize = i.size === 'small' || i.size === 'large' ? i.size : 'middle';
const inputH = inputSize === 'small' ? 24 : inputSize === 'large' ? 40 : 32;
const inputPad = inputSize === 'small' ? 7 : inputSize === 'large' ? 12 : 11;
const inputRadius = i.borderRadius !== undefined && i.borderRadius !== null && Number(i.borderRadius) >= 0 ? Number(i.borderRadius) : (inputSize === 'small' ? 4 : inputSize === 'large' ? 8 : 6);
const inputFont = inputSize === 'large' ? 16 : 14;

const text = (content, x, y, width, color="#000000E0", fontSize=14, weight="normal", align="left", height=Math.max(16,fontSize+4)) => ({type:"text", content:String(content), x, y, width, height, fill:color, fontFamily:"Inter", fontSize, fontWeight:weight, textAlign:align, textAlignVertical:"middle", textGrowth:"fixed-width-height"});
const box = (x, y, width, height, fill="#FFFFFF", radius=6, stroke="#D9D9D9", strokeWidth=1) => ({type:"rectangle", x, y, width, height, cornerRadius:radius, fill, stroke, strokeWidth, strokeAlignment:"inner"});
const icon = (name, x, y, size, fill="#00000073") => {
  const g = icons[name];
  if (!g) return [];
  return g.paths.map(path => ({type:"path", name, x, y, width:size, height:size, viewBox:g.viewBox, geometry:path, fill}));
};

const nodes = [];
const valNum = i.value !== undefined && i.value !== null && String(i.value).trim() !== '' && !isNaN(Number(i.value)) ? Number(i.value) : null;
const hasMin = i.min !== undefined && i.min !== null && String(i.min).trim() !== '' && !isNaN(Number(i.min));
const hasMax = i.max !== undefined && i.max !== null && String(i.max).trim() !== '' && !isNaN(Number(i.max));
const isOutOfRange = !i.disabled && valNum !== null && (
  (hasMin && valNum < Number(i.min)) ||
  (hasMax && valNum > Number(i.max))
);

const measureText = (str, fs = 14) => {
  let w = 0;
  for (const ch of String(str)) {
    if ((ch >= '\u4e00' && ch <= '\u9fa5') || (ch >= '\uff00' && ch <= '\uffef')) w += fs;
    else if (/[MW]/.test(ch)) w += fs * 0.88;
    else if (/[A-Z]/.test(ch)) w += fs * 0.72;
    else if (/[mw]/.test(ch)) w += fs * 0.82;
    else if (ch === '¥' || ch === '$' || ch === '€' || ch === '£') w += fs * 0.65;
    else if (/[ijl!.,:;'|]/.test(ch)) w += fs * 0.28;
    else if (/[ftr()/\-\s]/.test(ch)) w += fs * 0.38;
    else if (/[a-z0-9]/.test(ch)) w += fs * 0.56;
    else w += fs * 0.5;
  }
  return Math.ceil(w);
};

const isFocused = Boolean(i.focused && !i.disabled);
const isHovered = Boolean(i.hovered && !i.disabled);
const disabled = i.disabled ? "#00000040" : "#000000E0";
const secondaryCol = i.disabled ? "#00000040" : "#00000073";
const primary = i.primaryColor || '#1677FF';
const isStatusError = !i.disabled && (i.status === 'error' || (i.hasFeedback && i.feedbackStatus === 'error'));
const isStatusWarning = !i.disabled && (i.status === 'warning' || (i.hasFeedback && i.feedbackStatus === 'warning'));

const defaultBg = i.disabled ? '#0000000A' : (
  i.variant === 'filled' ? (
    isFocused ? '#FFFFFF' :
    isStatusError ? '#FFF2F0' :
    isStatusWarning ? '#FFFBE6' :
    isHovered ? '#0000000F' : '#0000000A'
  ) : (i.variant === 'borderless' || i.variant === 'underlined') ? '#00000000' : '#FFFFFF'
);
const bgFill = i.backgroundColor || defaultBg;

const defaultBorder = i.variant === 'filled' ? (
  isFocused ? (isStatusError ? '#FF4D4F' : isStatusWarning ? '#FAAD14' : primary) : '#00000000'
) : (i.variant === 'borderless' || i.variant === 'underlined') ? '#00000000' : '#D9D9D9';

const baseBorderCol = i.borderColor || defaultBorder;
const borderCol = i.disabled ? (i.variant === 'filled' || i.variant === 'borderless' || i.variant === 'underlined' ? '#00000000' : '#D9D9D9') : (
  isStatusError ? '#FF4D4F' : 
  isStatusWarning ? '#FAAD14' : 
  isFocused ? primary :
  isHovered ? '#4096FF' : baseBorderCol
);

const strokeCol = i.disabled ? (i.variant === 'filled' || i.variant === 'borderless' || i.variant === 'underlined' ? '#00000000' : '#D9D9D9') : (
  (i.variant === 'borderless' || i.variant === 'underlined') ? '#00000000' :
  (i.variant === 'filled' && !i.borderColor && !isFocused) ? '#00000000' :
  borderCol
);

const compactRadius = (radius=6) => {
  const placement = i.compactPlacement || "none";
  if (placement === "none") return radius;
  if (placement === "middle") return 0;
  if (i.compactOrientation === "vertical") return placement === "start" ? [radius,radius,0,0] : [0,0,radius,radius];
  return placement === "start" ? [radius,0,0,radius] : [0,radius,radius,0];
};

const hasAddon = i.mode !== 'spinner' && (Boolean(i.addonBefore) || Boolean(i.addonAfter));
const addonPad = inputSize === 'small' ? 7 : 11;
const addonL = (hasAddon && i.addonBefore) ? measureText(i.addonBefore, inputFont) + addonPad * 2 : 0;
const addonR = (hasAddon && i.addonAfter) ? measureText(i.addonAfter, inputFont) + addonPad * 2 : 0;
const fldX = addonL > 0 ? addonL - 1 : 0;
const fldW = hasAddon ? Math.max(1, W - fldX - addonR + (addonR > 0 ? 1 : 0)) : W;
const addonCol = i.disabled ? "#00000040" : "#000000E0";

if (isFocused) {
  if (i.variant !== 'borderless' && i.variant !== 'underlined') {
    const shadowCol = isStatusError ? '#FF4D4F26' : isStatusWarning ? '#FAAD1426' : '#1677FF26';
    nodes.push({type: 'rectangle', x: -2, y: -2, width: W + 4, height: inputH + 4, cornerRadius: compactRadius(inputRadius + 2), stroke: shadowCol, strokeWidth: 2, fill: '#00000000'});
  } else if (i.variant === 'borderless') {
    const outlineCol = isStatusError ? '#FF4D4F' : isStatusWarning ? '#FAAD14' : primary;
    nodes.push({type: 'rectangle', x: 0, y: 0, width: W, height: inputH, cornerRadius: compactRadius(inputRadius), stroke: outlineCol, strokeWidth: 1, fill: '#00000000'});
  }
}

if (hasAddon) {
  if (addonL) {
    nodes.push(box(0, 0, addonL, inputH, "#FAFAFA", [inputRadius, 0, 0, inputRadius], strokeCol));
    nodes.push(text(i.addonBefore, 0, 0, addonL, addonCol, inputFont, 'normal', 'center', inputH));
  }
  let innerRadius = compactRadius(inputRadius);
  if (addonL && addonR) innerRadius = 0;
  else if (addonL) innerRadius = [0, inputRadius, inputRadius, 0];
  else if (addonR) innerRadius = [inputRadius, 0, 0, inputRadius];

  nodes.push(box(fldX, 0, fldW, inputH, bgFill, innerRadius, strokeCol));

  if (addonR) {
    const rX = fldX + fldW - 1;
    nodes.push(box(rX, 0, addonR, inputH, "#FAFAFA", [0, inputRadius, inputRadius, 0], strokeCol));
    nodes.push(text(i.addonAfter, rX, 0, addonR, addonCol, inputFont, 'normal', 'center', inputH));
  }
} else {
  nodes.push(box(0, 0, W, inputH, bgFill, compactRadius(inputRadius), strokeCol));
}

if (i.variant === 'underlined') {
  nodes.push({type: 'rectangle', x: 0, y: inputH - 1, width: W, height: 1, fill: borderCol});
}

  const getDecimalPrecision = (num) => {
    if (num === undefined || num === null || num === '') return -1;
    const str = String(num);
    const dotIndex = str.indexOf('.');
    return dotIndex >= 0 ? str.length - dotIndex - 1 : 0;
  };

  const formatWithPrecision = (val, precision, separator = '.') => {
    if (val === undefined || val === null || val === '') return '';
    let str = String(val).trim();
    if (precision === undefined || precision === null || precision < 0) {
      return separator !== '.' ? str.replace('.', separator) : str;
    }

    const isNegative = str.startsWith('-');
    if (isNegative) str = str.slice(1);

    const parts = str.split('.');
    let intPart = parts[0] || '0';
    let decPart = parts[1] || '';

    if (precision === 0) {
      if (decPart && Number(decPart[0]) >= 5) {
        try {
          intPart = (BigInt(intPart) + 1n).toString();
        } catch (e) {
          intPart = String(Math.round(Number(str)));
        }
      }
      return (isNegative ? '-' : '') + intPart;
    }

    if (decPart.length < precision) {
      decPart = decPart.padEnd(precision, '0');
    } else if (decPart.length > precision) {
      const roundDigit = Number(decPart[precision]);
      let keepDec = decPart.slice(0, precision);
      if (roundDigit >= 5) {
        try {
          const fullNumStr = intPart + keepDec;
          const bumped = (BigInt(fullNumStr) + 1n).toString();
          if (bumped.length > fullNumStr.length) {
            intPart = bumped.slice(0, bumped.length - precision);
            decPart = bumped.slice(bumped.length - precision);
          } else {
            intPart = bumped.slice(0, intPart.length);
            decPart = bumped.slice(intPart.length);
          }
        } catch (e) {
          return (isNegative ? '-' : '') + Number(val).toFixed(precision);
        }
      } else {
        decPart = keepDec;
      }
    }

    return (isNegative ? '-' : '') + intPart + separator + decPart;
  };

  const hasExplicitPrecision = i.precision !== undefined && i.precision !== null && Number(i.precision) >= 0;
  let targetPrecision = -1;
  if (hasExplicitPrecision) {
    targetPrecision = Number(i.precision);
  } else if (i.step !== undefined && i.step !== null && i.step !== '') {
    const stepPrec = getDecimalPrecision(i.step);
    if (stepPrec > 0) {
      targetPrecision = stepPrec;
    }
  }

  const separator = i.decimalSeparator || '.';
  const hasValue = i.value !== undefined && i.value !== null && String(i.value).trim() !== '';
  let displayVal = '';
  let rawPrefix = i.prefix ? String(i.prefix).replace(/^\\(?=\$)/, '') : '';
  let rawSuffix = i.suffix ? String(i.suffix) : '';

  if (hasValue) {
    displayVal = formatWithPrecision(i.value, targetPrecision, separator);
    if (i.formatter) {
      const parts = String(displayVal).split(separator);
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      displayVal = parts.join(separator);
    }
  } else if (i.placeholder) {
    displayVal = String(i.placeholder);
  }

if (i.mode === 'spinner') {
  const actionW = inputH;
  if (!i.disabled) {
    nodes.push({type: 'rectangle', x: actionW, y: 0, width: 1, height: inputH, fill: '#0000000F'});
    nodes.push({type: 'rectangle', x: W - actionW - 1, y: 0, width: 1, height: inputH, fill: '#0000000F'});
  }
  const minDisabled = i.disabled || (hasMin && valNum !== null && valNum <= Number(i.min));
  const maxDisabled = i.disabled || (hasMax && valNum !== null && valNum >= Number(i.max));
  nodes.push(text('−', 0, 0, actionW, minDisabled ? '#00000040' : secondaryCol, inputFont, 'normal', 'center', inputH));
  nodes.push(text('+', W - actionW, 0, actionW, maxDisabled ? '#00000040' : secondaryCol, inputFont, 'normal', 'center', inputH));
  const spinnerTextCol = !hasValue ? '#00000040' : disabled;
  nodes.push(text(displayVal, actionW, 0, W - actionW * 2, spinnerTextCol, inputFont, 'normal', 'center', inputH));
} else {
  const showControls = !i.disabled && (i.controls !== false) && Boolean(i.hovered || i.showHandler);
  const controlW = showControls ? 22 : 0;
  let textX = fldX + inputPad;
  let textRight = fldX + fldW - inputPad - controlW;
  const prefixIconName = i.prefixIcon || (rawPrefix && icons[rawPrefix] ? rawPrefix : '');
  const iconSize = inputSize === 'large' ? 16 : (inputSize === 'small' ? 12 : 14);
  const statusTextCol = isStatusError ? '#FF4D4F' : isStatusWarning ? '#FAAD14' : null;
  const isStatusTextColored = (i.variant === 'filled' || i.variant === 'borderless') && Boolean(statusTextCol);

  const defaultIconCol = i.disabled ? "#00000040" : (isStatusTextColored ? statusTextCol : (isStatusError ? '#FF4D4F' : isStatusWarning ? '#FAAD14' : '#000000E0'));
  const affixTextCol = i.disabled ? "#00000040" : (isStatusTextColored ? statusTextCol : (isStatusError ? '#FF4D4F' : isStatusWarning ? '#FAAD14' : '#000000E0'));

  if (prefixIconName && icons[prefixIconName]) {
    nodes.push(...icon(prefixIconName, textX, (inputH - iconSize) / 2, iconSize, defaultIconCol));
    textX += iconSize + 6;
  } else if (rawPrefix) {
    const prefixW = measureText(rawPrefix, inputFont);
    nodes.push(text(rawPrefix, textX, (inputH - (inputFont + 4)) / 2, prefixW, affixTextCol, inputFont));
    textX += prefixW + 4;
  }

  const effFeedback = i.hasFeedback ? (i.feedbackStatus && i.feedbackStatus !== "none" ? i.feedbackStatus : (i.status === "error" ? "error" : i.status === "warning" ? "warning" : i.status === "validating" ? "validating" : (i.status === "success" ? "success" : "none"))) : "none";
  if (effFeedback !== "none") {
    const fbIconName = effFeedback === "success" ? "CheckCircleFilled" :
                       effFeedback === "warning" ? "ExclamationCircleFilled" :
                       effFeedback === "error" ? "CloseCircleFilled" :
                       effFeedback === "validating" ? "LoadingOutlined" : null;
    const fbCol = effFeedback === "success" ? "#52C41A" :
                  effFeedback === "warning" ? "#FAAD14" :
                  effFeedback === "error" ? "#FF4D4F" : "#1677FF";
    if (fbIconName && icons[fbIconName]) {
      nodes.push(...icon(fbIconName, textRight - iconSize, (inputH - iconSize) / 2, iconSize, fbCol));
      textRight -= iconSize + 6;
    }
  }

  const suffixIconName = i.suffixIcon || (rawSuffix && icons[rawSuffix] ? rawSuffix : '');
  if (suffixIconName && icons[suffixIconName]) {
    nodes.push(...icon(suffixIconName, textRight - iconSize, (inputH - iconSize) / 2, iconSize, defaultIconCol));
    textRight -= iconSize + 6;
  } else if (rawSuffix) {
    const suffixW = measureText(rawSuffix, inputFont);
    nodes.push(text(rawSuffix, textRight - suffixW, (inputH - (inputFont + 4)) / 2, suffixW, affixTextCol, inputFont, 'normal', 'right'));
    textRight -= suffixW + 4;
  }

  const isPlaceholder = !hasValue && Boolean(i.placeholder);
  const textCol = isPlaceholder ? '#00000040' : (
    i.disabled ? '#00000040' :
    (isOutOfRange && (i.status === 'default' || !i.status)) ? '#FF4D4F' :
    isStatusTextColored ? statusTextCol :
    disabled
  );
  nodes.push(text(displayVal, textX, (inputH - (inputFont + 4)) / 2, Math.max(1, textRight - textX), textCol, inputFont));

  if (showControls) {
    const halfH = Math.floor(inputH / 2);
    const handlerX = fldX + fldW - controlW;
    const minDisabled = hasMin && valNum !== null && valNum <= Number(i.min);
    const maxDisabled = hasMax && valNum !== null && valNum >= Number(i.max);
    nodes.push({type: 'rectangle', x: handlerX, y: 0, width: 1, height: inputH, fill: borderCol});
    nodes.push({type: 'rectangle', x: handlerX, y: halfH, width: controlW, height: 1, fill: borderCol});
    nodes.push(text('▴', handlerX, 0, controlW, maxDisabled ? '#00000040' : secondaryCol, 10, 'normal', 'center', halfH));
    nodes.push(text('▾', handlerX, halfH, controlW, minDisabled ? '#00000040' : secondaryCol, 10, 'normal', 'center', inputH - halfH));
  }
}

return nodes;
