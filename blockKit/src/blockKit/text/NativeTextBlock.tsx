import {
  BlockProps,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import { handleOnClick } from "../../utility/EventUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getForegroundColor } from "../../utility/ColorUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import {
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getTextAlign,
  getTextDecoration,
} from "../../utility/FontUtil";
import { generateExtraClass } from "../../utility/BlockUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";

const NativeTextBlock: FC<BlockProps> = (blockProps: BlockProps) => {
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

  const magics = state.magics?.get(blockKey) ?? [];

  const padding = getPadding(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const foregroundColor = getForegroundColor(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const fontFamily = getFontFamily(blockProps.block);
  const letterSpacing = getLetterSpacing(blockProps.block);
  const textAlign = getTextAlign(blockProps.block);
  const fontWeight = getFontWeight(blockProps.block);
  const fontSize = getFontSize(blockProps.block);
  const textDecoration = getTextDecoration(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);

  const mergedStyle = mergeStyles([
    padding,
    direction,
    foregroundColor,
    fontFamily,
    letterSpacing,
    fontSize,
  ]);
  const classes = mergeClasses([
    css(mergedStyle),
    dropShadow,
    boxShadow,
    height,
    width,
    textAlign,
    extraClass,
    fontWeight,
    textDecoration,
  ]);

  return (
    <p
      id={blockKey}
      className={classes}
      key={blockKey}
      onClick={(e) => {
        handleOnClick(blockProps, magics);
      }}
    >
      {result ?? ""}
    </p>
  );
};

export default NativeTextBlock;
