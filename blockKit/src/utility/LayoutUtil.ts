import { BlockModel } from "@nativeblocks/nativeblocks-react";
import { getProperty } from "./BlockUtil";

function generateDirectionStyle(directionMobile: any, directionTablet: any, directionDesktop: any) {
  const mobileBreakpoint = 768;
  const tabletBreakpoint = 1024;

  let style = `@media (max-width: ${mobileBreakpoint - 1}px) { direction: ${directionMobile}; } `;
  style += `@media (min-width: ${mobileBreakpoint}px) { direction: ${directionTablet}; } `;
  style += `@media (min-width: ${tabletBreakpoint}px) { direction: ${directionDesktop}; }`;

  return style;
}

function generateOrientationStyle(orientationMobile: string, orientationTablet: string, orientationDesktop: string) {
  const getLayoutClass = (orientation: string) => {
    if (orientation === "X") {
      return "flex-row";
    } else if (orientation === "Y") {
      return "flex-col";
    } else {
      return "";
    }
  };
  const mobileClass = `${getLayoutClass(orientationMobile)}`;
  const tabletClass = `md:${getLayoutClass(orientationTablet)}`;
  const desktopClass = `lg:${getLayoutClass(orientationDesktop)}`;

  return `${mobileClass} ${tabletClass} ${desktopClass}`;
}

export function getDirection(block: BlockModel | null) {
  const directionProperty = getProperty(block, "direction");
  return generateDirectionStyle(
    directionProperty.valueMobile,
    directionProperty.valueTablet,
    directionProperty.valueDesktop
  );
}

export function getOrientation(block: BlockModel | null) {
  const orientationProperty = getProperty(block, "orientation");
  return generateOrientationStyle(
    orientationProperty.valueMobile,
    orientationProperty.valueTablet,
    orientationProperty.valueDesktop
  );
}

function generateGapStyle(gapMobile: any, gapTablet: any, gapDesktop: any) {
  const mobileGap = `flex ${gapMobile}`;
  const tabletGap = `flex md:${gapTablet}`;
  const desktopGap = `flex lg:${gapDesktop}`;
  return `${mobileGap} ${tabletGap} ${desktopGap}`;
}

export function getGap(block: BlockModel | null) {
  const gapProperty = getProperty(block, "gap");
  return generateGapStyle(gapProperty.valueMobile, gapProperty.valueTablet, gapProperty.valueDesktop);
}

function generateJustifyContentStyle(justifyContentMobile: any, justifyContentTablet: any, justifyContentDesktop: any) {
  const mobileJustifyContent = `${justifyContentMobile}`;
  const tabletJustifyContent = `md:${justifyContentTablet}`;
  const desktopJustifyContent = `lg:${justifyContentDesktop}`;
  return `${mobileJustifyContent} ${tabletJustifyContent} ${desktopJustifyContent}`;
}

function generateAlignItemsStyle(alignItemsMobile: any, alignItemsTablet: any, alignItemsDesktop: any) {
  const mobileAlignItems = `${alignItemsMobile}`;
  const tabletAlignItems = `md:${alignItemsTablet}`;
  const desktopAlignItems = `lg:${alignItemsDesktop}`;
  return `${mobileAlignItems} ${tabletAlignItems} ${desktopAlignItems}`;
}

export function getJustifyContent(block: BlockModel | null) {
  const justifyContentProperty = getProperty(block, "justifyContent");
  return generateJustifyContentStyle(
    justifyContentProperty.valueMobile,
    justifyContentProperty.valueTablet,
    justifyContentProperty.valueDesktop
  );
}

export function getAlignItems(block: BlockModel | null) {
  const alignItemsProperty = getProperty(block, "alignItems");
  return generateAlignItemsStyle(
    alignItemsProperty.valueMobile,
    alignItemsProperty.valueTablet,
    alignItemsProperty.valueDesktop
  );
}
