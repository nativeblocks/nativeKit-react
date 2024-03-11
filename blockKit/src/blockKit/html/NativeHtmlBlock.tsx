import { css } from "@emotion/css";
import { BlockProps, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import parse from "html-react-parser";
import React, { FC } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeHtmlBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const visibility = state.variables?.get(blockProps.block?.visibilityKey ?? "");
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }
  const blockKey = blockProps.block?.key ?? "";
  const data = blockProps.block?.data ?? new Map();
  const html = state.variables?.get(data.get("html")?.value ?? "")?.value ?? "";

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

  return (
    <div id={blockKey} className={classes} key={blockKey}>
      {parse(html)}
    </div>
  );
};

export default NativeHtmlBlock;
