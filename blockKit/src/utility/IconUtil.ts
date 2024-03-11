import { NativeBlockModel } from "@nativeblocks/nativeblocks-react";
import { getProperty } from "./BlockUtil";

function generateObjectTypeStyle(
  objectTypeMobile: string,
  objectTypeTablet: string,
  objectTypeDesktop: string
): string {
  const mobileClass = objectTypeMobile ? `${objectTypeMobile}` : "";
  const tabletClass = objectTypeTablet ? `md:${objectTypeTablet}` : "";
  const desktopClass = objectTypeDesktop ? `lg:${objectTypeDesktop}` : "";

  return `${mobileClass} ${tabletClass} ${desktopClass}`.trim();
}

export function getObjectType(block: NativeBlockModel | null) {
  const objectTypeProperty = getProperty(block, "objectType");
  return generateObjectTypeStyle(
    objectTypeProperty.valueMobile,
    objectTypeProperty.valueTablet,
    objectTypeProperty.valueDesktop
  );
}
