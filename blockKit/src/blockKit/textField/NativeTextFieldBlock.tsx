import {
  BlockProps,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import { onTextChange } from "../../utility/EventUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getDirection } from "../../utility/LayoutUtil";
import {
  getBackgroundColor,
  getBorderColor,
  getForegroundColor,
} from "../../utility/ColorUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import {
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getTextAlign,
} from "../../utility/FontUtil";
import {
  generateExtraClass,
  getInputType,
  getPlaceholder,
  isEnable,
} from "../../utility/BlockUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";

const NativeTextFieldBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const blockKey = blockProps.block?.key ?? "";
  const visibility = state.variables?.get(
    blockProps.block?.visibilityKey ?? ""
  );
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  const variable = state.variables?.get(blockKey);
  let result = {} as any;
  if (blockProps.block?.jsonPath) {
    const query = getVariableValue(
      blockProps.block?.jsonPath,
      "index",
      blockProps.index.toString()
    );
    result = getJsonPathValue(variable?.value ?? "", query);
  } else {
    result = variable?.value ?? "";
  }
  let textValue = result;

  const magics = state.magics?.get(blockKey) ?? [];

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
  const enable = isEnable(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);
  const placeholder = getPlaceholder(blockProps.block);
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
        if (variable) {
          if (textValue === variable.value) {
            return;
          } else {
            setTimeout(() => {
              variable.value = textValue;
              blockProps.onVariableChange?.(variable);
              onTextChange(blockProps, magics);
            }, 500);
          }
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
