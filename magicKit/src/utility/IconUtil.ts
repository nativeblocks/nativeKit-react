import { NativeBlockModel } from "@nativeblocks/nativeblocks-react";
import { getProperty } from "./BlockUtil";

export function getLeadingIcon(block: NativeBlockModel | null) {
  const leadingIconProperty = getProperty(block, "leadingIcon");
  if (leadingIconProperty.valueMobile) return leadingIconProperty.valueMobile;
  if (leadingIconProperty.valueTablet) return leadingIconProperty.valueTablet;
  if (leadingIconProperty.valueDesktop) return leadingIconProperty.valueDesktop;
}

export function getTrailingIcon(block: NativeBlockModel | null) {
  const trailingIconProperty = getProperty(block, "trailingIcon");
  if (trailingIconProperty.valueMobile) return trailingIconProperty.valueMobile;
  if (trailingIconProperty.valueTablet) return trailingIconProperty.valueTablet;
  if (trailingIconProperty.valueDesktop)
    return trailingIconProperty.valueDesktop;
}

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
