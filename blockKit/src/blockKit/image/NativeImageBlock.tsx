import { css } from "@emotion/css";
import { BlockProps, useNativeFrameState } from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { handleOnClick } from "../../utility/EventUtil";
import { getObjectType } from "../../utility/IconUtil";
import { getDirection } from "../../utility/LayoutUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";

const NativeImageBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const visibility = state.variables?.get(blockProps.block?.visibilityKey ?? "");
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }
  const blockKey = blockProps.block?.key ?? "";
  const magics = state.magics?.get(blockKey) ?? [];

  const data = blockProps.block?.data ?? new Map();
  const url = state.variables?.get(data.get("url")?.value ?? "")?.value ?? "";
  const alt = state.variables?.get(data.get("alt")?.value ?? "")?.value ?? "";

  const padding = getPadding(blockProps.block);
  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const direction = getDirection(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const objectType = getObjectType(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);

  const mergedStyle = mergeStyles([padding, direction]);
  const classes = mergeClasses([css(mergedStyle), dropShadow, boxShadow, height, width, objectType, extraClass]);

  return (
    <img
      id={blockKey}
      className={classes}
      key={blockProps.block?.key}
      onClick={(e) => {
        handleOnClick(blockProps, magics);
      }}
      src={url}
      alt={alt}
    />
  );
};

export default NativeImageBlock;
