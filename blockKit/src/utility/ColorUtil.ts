import { BlockModel } from "@nativeblocks/nativeblocks-react";
import { getProperty } from "./BlockUtil";

class Color {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.set(r, g, b);
  }

  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
  }

  set(r: number, g: number, b: number) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = (angle / 180) * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.14,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix: number[]) {
    const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
    const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
    const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value: number) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}

class Solver {
  target: Color;
  targetHSL: { h: number; s: number; l: number };
  reusedColor: Color;

  constructor(target: Color) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new Color(0, 0, 0);
  }

  solve(alpha: number) {
    const result = this.solveNarrow(this.solveWide());
    if (result.values)
      return {
        values: result.values,
        loss: result.loss,
        filter: this.css(result.values, alpha),
      };
    else return null;
  }

  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  solveNarrow(wide: { loss: any; values?: any }) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  spsa(A: number, a: any[], c: number, values: any[], iters: number) {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = (lossDiff / (2 * ck)) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };

    function fix(value: number, idx: number) {
      let max = 100;
      if (idx === 2 /* saturate */) {
        max = 7500;
      } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
        max = 200;
      }

      if (idx === 3 /* hue-rotate */) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + (value % max);
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
  }

  loss(filters: any[]) {
    // Argument is array of percentages.
    const color = this.reusedColor;
    color.set(0, 0, 0);

    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);

    const colorHSL = color.hsl();
    return (
      Math.abs(color.r - this.target.r) +
      Math.abs(color.g - this.target.g) +
      Math.abs(color.b - this.target.b) +
      Math.abs(colorHSL.h - this.targetHSL.h) +
      Math.abs(colorHSL.s - this.targetHSL.s) +
      Math.abs(colorHSL.l - this.targetHSL.l)
    );
  }

  css(filters: any[], alpha: number) {
    function fmt(idx: number, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `opacity(${alpha}) invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(
      3,
      3.6
    )}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%)`;
  }
}

function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

function colorToFilter(hex: string, opacity: string) {
  const rgb = hexToRgb(hex) ?? [0, 0, 0];
  const alpha = (parseInt(opacity) ?? 100) / 100;
  const color = new Color(rgb[0], rgb[1], rgb[2]);
  const solver = new Solver(color);
  const result = solver.solve(alpha);
  if (result) return result.filter;
  else null;
}

