import { NativeBlockModel } from "@nativeblocks/nativeblocks-react";
import { getProperty } from "./BlockUtil";

function paddingMapper(
  borderRadiusMobile: {
    topStart: any;
    topEnd: any;
    bottomEnd: any;
    bottomStart: any;
  },
  borderRadiusTablet: {
    topStart: any;
    topEnd: any;
    bottomEnd: any;
    bottomStart: any;
  },
  borderRadiusDesktop: {
    topStart: any;
    topEnd: any;
    bottomEnd: any;
    bottomStart: any;
  }
) {
  const mobileBreakpoint = 768;
  const tabletBreakpoint = 1024;

  const formatBorderRadius = (borderRadius: {
    topStart: any;
    topEnd: any;
    bottomEnd: any;
    bottomStart: any;
  }) =>
    `${borderRadius.topStart}rem ${borderRadius.topEnd}rem ${borderRadius.bottomEnd}rem ${borderRadius.bottomStart}rem`;

  let style = `@media (max-width: ${
    mobileBreakpoint - 1
  }px) { border-radius: ${formatBorderRadius(borderRadiusMobile)}; } `;

  style += `@media (min-width: ${mobileBreakpoint}px) { border-radius: ${formatBorderRadius(
    borderRadiusTablet
  )}; } `;

  style += `@media (min-width: ${tabletBreakpoint}px) { border-radius: ${formatBorderRadius(
    borderRadiusDesktop
  )}; }`;

  return style;
}

export function generateBorderRadiusStyle(
  shapeRadiusTopStart: {
    valueMobile: any;
    valueTablet: any;
    valueDesktop: any;
  },
  shapeRadiusBottomStart: {
    valueMobile: any;
    valueTablet: any;
    valueDesktop: any;
  },
  shapeRadiusTopEnd: { valueMobile: any; valueTablet: any; valueDesktop: any },
  shapeRadiusBottomEnd: {
    valueMobile: any;
    valueTablet: any;
    valueDesktop: any;
  }
) {
  const mobileBorderRadius = {
    topStart: shapeRadiusTopStart.valueMobile,
    topEnd: shapeRadiusTopEnd.valueMobile,
    bottomEnd: shapeRadiusBottomEnd.valueMobile,
    bottomStart: shapeRadiusBottomStart.valueMobile,
  };
  const tabletBorderRadius = {
    topStart: shapeRadiusTopStart.valueTablet,
    topEnd: shapeRadiusTopEnd.valueTablet,
    bottomEnd: shapeRadiusBottomEnd.valueTablet,
    bottomStart: shapeRadiusBottomStart.valueTablet,
  };
  const desktopBorderRadius = {
    topStart: shapeRadiusTopStart.valueDesktop,
    topEnd: shapeRadiusTopEnd.valueDesktop,
    bottomEnd: shapeRadiusBottomEnd.valueDesktop,
    bottomStart: shapeRadiusBottomStart.valueDesktop,
  };

  return paddingMapper(
    mobileBorderRadius,
    tabletBorderRadius,
    desktopBorderRadius
  );
}

export function getBorderRaduis(block: NativeBlockModel | null) {
  const shapeRadiusTopStart = getProperty(block, "shapeRadiusTopStart");
  const shapeRadiusBottomStart = getProperty(block, "shapeRadiusBottomStart");
  const shapeRadiusTopEnd = getProperty(block, "shapeRadiusTopEnd");
  const shapeRadiusBottomEnd = getProperty(block, "shapeRadiusBottomEnd");

  return generateBorderRadiusStyle(
    shapeRadiusTopStart,
    shapeRadiusBottomStart,
    shapeRadiusTopEnd,
    shapeRadiusBottomEnd
  );
}

function generateTableBorderStyle(
  tableBoarderMobile: string,
  tableBoarderTablet: string,
  tableBoarderDesktop: string
): string {
  const mobileClass = `${tableBoarderMobile}`;
  const tabletClass = `md:${tableBoarderTablet}`;
  const desktopClass = `lg:${tableBoarderDesktop}`;

  return `${mobileClass} ${tabletClass} ${desktopClass}`;
}

export function getTableBorder(block: NativeBlockModel | null) {
  const heightProperty = getProperty(block, "tableBorder");
  return generateTableBorderStyle(
    heightProperty.valueMobile,
    heightProperty.valueTablet,
    heightProperty.valueDesktop
  );
}
