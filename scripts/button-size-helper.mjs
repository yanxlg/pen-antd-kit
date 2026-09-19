const ASCII_WIDTH={"0":.6,"1":.401,"2":.6,"3":.6,"4":.6,"5":.6,"6":.6,"7":.547,"8":.6,"9":.6," ":.333,"!":.333,"\"":.427,"#":.6,"$":.6,"%":.97,"&":.726,"'":.244,"(":.333,")":.333,"*":.506,"+":.605,",":.264,"-":.605,".":.264,"/":.5,":":.264,";":.264,"<":.605,"=":.605,">":.605,"?":.537,"@":.858,"A":.657,"B":.677,"C":.728,"D":.706,"E":.637,"F":.577,"G":.748,"H":.72,"I":.237,"J":.517,"K":.69,"L":.588,"M":.882,"N":.719,"O":.767,"P":.642,"Q":.767,"R":.676,"S":.632,"T":.619,"U":.714,"V":.639,"W":.93,"X":.637,"Y":.662,"Z":.624,"[":.333,"\\":.5,"]":.333,"^":.518,"_":.5,"`":.333,"a":.559,"b":.586,"c":.547,"d":.586,"e":.555,"f":.373,"g":.591,"h":.556,"i":.256,"j":.267,"k":.529,"l":.235,"m":.855,"n":.559,"o":.586,"p":.586,"q":.586,"r":.365,"s":.505,"t":.355,"u":.56,"v":.482,"w":.755,"x":.509,"y":.496,"z":.487,"{":.333,"|":.195,"}":.333,"~":.5};

export function measureText(str, fs = 14) {
  if (!str) return 0;
  let w = 0;
  for (let idx = 0; idx < str.length; idx++) {
    w += fs * (ASCII_WIDTH[str[idx]] || 1);
  }
  return Math.round(w);
}

export function getButtonExactSize(inputs) {
  const rawSize = inputs.size === "medium" ? "middle" : (inputs.size || "middle");
  const size = rawSize === "small" ? "small" : (rawSize === "large" ? "large" : "middle");

  let buttonH = 32, buttonPad = 15, fontSize = 14;
  if (size === "small") {
    buttonH = 24; buttonPad = 7; fontSize = 14;
  } else if (size === "large") {
    buttonH = 40; buttonPad = 15; fontSize = 16;
  }

  let rawLabel = (inputs.children !== undefined && inputs.children !== null) ? String(inputs.children) : "";
  let icon = inputs.icon || "";

  if (!icon) {
    if (/^[<‹←]\s*/.test(rawLabel)) {
      icon = "left";
      rawLabel = rawLabel.replace(/^[<‹←]\s*/, "");
    } else if (/\s*[>›→]$/.test(rawLabel)) {
      icon = "right";
      rawLabel = rawLabel.replace(/\s*[>›→]$/, "");
    }
  }

  const visualLabel = rawLabel;
  const isLoading = Boolean(inputs.loading || inputs.state === "loading" || inputs.state === "animating");
  const hasIcon = Boolean(icon) || isLoading;
  const isCircle = inputs.shape === "circle";
  const isIconOnly = hasIcon && !visualLabel;

  let iconSize = 14;
  if (size === "small") {
    iconSize = isIconOnly ? 14 : 12;
  } else if (size === "large") {
    iconSize = isIconOnly ? 18 : 16;
  } else {
    iconSize = isIconOnly ? 16 : 14;
  }

  const textWidth = measureText(visualLabel, fontSize);
  const gap = (hasIcon && visualLabel && !isIconOnly) ? 8 : 0;
  const totalContentWidth = (hasIcon ? iconSize : 0) + gap + textWidth;

  let btnW;
  if (isCircle || isIconOnly) {
    btnW = buttonH;
  } else if (inputs.block) {
    btnW = 1616;
  } else {
    btnW = Math.max(buttonH, totalContentWidth + buttonPad * 2);
  }

  return { width: btnW, height: buttonH };
}
