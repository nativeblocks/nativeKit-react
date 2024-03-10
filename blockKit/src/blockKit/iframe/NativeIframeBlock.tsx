import { css } from "@emotion/css";
import { BlockProps, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeIframeBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const visibility = state.variables?.get(blockProps.block?.visibilityKey ?? "");
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }
  const blockKey = blockProps.block?.key ?? "";

  const data = blockProps.block?.data ?? new Map();
  const title = state.variables?.get(data.get("title")?.value ?? "")?.value ?? "";
  const url = state.variables?.get(data.get("url")?.value ?? "")?.value ?? "";

  const padding = getPadding(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const shapeRadius = getBorderRaduis(blockProps.block);
  const direction = getDirection(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);

  const mergedStyle = mergeStyles([padding, shapeRadius, direction]);
  const classes = mergeClasses([css(mergedStyle), dropShadow, boxShadow, height, width, extraClass]);

  return <iframe id={blockKey} className={classes} key={blockKey} src={url} title={title}></iframe>;
};

export default NativeIframeBlock;
