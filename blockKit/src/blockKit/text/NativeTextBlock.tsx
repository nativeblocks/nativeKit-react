import { css } from "@emotion/css";
import { BlockProps, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { getForegroundColor } from "../../utility/ColorUtil";
import { handleOnClick } from "../../utility/EventUtil";
import {
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getTextAlign,
  getTextDecoration,
} from "../../utility/FontUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeTextBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const visibility = state.variables?.get(blockProps.block?.visibilityKey ?? "");
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  const blockKey = blockProps.block?.key ?? "";
  const magics = state.magics?.get(blockKey) ?? [];

  const data = blockProps.block?.data ?? new Map();
  const text = state.variables?.get(data.get("text")?.value ?? "")?.value ?? "";

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

  const mergedStyle = mergeStyles([padding, direction, foregroundColor, fontFamily, letterSpacing, fontSize]);
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
      {text}
    </p>
  );
};

export default NativeTextBlock;
