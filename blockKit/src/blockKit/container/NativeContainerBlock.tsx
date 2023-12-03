import {
  BlockProps,
  NONE_INDEX,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { handleOnClick } from "../../utility/EventUtil";
import { css } from "@emotion/css";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import { getBackgroundColor } from "../../utility/ColorUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import {
  getAlignItems,
  getDirection,
  getGap,
  getJustifyContent,
  getOrientation,
} from "../../utility/LayoutUtil";

const NativeContainerBlock: FC<BlockProps> = (blockProps: BlockProps) => {
  const { state } = useNativeFrameState();

  const blockKey = blockProps.block?.key ?? "";
  const visibility = state.variables?.get(
    blockProps.block?.visibilityKey ?? ""
  );
  if (visibility && (visibility.value ?? "true") === "false") {
    return <></>;
  }

  const magics = state.magics?.get(blockKey) ?? [];

  const padding = getPadding(blockProps.block);
  const shapeRadius = getBorderRaduis(blockProps.block);

  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);

  const direction = getDirection(blockProps.block);
  const orientation = getOrientation(blockProps.block);
  const backgroundColor = getBackgroundColor(blockProps.block);

  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);

  const extraClass = generateExtraClass(blockProps.block);
  const gap = getGap(blockProps.block);

  const justifyContent = getJustifyContent(blockProps.block);
  const alignItems = getAlignItems(blockProps.block);

  const mergedStyle = mergeStyles([
    padding,
    shapeRadius,
    direction,
    backgroundColor,
  ]);

  const classes = mergeClasses([
    css(mergedStyle),
    orientation,
    dropShadow,
    boxShadow,
    height,
    width,
    extraClass,
    justifyContent,
    alignItems,
    gap,
  ]);

  return (
    <div
      className={classes}
      key={blockProps.block?.key}
      onClick={(e) => {
        handleOnClick(blockProps, magics);
      }}
    >
      {renderSubBlocks(blockProps)}
    </div>
  );
};

function renderSubBlocks(blockProps: BlockProps) {
  if (blockProps.onChangeBlocks) {
    return (
      <>
        {blockProps.onChangeBlocks(
          blockProps.block?.subBlocks ?? new Map(),
          NONE_INDEX
        )}
      </>
    );
  } else {
    return <></>;
  }
}

export default NativeContainerBlock;
