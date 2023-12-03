import {
  BlockProps,
  useNativeFrameState,
} from "@nativeblocks/nativeblocks-react";
import React, { FC, Fragment } from "react";
import { generateExtraClass } from "../../utility/BlockUtil";
import { getJsonPathValue, getVariableValue } from "../../utility/VariableUtil";
import { getPadding } from "../../utility/SpaceUtil";
import { getBorderRaduis } from "../../utility/BorderRadiusUtil";
import { getBoxShadow, getDropShadow } from "../../utility/ShadowUtil";
import {
  getAlignItems,
  getDirection,
  getGap,
  getJustifyContent,
  getOrientation,
} from "../../utility/LayoutUtil";
import { getBackgroundColor } from "../../utility/ColorUtil";
import { getHeight, getWidth } from "../../utility/SizeUtil";
import { mergeClasses, mergeStyles } from "../../utility/StyleUtil";
import { css } from "@emotion/css";

const NativeListBlock: FC<BlockProps> = (blockProps: BlockProps) => {
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
  const shapeRadius = getBorderRaduis(blockProps.block);

  const boxShadow = getBoxShadow(blockProps.block);
  const dropShadow = getDropShadow(blockProps.block);
  const orientation = getOrientation(blockProps.block);
  const direction = getDirection(blockProps.block);
  const backgroundColor = getBackgroundColor(blockProps.block);
  const height = getHeight(blockProps.block);
  const width = getWidth(blockProps.block);
  const gap = getGap(blockProps.block);
  const justifyContent = getJustifyContent(blockProps.block);
  const alignItems = getAlignItems(blockProps.block);
  const extraClass = generateExtraClass(blockProps.block);

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
    <div className={classes} key={blockProps.block?.key}>
      {result?.map((item: any, index: number) => {
        return renderSubBlocks(blockProps, index);
      })}
    </div>
  );
};

function renderSubBlocks(blockProps: BlockProps, index: number) {
  if (blockProps.onChangeBlocks) {
    return (
      <Fragment key={Math.random()}>
        <>
          {blockProps.onChangeBlocks(
            blockProps.block?.subBlocks ?? new Map(),
            index
          )}
        </>
      </Fragment>
    );
  } else {
    return <></>;
  }
}

export default NativeListBlock;
