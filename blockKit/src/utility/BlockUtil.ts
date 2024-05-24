import { BlockModel } from "@nativeblocks/nativeblocks-react";

export function getProperty(block: BlockModel | null, propertyKey: string) {
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

function generateExtraClassStyle(extraClassMobile: any, extraClassTablet: any, extraClassDesktop: any) {
  const mobileClass = `${extraClassMobile}`;
  const tabletClass = `md:${extraClassTablet}`;
  const desktopClass = `lg:${extraClassDesktop}`;

  return `${mobileClass} ${tabletClass} ${desktopClass}`;
}

export function generateExtraClass(block: BlockModel | null) {
  const extraClassProperty = getProperty(block, "class");
  return generateExtraClassStyle(
    extraClassProperty.valueMobile,
    extraClassProperty.valueTablet,
    extraClassProperty.valueDesktop
  );
}

export function getTableHeaderItems(block: BlockModel | null) {
  const headersVariableProperty = getProperty(block, "headersVariable");
  if (headersVariableProperty.valueMobile) return headersVariableProperty.valueMobile;
  if (headersVariableProperty.valueTablet) return headersVariableProperty.valueTablet;
  if (headersVariableProperty.valueDesktop) return headersVariableProperty.valueDesktop;
}

export function getTableSelectedItemCell(block: BlockModel | null) {
  const headersVariableProperty = getProperty(block, "selectedItemCell");
  if (headersVariableProperty.valueMobile) return headersVariableProperty.valueMobile;
  if (headersVariableProperty.valueTablet) return headersVariableProperty.valueTablet;
  if (headersVariableProperty.valueDesktop) return headersVariableProperty.valueDesktop;
}

export function generateTableHeaderExtraClass(block: BlockModel | null) {
  const extraClassProperty = getProperty(block, "headerClass");
  return generateExtraClassStyle(
    extraClassProperty.valueMobile,
    extraClassProperty.valueTablet,
    extraClassProperty.valueDesktop
  );
}

export function generateTableBodyExtraClass(block: BlockModel | null) {
  const extraClassProperty = getProperty(block, "bodyClass");
  return generateExtraClassStyle(
    extraClassProperty.valueMobile,
    extraClassProperty.valueTablet,
    extraClassProperty.valueDesktop
  );
}

export function getInputType(block: BlockModel | null) {
  const inputTypeProperty = getProperty(block, "inputType");
  if (inputTypeProperty.valueMobile) return inputTypeProperty.valueMobile;
  if (inputTypeProperty.valueTablet) return inputTypeProperty.valueTablet;
  if (inputTypeProperty.valueDesktop) return inputTypeProperty.valueDesktop;
}
