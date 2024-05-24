import { BlockModel } from "@nativeblocks/nativeblocks-react";
import { getProperty } from "./BlockUtil";

export function spacingMapper(
  paddingMobile: { top: any; end: any; bottom: any; start: any },
  paddingTablet: { top: any; end: any; bottom: any; start: any },
  paddingDesktop: { top: any; end: any; bottom: any; start: any }
) {
  const mobileBreakpoint = 768;
  const tabletBreakpoint = 1024;

  const formatPadding = (padding: { top: any; end: any; bottom: any; start: any }) =>
    `${padding.top}rem ${padding.end}rem ${padding.bottom}rem ${padding.start}rem`;

  let style = `@media (max-width: ${mobileBreakpoint - 1}px) { padding: ${formatPadding(paddingMobile)}; } `;

  style += `@media (min-width: ${mobileBreakpoint}px) { padding: ${formatPadding(paddingTablet)}; } `;

  style += `@media (min-width: ${tabletBreakpoint}px) { padding: ${formatPadding(paddingDesktop)}; }`;

  return style;
}

export function generatePaddingStyle(
  paddingTop: { valueMobile: any; valueTablet: any; valueDesktop: any },
  paddingEnd: { valueMobile: any; valueTablet: any; valueDesktop: any },
  paddingBottom: { valueMobile: any; valueTablet: any; valueDesktop: any },
  paddingStart: { valueMobile: any; valueTablet: any; valueDesktop: any }
) {
  const mobilePadding = {
    top: paddingTop.valueMobile,
    end: paddingEnd.valueMobile,
    bottom: paddingBottom.valueMobile,
    start: paddingStart.valueMobile,
  };
  const tabletPadding = {
    top: paddingTop.valueTablet,
    end: paddingEnd.valueTablet,
    bottom: paddingBottom.valueTablet,
    start: paddingStart.valueTablet,
  };
  const desktopPadding = {
    top: paddingTop.valueDesktop,
    end: paddingEnd.valueDesktop,
    bottom: paddingBottom.valueDesktop,
    start: paddingStart.valueDesktop,
  };

  return spacingMapper(mobilePadding, tabletPadding, desktopPadding);
}

export function getPadding(block: BlockModel | null) {
  const paddingTop = getProperty(block, "paddingTop");
  const paddingStart = getProperty(block, "paddingStart");
  const paddingBottom = getProperty(block, "paddingBottom");
  const paddingEnd = getProperty(block, "paddingEnd");
  return generatePaddingStyle(paddingTop, paddingEnd, paddingBottom, paddingStart);
}

export function getTableHeaderPadding(block: BlockModel | null) {
  const paddingTop = getProperty(block, "headerPaddingTop");
  const paddingStart = getProperty(block, "headerPaddingStart");
  const paddingBottom = getProperty(block, "headerPaddingBottom");
  const paddingEnd = getProperty(block, "headerPaddingEnd");
  return generatePaddingStyle(paddingTop, paddingEnd, paddingBottom, paddingStart);
}

export function getTableBodyPadding(block: BlockModel | null) {
  const paddingTop = getProperty(block, "bodyPaddingTop");
  const paddingStart = getProperty(block, "bodyPaddingStart");
  const paddingBottom = getProperty(block, "bodyPaddingBottom");
  const paddingEnd = getProperty(block, "bodyPaddingEnd");
  return generatePaddingStyle(paddingTop, paddingEnd, paddingBottom, paddingStart);
}
