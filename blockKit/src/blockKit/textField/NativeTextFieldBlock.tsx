import { css } from "@emotion/css";
import { BlockProps, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass, getInputType } from "../../utility/BlockUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getBackgroundColor, getBorderColor, getForegroundColor } from "../../utility/ColorUtil";
import { onTextChange } from "../../utility/EventUtil";
import { getFontFamily, getFontSize, getFontWeight, getLetterSpacing, getTextAlign } from "../../utility/FontUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeTextFieldBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const visibility = state.variables?.get(blockProps.block?.visibilityKey ?? "");
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  const blockKey = blockProps.block?.key ?? "";
  const magics = state.magics?.get(blockKey) ?? [];

  const data = blockProps.block?.data ?? new Map();
  const text = state.variables?.get(data.get("text")?.value ?? "");
  let textValue = text?.value ?? "";
  const placeholder = state.variables?.get(data.get("placeholder")?.value ?? "")?.value ?? "";
  const enable = state.variables?.get(data.get("enable")?.value ?? "")?.value === "true";

  const padding = getPadding(blockProps.block);
  const shapeRadius = getBorderRaduis(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const foregroundColor = getForegroundColor(blockProps.block);
  const backgroundColor = getBackgroundColor(blockProps.block);
  const borderColor = getBorderColor(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const fontFamily = getFontFamily(blockProps.block);
  const letterSpacing = getLetterSpacing(blockProps.block);
  const textAlign = getTextAlign(blockProps.block);
  const fontWeight = getFontWeight(blockProps.block);
  const fontSize = getFontSize(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);
  const inputType = getInputType(blockProps.block);

  const mergedStyle = mergeStyles([
    padding,
    direction,
    shapeRadius,
    foregroundColor,
    backgroundColor,
    borderColor,
    fontFamily,
    letterSpacing,
    fontSize,
  ]);
  const classes = mergeClasses([
    css(mergedStyle),
    "border",
    dropShadow,
    boxShadow,
    height,
    width,
    textAlign,
    extraClass,
    fontWeight,
  ]);

  return (
    <input
      id={blockKey}
      disabled={!enable}
      onChange={(event) => {
        textValue = event.target.value;
        if (text) {
          setTimeout(() => {
            text.value = textValue;
            blockProps.onVariableChange?.(text);
            onTextChange(blockProps, magics);
          }, 500);
        }
      }}
      className={classes}
      placeholder={placeholder}
      type={inputType}
      defaultValue={textValue}
      key={blockProps.block?.key}
    />
  );
};

export default NativeTextFieldBlock;
