import { BlockModel } from "@nativeblocks/nativeblocks-react";
import { getProperty } from "./BlockUtil";

export function generateSizeStyle(mobileSize: any, tabletSize: any, desktopSize: any) {
  const mobileClass = `${mobileSize}`;
  const tabletClass = `md:${tabletSize}`;
  const desktopClass = `lg:${desktopSize}`;

  return `${mobileClass} ${tabletClass} ${desktopClass}`;
}

export function getHeight(block: BlockModel | null) {
  const heightProperty = getProperty(block, "height");
  return generateSizeStyle(heightProperty.valueMobile, heightProperty.valueTablet, heightProperty.valueDesktop);
}

export function getWidth(block: BlockModel | null) {
  const widthProperty = getProperty(block, "width");
  return generateSizeStyle(widthProperty.valueMobile, widthProperty.valueTablet, widthProperty.valueDesktop);
}
