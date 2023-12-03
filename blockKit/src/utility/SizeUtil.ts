import { NativeBlockModel } from "@nativeblocks/nativeblocks-react";
import { getProperty } from "./BlockUtil";

export function generateSizeStyle(mobileSize: any, tabletSize: any, desktopSize: any) {
  const mobileClass = `${mobileSize}`;
  const tabletClass = `md:${tabletSize}`;
  const desktopClass = `lg:${desktopSize}`;

  return `${mobileClass} ${tabletClass} ${desktopClass}`;
}

export function getHeight(block: NativeBlockModel | null) {
  const heightProperty = getProperty(block, "height");
  return generateSizeStyle(
    heightProperty.valueMobile,
    heightProperty.valueTablet,
    heightProperty.valueDesktop
  );
}

export function getWidth(block: NativeBlockModel | null) {
  const widthProperty = getProperty(block, "width");
  return generateSizeStyle(
    widthProperty.valueMobile,
    widthProperty.valueTablet,
    widthProperty.valueDesktop
  );
}


const tailwindSizeToPixels = {
  // Widths
  "w-0": 0,
  "w-1": 4,
  "w-2": 8,
  "w-3": 12,
  "w-4": 16,
  "w-5": 20,
  "w-6": 24,
  "w-8": 32,
  "w-10": 40,
  "w-12": 48,
  "w-16": 64,
  "w-20": 80,
  "w-24": 96,
  "w-32": 128,
  "w-40": 160,
  "w-48": 192,
  "w-56": 224,
  "w-64": 256,
  "w-1/2": "50%",
  "w-1/3": "33.333333%",
  "w-2/3": "66.666667%",
  "w-1/4": "25%",
  "w-2/4": "50%",
  "w-3/4": "75%",
  "w-1/5": "20%",
  "w-2/5": "40%",
  "w-3/5": "60%",
  "w-4/5": "80%",
  "w-1/6": "16.666667%",
  "w-2/6": "33.333333%",
  "w-3/6": "50%",
  "w-4/6": "66.666667%",
  "w-5/6": "83.333333%",
  "w-full": "100%",
  "w-screen": "100vw",

  // Heights
  "h-0": 0,
  "h-1": 4,
  "h-2": 8,
  "h-3": 12,
  "h-4": 16,
  "h-5": 20,
  "h-6": 24,
  "h-8": 32,
  "h-10": 40,
  "h-12": 48,
  "h-16": 64,
  "h-20": 80,
  "h-24": 96,
  "h-32": 128,
  "h-40": 160,
  "h-48": 192,
  "h-56": 224,
  "h-64": 256,
  "h-1/2": "50%",
  "h-1/3": "33.333333%",
  "h-2/3": "66.666667%",
  "h-1/4": "25%",
  "h-2/4": "50%",
  "h-3/4": "75%",
  "h-1/5": "20%",
  "h-2/5": "40%",
  "h-3/5": "60%",
  "h-4/5": "80%",
  "h-1/6": "16.666667%",
  "h-2/6": "33.333333%",
  "h-3/6": "50%",
  "h-4/6": "66.666667%",
  "h-5/6": "83.333333%",
  "h-full": "100%",
  "h-screen": "100vh",
};

export function convertTailwindToPixels(tailwindClass: string) {
  const key = (Object.keys(tailwindSizeToPixels) as (keyof typeof tailwindSizeToPixels)[]).find((key) => {
    return tailwindSizeToPixels[key] === 'accounting';
  });
  if (key) return tailwindSizeToPixels[key]
  else return null
}
