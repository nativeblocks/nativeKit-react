import { BlockModel } from "@nativeblocks/nativeblocks-react";
import { getProperty } from "./BlockUtil";

function fontFamilyMapper(fontFamilyMobile: any, fontFamilyTablet: any, fontFamilyDesktop: any) {
  const mobileBreakpoint = 768;
  const tabletBreakpoint = 1024;

  let style = `@media (max-width: ${mobileBreakpoint - 1}px) { border-radius: ${fontFamilyMobile}; } `;
  style += `@media (min-width: ${mobileBreakpoint}px) { border-radius: ${fontFamilyTablet}; } `;
  style += `@media (min-width: ${tabletBreakpoint}px) { border-radius: ${fontFamilyDesktop}; }`;
  return style;
}

export function getFontFamily(block: BlockModel | null) {
  const fontFamilyProperty = getProperty(block, "fontFamily");
  return fontFamilyMapper(
    fontFamilyProperty.valueMobile,
    fontFamilyProperty.valueTablet,
    fontFamilyProperty.valueDesktop
  );
}

export function getTableHeaderFontFamily(block: BlockModel | null) {
  const fontFamilyProperty = getProperty(block, "headerFontFamily");
  return fontFamilyMapper(
    fontFamilyProperty.valueMobile,
    fontFamilyProperty.valueTablet,
    fontFamilyProperty.valueDesktop
  );
}

export function getTableBodyFontFamily(block: BlockModel | null) {
  const fontFamilyProperty = getProperty(block, "bodyFontFamily");
  return fontFamilyMapper(
    fontFamilyProperty.valueMobile,
    fontFamilyProperty.valueTablet,
    fontFamilyProperty.valueDesktop
  );
}

function letterSpacingMapper(
  letterSpacingMobile: string,
  letterSpacingTablet: string,
  letterSpacingDesktop: string
): string {
  const mobileBreakpoint = 768;
  const tabletBreakpoint = 1024;

  let style = `@media (max-width: ${mobileBreakpoint - 1}px) { letter-spacing: ${letterSpacingMobile}rem; } `;
  style += `@media (min-width: ${mobileBreakpoint}px) { letter-spacing: ${letterSpacingTablet}rem; } `;
  style += `@media (min-width: ${tabletBreakpoint}px) { letter-spacing: ${letterSpacingDesktop}rem; }`;

  return style;
}

export function getLetterSpacing(block: BlockModel | null) {
  const letterSpacingProperty = getProperty(block, "letterSpacing");
  return letterSpacingMapper(
    letterSpacingProperty.valueMobile,
    letterSpacingProperty.valueTablet,
    letterSpacingProperty.valueDesktop
  );
}

export function getTableHeaderLetterSpacing(block: BlockModel | null) {
  const letterSpacingProperty = getProperty(block, "headerLetterSpacing");
  return letterSpacingMapper(
    letterSpacingProperty.valueMobile,
    letterSpacingProperty.valueTablet,
    letterSpacingProperty.valueDesktop
  );
}

export function getTableBodyLetterSpacing(block: BlockModel | null) {
  const letterSpacingProperty = getProperty(block, "bodyLetterSpacing");
  return letterSpacingMapper(
    letterSpacingProperty.valueMobile,
    letterSpacingProperty.valueTablet,
    letterSpacingProperty.valueDesktop
  );
}

function fontSizeMapper(fontSizeMobile: string, fontSizeTablet: string, fontSizeDesktop: string): string {
  const mobileBreakpoint = 768;
  const tabletBreakpoint = 1024;

  let style = `@media (max-width: ${mobileBreakpoint - 1}px) { font-size: ${fontSizeMobile}rem; } `;
  style += `@media (min-width: ${mobileBreakpoint}px) { font-size: ${fontSizeTablet}rem; } `;
  style += `@media (min-width: ${tabletBreakpoint}px) { font-size: ${fontSizeDesktop}rem; }`;

  return style;
}

export function getFontSize(block: BlockModel | null) {
  const fontSizeProperty = getProperty(block, "fontSize");
  return fontSizeMapper(fontSizeProperty.valueMobile, fontSizeProperty.valueTablet, fontSizeProperty.valueDesktop);
}

export function getTableHeaderFontSize(block: BlockModel | null) {
  const fontSizeProperty = getProperty(block, "headerFontSize");
  return fontSizeMapper(fontSizeProperty.valueMobile, fontSizeProperty.valueTablet, fontSizeProperty.valueDesktop);
}

