import { BlockModel } from "@nativeblocks/nativeblocks-react";
import { getProperty } from "./BlockUtil";

function generateBoxShadowStyle(boxShadowMobile: any, boxShadowTablet: any, boxShadowDesktop: any) {
  const mobileClass = `${boxShadowMobile}`;
  const tabletClass = `md:${boxShadowTablet}`;
  const desktopClass = `lg:${boxShadowDesktop}`;

  return `${mobileClass} ${tabletClass} ${desktopClass}`;
}

function generateDropShadowStyle(dropShadowMobile: any, dropShadowTablet: any, dropShadowDesktop: any) {
  const mobileClass = `${dropShadowMobile}`;
  const tabletClass = `md:${dropShadowTablet}`;
  const desktopClass = `lg:${dropShadowDesktop}`;

  return `${mobileClass} ${tabletClass} ${desktopClass}`;
}

export function getBoxShadow(block: BlockModel | null) {
  const boxShadowProperty = getProperty(block, "boxShadow");
  return generateBoxShadowStyle(
    boxShadowProperty.valueMobile,
    boxShadowProperty.valueTablet,
    boxShadowProperty.valueDesktop
  );
}

export function getDropShadow(block: BlockModel | null) {
  const dropShadowProperty = getProperty(block, "dropShadow");
  return generateDropShadowStyle(
    dropShadowProperty.valueMobile,
    dropShadowProperty.valueTablet,
    dropShadowProperty.valueDesktop
  );
}