function toArgb(colorString: string, opacity: string): string {
  if (!colorString) {
    return "inherit";
  } else {
    let r: number = 0;
    let g: number = 0;
    let b: number = 0;

    if (colorString.length === 4) {
      // 3-digit hex color (#RGB)
      r = parseInt(colorString[1] + colorString[1], 16);
      g = parseInt(colorString[2] + colorString[2], 16);
      b = parseInt(colorString[3] + colorString[3], 16);
    } else if (colorString.length === 7) {
      // 6-digit hex color (#RRGGBB)
      r = parseInt(colorString.substring(1, 3), 16);
      g = parseInt(colorString.substring(3, 5), 16);
      b = parseInt(colorString.substring(5, 7), 16);
    }

    const alpha = (parseInt(opacity) ?? 100) / 100;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
type ColorType = "foreground" | "background" | "border" | "outline" | "tint" | "accent";
type ColorStyle = {
  type: ColorType;
  color: string;
  alpha: string;
};

function generateColorStyle(colorMobile: ColorStyle, colorTablet: ColorStyle, colorDesktop: ColorStyle): string {
  const mobileBreakpoint = 768;
  const tabletBreakpoint = 1024;

  function typeResolver(colorStyle: ColorStyle) {
    const colorValue = toArgb(colorStyle.color, colorStyle.alpha);
    switch (colorStyle.type) {
      case "tint":
        return `filter: ${colorToFilter(colorStyle.color, colorStyle.alpha)};`;
      case "foreground":
        return `color: ${colorValue};`;
      case "background":
        return `background-color: ${colorValue};`;
      case "border":
        return `border-color: ${colorValue};`;
      case "outline":
        return `outline-color: ${colorValue};`;
      case "accent":
        return `accent-color: ${colorValue};`;
      default:
        return "";
    }
  }

  // Generate combined color styles for each breakpoint
  let style = `@media (max-width: ${mobileBreakpoint - 1}px) { ${typeResolver(colorMobile)} } `;
  style += `@media (min-width: ${mobileBreakpoint}px) { ${typeResolver(colorTablet)} } `;
  style += `@media (min-width: ${tabletBreakpoint}px) { ${typeResolver(colorDesktop)} }`;

  return style;
}

export function getBackgroundColor(
  block: BlockModel | null,
  overrideColor: string | null = null,
  overrideOpacity: string | null = null
) {
  const backgroundColorProperty = getProperty(block, "backgroundColor");
  const backgroundColorOpacityProperty = getProperty(block, "backgroundColorOpacity");

  return generateColorStyle(
    {
      color: overrideColor ? overrideColor : backgroundColorProperty.valueMobile,
      alpha: overrideOpacity ? overrideOpacity : backgroundColorOpacityProperty.valueMobile,
      type: "background",
    },
    {
      color: overrideColor ? overrideColor : backgroundColorProperty.valueTablet,
      alpha: overrideOpacity ? overrideOpacity : backgroundColorOpacityProperty.valueTablet,
      type: "background",
    },
    {
      color: overrideColor ? overrideColor : backgroundColorProperty.valueDesktop,
      alpha: overrideOpacity ? overrideOpacity : backgroundColorOpacityProperty.valueDesktop,
      type: "background",
    }
  );
}

export function getTableHeaderBackgroundColor(
  block: BlockModel | null,
  overrideColor: string | null = null,
  overrideOpacity: string | null = null
) {
  const backgroundColorProperty = getProperty(block, "headerBackgroundColor");
  const backgroundColorOpacityProperty = getProperty(block, "headerBackgroundColorOpacity");

  return generateColorStyle(
    {
      color: overrideColor ? overrideColor : backgroundColorProperty.valueMobile,
      alpha: overrideOpacity ? overrideOpacity : backgroundColorOpacityProperty.valueMobile,
      type: "background",
    },
    {
      color: overrideColor ? overrideColor : backgroundColorProperty.valueTablet,
      alpha: overrideOpacity ? overrideOpacity : backgroundColorOpacityProperty.valueTablet,
      type: "background",
    },
    {
      color: overrideColor ? overrideColor : backgroundColorProperty.valueDesktop,
      alpha: overrideOpacity ? overrideOpacity : backgroundColorOpacityProperty.valueDesktop,
      type: "background",
    }
  );
}

export function getTableBodyBackgroundColor(
  block: BlockModel | null,
  overrideColor: string | null = null,
  overrideOpacity: string | null = null
) {
  const backgroundColorProperty = getProperty(block, "bodyBackgroundColor");
  const backgroundColorOpacityProperty = getProperty(block, "bodyBackgroundColorOpacity");

  return generateColorStyle(
    {
      color: overrideColor ? overrideColor : backgroundColorProperty.valueMobile,
      alpha: overrideOpacity ? overrideOpacity : backgroundColorOpacityProperty.valueMobile,
      type: "background",
    },
    {
      color: overrideColor ? overrideColor : backgroundColorProperty.valueTablet,
      alpha: overrideOpacity ? overrideOpacity : backgroundColorOpacityProperty.valueTablet,
      type: "background",
    },
    {
      color: overrideColor ? overrideColor : backgroundColorProperty.valueDesktop,
      alpha: overrideOpacity ? overrideOpacity : backgroundColorOpacityProperty.valueDesktop,
      type: "background",
    }
  );
}

export function getForegroundAsBackgroundColor(
  block: BlockModel | null,
  overrideColor: string | null = null,
  overrideOpacity: string | null = null
) {
  const foregroundColorProperty = getProperty(block, "foregroundColor");
  const foregroundColorOpacityProperty = getProperty(block, "foregroundColorOpacity");

  return generateColorStyle(
    {
      color: overrideColor ? overrideColor : foregroundColorProperty.valueMobile,
      alpha: overrideOpacity ? overrideOpacity : foregroundColorOpacityProperty.valueMobile,
      type: "background",
    },
    {
      color: overrideColor ? overrideColor : foregroundColorProperty.valueTablet,
      alpha: overrideOpacity ? overrideOpacity : foregroundColorOpacityProperty.valueTablet,
      type: "background",
    },
    {
      color: overrideColor ? overrideColor : foregroundColorProperty.valueDesktop,
      alpha: overrideOpacity ? overrideOpacity : foregroundColorOpacityProperty.valueDesktop,
      type: "background",
    }
  );
}

export function getForegroundColor(block: BlockModel | null) {
  const foregroundColorProperty = getProperty(block, "foregroundColor");
  const foregroundColorOpacityProperty = getProperty(block, "foregroundColorOpacity");

  return generateColorStyle(
    {
      color: foregroundColorProperty.valueMobile,
      alpha: foregroundColorOpacityProperty.valueMobile,
      type: "foreground",
    },
    {
      color: foregroundColorProperty.valueTablet,
      alpha: foregroundColorOpacityProperty.valueTablet,
      type: "foreground",
    },
    {
      color: foregroundColorProperty.valueDesktop,
      alpha: foregroundColorOpacityProperty.valueDesktop,
      type: "foreground",
    }
  );
}

export function getTableHeaderForegroundColor(block: BlockModel | null) {
  const foregroundColorProperty = getProperty(block, "headerForegroundColor");
  const foregroundColorOpacityProperty = getProperty(block, "headerForegroundColorOpacity");

  return generateColorStyle(
    {
      color: foregroundColorProperty.valueMobile,
      alpha: foregroundColorOpacityProperty.valueMobile,
      type: "foreground",
    },
    {
      color: foregroundColorProperty.valueTablet,
      alpha: foregroundColorOpacityProperty.valueTablet,
      type: "foreground",
    },
    {
      color: foregroundColorProperty.valueDesktop,
      alpha: foregroundColorOpacityProperty.valueDesktop,
      type: "foreground",
    }
  );
}

export function getTableBodyForegroundColor(block: BlockModel | null) {
  const foregroundColorProperty = getProperty(block, "bodyForegroundColor");
  const foregroundColorOpacityProperty = getProperty(block, "bodyForegroundColorOpacity");

  return generateColorStyle(
    {
      color: foregroundColorProperty.valueMobile,
      alpha: foregroundColorOpacityProperty.valueMobile,
      type: "foreground",
    },
    {
      color: foregroundColorProperty.valueTablet,
      alpha: foregroundColorOpacityProperty.valueTablet,
      type: "foreground",
    },
    {
      color: foregroundColorProperty.valueDesktop,
      alpha: foregroundColorOpacityProperty.valueDesktop,
      type: "foreground",
    }
  );
}

export function getBorderColor(block: BlockModel | null) {
  const borderColorProperty = getProperty(block, "borderColor");
  const borderColorOpacityProperty = getProperty(block, "borderColorOpacity");

  return generateColorStyle(
    {
      color: borderColorProperty.valueMobile,
      alpha: borderColorOpacityProperty.valueMobile,
      type: "border",
    },
    {
      color: borderColorProperty.valueTablet,
      alpha: borderColorOpacityProperty.valueTablet,
      type: "border",
    },
    {
      color: borderColorProperty.valueDesktop,
      alpha: borderColorOpacityProperty.valueDesktop,
      type: "border",
    }
  );
}

export function getAccentColor(block: BlockModel | null) {
  const foregroundColorProperty = getProperty(block, "foregroundColor");
  const foregroundColorOpacityProperty = getProperty(block, "foregroundColorOpacity");

  return generateColorStyle(
    {
      color: foregroundColorProperty.valueMobile,
      alpha: foregroundColorOpacityProperty.valueMobile,
      type: "accent",
    },
    {
      color: foregroundColorProperty.valueTablet,
      alpha: foregroundColorOpacityProperty.valueTablet,
      type: "accent",
    },
    {
      color: foregroundColorProperty.valueDesktop,
      alpha: foregroundColorOpacityProperty.valueDesktop,
      type: "accent",
    }
  );
}

export function getTinitColor(block: BlockModel | null) {
  const foregroundColorProperty = getProperty(block, "foregroundColor");
  const foregroundColorOpacityProperty = getProperty(block, "foregroundColorOpacity");

  return generateColorStyle(
    {
      color: foregroundColorProperty.valueMobile,
      alpha: foregroundColorOpacityProperty.valueMobile,
      type: "tint",
    },
    {
      color: foregroundColorProperty.valueTablet,
      alpha: foregroundColorOpacityProperty.valueTablet,
      type: "tint",
    },
    {
      color: foregroundColorProperty.valueDesktop,
      alpha: foregroundColorOpacityProperty.valueDesktop,
      type: "tint",
    }
  );
}

export function getOutlineColor(block: BlockModel | null) {
  const borderColorProperty = getProperty(block, "borderColor");
  const borderColorOpacityProperty = getProperty(block, "borderColorOpacity");

  return generateColorStyle(
    {
      color: borderColorProperty.valueMobile,
      alpha: borderColorOpacityProperty.valueMobile,
      type: "outline",
    },
    {
      color: borderColorProperty.valueTablet,
      alpha: borderColorOpacityProperty.valueTablet,
      type: "outline",
    },
    {
      color: borderColorProperty.valueDesktop,
      alpha: borderColorOpacityProperty.valueDesktop,
      type: "outline",
    }
  );
}
