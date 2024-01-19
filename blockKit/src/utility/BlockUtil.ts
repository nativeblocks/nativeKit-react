import { NativeBlockModel } from "@nativeblocks/nativeblocks-react";

export function getProperty(
  block: NativeBlockModel | null,
  propertyKey: string
) {
  if (!block)
    return {
      valueMobile: "",
      valueTablet: "",
      valueDesktop: "",
    };
  const properties = block?.properties ?? new Map();

  const propertyVavlueMobile = properties.get(propertyKey)?.valueMobile ?? "";
  const propertyVavlueTablet = properties.get(propertyKey)?.valueTablet ?? "";
  const propertyVavlueDesktop = properties.get(propertyKey)?.valueDesktop ?? "";

  return {
    valueMobile: propertyVavlueMobile,
    valueTablet: propertyVavlueTablet,
    valueDesktop: propertyVavlueDesktop,
  };
}

function generateExtraClassStyle(
  extraClassMobile: any,
  extraClassTablet: any,
  extraClassDesktop: any
) {
  const mobileClass = `${extraClassMobile}`;
  const tabletClass = `md:${extraClassTablet}`;
  const desktopClass = `lg:${extraClassDesktop}`;

  return `${mobileClass} ${tabletClass} ${desktopClass}`;
}

export function generateExtraClass(block: NativeBlockModel | null) {
  const extraClassProperty = getProperty(block, "class");
  return generateExtraClassStyle(
    extraClassProperty.valueMobile,
    extraClassProperty.valueTablet,
    extraClassProperty.valueDesktop
  );
}

export function isEnable(block: NativeBlockModel | null) {
  const enableProperty = getProperty(block, "enable");
  const isEnable =
    enableProperty.valueMobile === "true" &&
    enableProperty.valueTablet === "true" &&
    enableProperty.valueDesktop === "true";
  return isEnable;
}

export function getPlaceholder(block: NativeBlockModel | null) {
  const placeholderProperty = getProperty(block, "placeholder");
  if (placeholderProperty.valueMobile) return placeholderProperty.valueMobile;
  if (placeholderProperty.valueTablet) return placeholderProperty.valueTablet;
  if (placeholderProperty.valueDesktop) return placeholderProperty.valueDesktop;
}

export function getAlt(block: NativeBlockModel | null) {
  const altProperty = getProperty(block, "alt");
  if (altProperty.valueMobile) return altProperty.valueMobile;
  if (altProperty.valueTablet) return altProperty.valueTablet;
  if (altProperty.valueDesktop) return altProperty.valueDesktop;
}

export function getInputType(block: NativeBlockModel | null) {
  const inputTypeProperty = getProperty(block, "inputType");
  if (inputTypeProperty.valueMobile) return inputTypeProperty.valueMobile;
  if (inputTypeProperty.valueTablet) return inputTypeProperty.valueTablet;
  if (inputTypeProperty.valueDesktop) return inputTypeProperty.valueDesktop;
}

export function getRadioOptions(block: NativeBlockModel | null) {
  const optionsVariableProperty = getProperty(block, "optionsVariable");
  if (optionsVariableProperty.valueMobile)
    return optionsVariableProperty.valueMobile;
  if (optionsVariableProperty.valueTablet)
    return optionsVariableProperty.valueTablet;
  if (optionsVariableProperty.valueDesktop)
    return optionsVariableProperty.valueDesktop;
}
export function getDropdownItems(block: NativeBlockModel | null) {
  const itemsVariableProperty = getProperty(block, "itemsVariable");
  if (itemsVariableProperty.valueMobile)
    return itemsVariableProperty.valueMobile;
  if (itemsVariableProperty.valueTablet)
    return itemsVariableProperty.valueTablet;
  if (itemsVariableProperty.valueDesktop)
    return itemsVariableProperty.valueDesktop;
}

export function getTableHeaderItems(block: NativeBlockModel | null) {
  const headersVariableProperty = getProperty(block, "headersVariable");
  if (headersVariableProperty.valueMobile)
    return headersVariableProperty.valueMobile;
  if (headersVariableProperty.valueTablet)
    return headersVariableProperty.valueTablet;
  if (headersVariableProperty.valueDesktop)
    return headersVariableProperty.valueDesktop;
}

export function getTableSelectedItemCell(block: NativeBlockModel | null) {
  const headersVariableProperty = getProperty(block, "selectedItemCell");
  if (headersVariableProperty.valueMobile)
    return headersVariableProperty.valueMobile;
  if (headersVariableProperty.valueTablet)
    return headersVariableProperty.valueTablet;
  if (headersVariableProperty.valueDesktop)
    return headersVariableProperty.valueDesktop;
}

export function generateTableHeaderExtraClass(block: NativeBlockModel | null) {
  const extraClassProperty = getProperty(block, "headerClass");
  return generateExtraClassStyle(
    extraClassProperty.valueMobile,
    extraClassProperty.valueTablet,
    extraClassProperty.valueDesktop
  );
}

export function generateTableBodyExtraClass(block: NativeBlockModel | null) {
  const extraClassProperty = getProperty(block, "bodyClass");
  return generateExtraClassStyle(
    extraClassProperty.valueMobile,
    extraClassProperty.valueTablet,
    extraClassProperty.valueDesktop
  );
}

export function getToggleOnIcon(block: NativeBlockModel | null) {
  const onIconProperty = getProperty(block, "onIcon");
  if (onIconProperty.valueMobile) return onIconProperty.valueMobile;
  if (onIconProperty.valueTablet) return onIconProperty.valueTablet;
  if (onIconProperty.valueDesktop) return onIconProperty.valueDesktop;
}

export function getToggleOffIcon(block: NativeBlockModel | null) {
  const offIconProperty = getProperty(block, "offIcon");
  if (offIconProperty.valueMobile) return offIconProperty.valueMobile;
  if (offIconProperty.valueTablet) return offIconProperty.valueTablet;
  if (offIconProperty.valueDesktop) return offIconProperty.valueDesktop;
}