export function getTableBodyFontSize(block: BlockModel | null) {
  const fontSizeProperty = getProperty(block, "bodyFontSize");
  return fontSizeMapper(fontSizeProperty.valueMobile, fontSizeProperty.valueTablet, fontSizeProperty.valueDesktop);
}

function generateTextAlignStyle(textAlignMobile: string, textAlignTablet: string, textAlignDesktop: string): string {
  const mobileClass = `${textAlignMobile}`;
  const tabletClass = `md:${textAlignTablet}`;
  const desktopClass = `lg:${textAlignDesktop}`;

  return `${mobileClass} ${tabletClass} ${desktopClass}`;
}

export function getTextAlign(block: BlockModel | null) {
  const textAlignProperty = getProperty(block, "textAlign");
  return generateTextAlignStyle(
    textAlignProperty.valueMobile,
    textAlignProperty.valueTablet,
    textAlignProperty.valueDesktop
  );
}

export function getTableHeaderTextAlign(block: BlockModel | null) {
  const textAlignProperty = getProperty(block, "headerTextAlign");
  return generateTextAlignStyle(
    textAlignProperty.valueMobile,
    textAlignProperty.valueTablet,
    textAlignProperty.valueDesktop
  );
}

export function getTableBodyTextAlign(block: BlockModel | null) {
  const textAlignProperty = getProperty(block, "bodyTextAlign");
  return generateTextAlignStyle(
    textAlignProperty.valueMobile,
    textAlignProperty.valueTablet,
    textAlignProperty.valueDesktop
  );
}

function generateFontWeightStyle(
  fontWeightMobile: string,
  fontWeightTablet: string,
  fontWeightDesktop: string
): string {
  const mobileClass = `${fontWeightMobile}`;
  const tabletClass = `md:${fontWeightTablet}`;
  const desktopClass = `lg:${fontWeightDesktop}`;

  return `${mobileClass} ${tabletClass} ${desktopClass}`;
}

export function getFontWeight(block: BlockModel | null) {
  const fontWeightProperty = getProperty(block, "fontWeight");
  return generateFontWeightStyle(
    fontWeightProperty.valueMobile,
    fontWeightProperty.valueTablet,
    fontWeightProperty.valueDesktop
  );
}

export function getTableHeaderFontWeight(block: BlockModel | null) {
  const fontWeightProperty = getProperty(block, "headerFontWeight");
  return generateFontWeightStyle(
    fontWeightProperty.valueMobile,
    fontWeightProperty.valueTablet,
    fontWeightProperty.valueDesktop
  );
}

export function getTableBodyFontWeight(block: BlockModel | null) {
  const fontWeightProperty = getProperty(block, "bodyFontWeight");
  return generateFontWeightStyle(
    fontWeightProperty.valueMobile,
    fontWeightProperty.valueTablet,
    fontWeightProperty.valueDesktop
  );
}

function generateTextDecorationStyle(
  textDecorationMobile: string,
  textDecorationTablet: string,
  textDecorationDesktop: string
): string {
  const mobileClass = textDecorationMobile ? `${textDecorationMobile}` : "";
  const tabletClass = textDecorationTablet ? `md:${textDecorationTablet}` : "";
  const desktopClass = textDecorationDesktop ? `lg:${textDecorationDesktop}` : "";

  return `${mobileClass} ${tabletClass} ${desktopClass}`.trim();
}

export function getTextDecoration(block: BlockModel | null) {
  const textDecorationProperty = getProperty(block, "textDecoration");
  return generateTextDecorationStyle(
    textDecorationProperty.valueMobile,
    textDecorationProperty.valueTablet,
    textDecorationProperty.valueDesktop
  );
}

export function getTableHeaderTextDecoration(block: BlockModel | null) {
  const textDecorationProperty = getProperty(block, "headerTextDecoration");
  return generateTextDecorationStyle(
    textDecorationProperty.valueMobile,
    textDecorationProperty.valueTablet,
    textDecorationProperty.valueDesktop
  );
}

export function getTableBodyTextDecoration(block: BlockModel | null) {
  const textDecorationProperty = getProperty(block, "bodyTextDecoration");
  return generateTextDecorationStyle(
    textDecorationProperty.valueMobile,
    textDecorationProperty.valueTablet,
    textDecorationProperty.valueDesktop
  );
}
